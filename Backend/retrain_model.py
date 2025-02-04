import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Load and preprocess your dataset
def load_and_preprocess_data(file_path):
    df = pd.read_csv(file_path)
    le = LabelEncoder()
    df['Plant_Name'] = le.fit_transform(df['Plant_Name'])
    df['Contamination_Sensitivity'] = le.fit_transform(df['Contamination_Sensitivity'])
    df['Recommended_Media'] = le.fit_transform(df['Recommended_Media'])

    X = df.drop('Recommended_Media', axis=1)
    y = df['Recommended_Media']
    return X, y

# Train the model with hyperparameter tuning
def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    model = RandomForestClassifier(random_state=42)
    param_grid = {
        'n_estimators': [50, 100, 200],
        'max_depth': [None, 10, 20, 30],
        'min_samples_split': [2, 5, 10]
    }
    grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=3, scoring='accuracy', n_jobs=-1)
    grid_search.fit(X_train, y_train)

    print("Best parameters found: ", grid_search.best_params_)
    print("Best cross-validation accuracy: ", grid_search.best_score_)

    y_pred = grid_search.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f'Accuracy: {accuracy:.2f}')
    print("Classification Report:")
    print(classification_report(y_test, y_pred))
    print("Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))

# Main function to execute the steps
if __name__ == "__main__":
    # Replace with your actual dataset path
    file_path ='E:\project\lib\Backend\plant_tissue_culture_correlated_dataset.csv'
    X, y = load_and_preprocess_data(file_path)
    train_model(X, y)

