import React, { useState, useEffect } from 'react';
import axios from 'axios';


function FeedBack() {
    const [negativeCount, setNegativeCount] = useState(0);
    const [retrainLogs, setRetrainLogs] = useState([]);

    // Fetch negative feedback count on load
    useEffect(() => {
        axios.get('http://localhost:5000/api/feedback-count')
            .then(response => setNegativeCount(response.data.count))
            .catch(error => console.error('Error fetching count:', error));
    }, []);

    // Fetch retraining logs on load
    useEffect(() => {
        axios.get('http://localhost:5000/api/retrain-logs')
            .then(response => setRetrainLogs(response.data))
            .catch(error => console.error('Error fetching logs:', error));
    }, []);

    const submitFeedback = (feedback) => {
        axios.post('http://localhost:5000/api/feedback', { feedback })
            .then(response => setNegativeCount(response.data.newCount))
            .catch(error => console.error('Error submitting feedback:', error));
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>🌱 Plant Tissue Culture Feedback System 🌱</h1>

            <div style={styles.feedbackSection}>
                <h2 style={styles.subHeader}>Submit Feedback:</h2>
                <button style={{ ...styles.button, backgroundColor: '#4CAF50' }}
                    onClick={() => submitFeedback('positive')}>
                    Positive 👍
                </button>
                <button style={{ ...styles.button, backgroundColor: '#f44336' }}
                    onClick={() => submitFeedback('negative')}>
                    Negative 👎
                </button>
            </div>

            <h3 style={styles.feedbackCount}>Negative Feedback Count: {negativeCount}</h3>

            <div style={styles.logsSection}>
                <h2 style={styles.subHeader}>Retraining Logs:</h2>
                {retrainLogs.length > 0 ? (
                    <ul style={styles.logList}>
                        {retrainLogs.map((log, index) => (
                            <li key={index} style={styles.logItem}>
                                <p><strong>Timestamp:</strong> {log.timestamp}</p>
                                <p><strong>Status:</strong> {log.status}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={styles.noLogs}>No retraining logs available yet.</p>
                )}
            </div>
        </div>
    );
}

export default FeedBack;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
    },
    header: {
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#2c3e50',
        textAlign: 'center',
    },
    subHeader: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        color: '#34495e',
    },
    feedbackSection: {
        display: 'flex',
        gap: '15px',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    feedbackCount: {
        fontSize: '1.3rem',
        marginBottom: '30px',
        color: '#333',
    },
    logsSection: {
        width: '80%',
        maxWidth: '600px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    logList: {
        listStyle: 'none',
        padding: '0',
    },
    logItem: {
        marginBottom: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid #ddd',
    },
    noLogs: {
        color: '#7f8c8d',
        textAlign: 'center',
        marginTop: '10px',
    },
};
