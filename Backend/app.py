from flask import Flask, request, jsonify
from pymongo import MongoClient
import subprocess
import time
from flask_cors import CORS
import joblib  # Import CORS
import numpy as np
import pandas as pd


app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

# Connect to MongoDB (replace URI with your connection string if needed)
client = MongoClient("mongodb://localhost:27017/")
db = client['feedback_system']
feedback_collection = db['feedback']
retrain_logs = db['retrain_logs']

NEGATIVE_THRESHOLD = 10

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    feedback = request.json.get('feedback')

    # Store feedback in the database
    feedback_collection.insert_one({"feedback": feedback, "timestamp": time.time()})

    # Get the current count of negative feedback
    negative_count = feedback_collection.count_documents({"feedback": "negative"})

    if negative_count >= NEGATIVE_THRESHOLD:
        trigger_retrain()

    return jsonify({"newCount": negative_count}), 200

@app.route('/api/feedback-count', methods=['GET'])
def get_feedback_count():
    negative_count = feedback_collection.count_documents({"feedback": "negative"})
    return jsonify({"count": negative_count}), 200

@app.route('/api/retrain-logs', methods=['GET'])
def get_retrain_logs():
    logs = list(retrain_logs.find({}, {"_id": 0}))
    return jsonify(logs), 200

def trigger_retrain():
    try:
        print("Starting model retraining...")
        result = subprocess.run(['python', 'retrain_model.py'], 
                                capture_output=True, text=True, check=True)

        # Log retraining result
        retrain_logs.insert_one({
            "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
            "status": "Success",
            "details": result.stdout
        })
        print("Model retrained successfully.")
    except subprocess.CalledProcessError as e:
        retrain_logs.insert_one({
            "timestamp": time.strftime('%Y-%m-%d %H:%M:%S'),
            "status": "Failure",
            "details": str(e)
        })
        print(f"Error during retraining: {e}")

model = joblib.load('model.pkl')
scaler = joblib.load('scaler.pkl')
le = joblib.load('label_encoder.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the data from the request
        data = request.get_json()

        # Extract features
        nutrient_requirement = data['Nutrient_Requirement']
        hormone_requirement = data['Hormone_Requirement']
        temperature = data['Temperature']
        pH_level = data['pH_Level']
        light_intensity = data['Light_Intensity']
        contamination_sensitivity = data['Contamination_Sensitivity']
        plant_level=data['Plant_name']
  # New feature

        # Create input array for the model
        input_data = np.array([[plant_level,nutrient_requirement, hormone_requirement, temperature,
                                pH_level, light_intensity, contamination_sensitivity]])

        # Scale the input data
        input_data_scaled = scaler.transform(input_data)
        # input_data_scaled(plant_name)
        # Make prediction
        prediction = model.predict(input_data_scaled)

        # Decode the predicted media
        recommended_media = le.inverse_transform(prediction)
        print(recommended_media[0])
        # Return the result
        return jsonify({'recommended_media': recommended_media[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 400
    


# Load the trained model and the fitted preprocessor
modelrate = joblib.load('plant_tissue_culture_model.joblib')
preprocessorrate = joblib.load('fitted_preprocessor.joblib')

# Define the mapping from predicted class to percentage range
class_to_percentage = {
    0: "0% - 25%",
    1: "25% - 50%",
    2: "50% - 75%",
    3: "75% - 100%"
}

@app.route('/predictrate', methods=['POST'])
def predictrate():
    data = request.json  # Get data from the request
    try:
        # Ensure all required columns are present in the input data
        required_columns = ['Explant_Type', 'Plant_Species', 'Medium_Composition', 'Temperature', 'Humidity', 'Light_Intensity', 'Culture_Duration']
        for column in required_columns:
            if column not in data:
                raise ValueError(f"Missing required column: {column}")

        # Convert string values to the appropriate numeric types if needed (e.g., using float conversion)
        data['Culture_Duration'] = float(data['Culture_Duration'])
        data['Humidity'] = float(data['Humidity'])
        data['Light_Intensity'] = float(data['Light_Intensity'])
        data['Medium_Composition'] = str(data['Medium_Composition'])  # Ensure categorical columns are strings
        data['Plant_Species'] = str(data['Plant_Species'])  # Ensure categorical columns are strings
        data['Temperature'] = float(data['Temperature'])

        # Create a DataFrame from the input data
        input_df = pd.DataFrame([data])
        print(f"Input DataFrame:\n{input_df}")

        # Only keep the expected columns for prediction
        expected_columns = ['Temperature', 'Humidity', 'Light_Intensity', 'Culture_Duration', 'Explant_Type', 'Plant_Species', 'Medium_Composition']
        input_df = input_df[expected_columns]
        print(f"Filtered input data:\n{input_df}")

        # Convert categorical columns to strings if they aren’t already
        categorical_features = ['Explant_Type', 'Plant_Species', 'Medium_Composition']
        for feature in categorical_features:
            if input_df[feature].dtype != 'object':
                input_df[feature] = input_df[feature].astype(str)  # Convert non-string to string

        # Ensure the preprocessor and model are loaded
        if preprocessorrate is None:
            raise ValueError("Preprocessor is not loaded.")
        if modelrate is None:
            raise ValueError("Model is not loaded.")

        # Transform the input data using the preprocessor
        processed_input = preprocessorrate.transform(input_df)

        # Ensure processed input is a NumPy array, as required by RandomForestClassifier
        if hasattr(processed_input, 'toarray'):
            processed_input = processed_input.toarray()  # Convert sparse matrix to dense if needed

        print(f"Processed Input Array:\n{processed_input}")
        print(f"Processed Input Shape: {processed_input.shape}")

        # Make the prediction using the processed input array
        predicted_class = modelrate.predict(processed_input)[0]
        print("Prediction successful.")

        # Map the predicted class to its corresponding percentage range
        predicted_percentage_range = class_to_percentage.get(predicted_class, "Unknown")

        # Return the prediction as JSON
        return jsonify({
            'predicted_class': int(predicted_class),
            'predicted_percentage_range': predicted_percentage_range
        })
    except Exception as e:
        # Handle any errors and return the error message as JSON
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 400
    
    
Cropmodel = joblib.load('model/crop_model.pkl')
Cropscaler = joblib.load('model/scaler.pkl')
Croplabel_encoder = joblib.load('model/label_encoder.pkl')

@app.route('/predictcrop', methods=['POST'])
def predictcrop():
    data = request.get_json()

    
    features = np.array([[data['N'], data['P'], data['K'], data['temperature'], data['humidity'], data['ph'], data['rainfall']]])
    
  
    features_scaled = Cropscaler.transform(features)
    
   
    prediction = Cropmodel.predict(features_scaled)
    
    
    predicted_crop = Croplabel_encoder.inverse_transform(prediction)
    
    return jsonify({'predicted_crop': predicted_crop[0]})

irmodel = joblib.load('irrigationmodel.pkl')
irscaler = joblib.load('irrigationscaler.pkl')
irlabel_encoder = joblib.load('irrigationlabel.pkl')

@app.route('/predictirrigation', methods=['POST'])
def predictirrigation():
    data = request.get_json()
    
    # Extract input features
    crop_type = data['CropType']
    crop_days = data['CropDays']
    soil_moisture = data['SoilMoisture']
    temperature = data['Temperature']
    humidity = data['Humidity']

    # Encode and scale input data
    crop_type_encoded = irlabel_encoder.transform([crop_type])[0]  # Convert crop type to numerical form
    input_data = np.array([[crop_days, soil_moisture, temperature, humidity]])
    input_data_scaled = irscaler.transform(input_data)

    # Make prediction
    prediction = irmodel.predict(input_data_scaled)
    irrigation_status = 'Irrigation Needed' if prediction[0] == 1 else 'No Irrigation Needed'

    # Return the result
    return jsonify({"IrrigationStatus": irrigation_status})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
