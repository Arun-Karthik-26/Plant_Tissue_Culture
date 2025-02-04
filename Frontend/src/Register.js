import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Import Firebase auth
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Register.css'; // Import the CSS file

const Register = () => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false); // State for checkbox
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleRegister = async () => {
    if (!agree) {
      alert('Please agree to the Terms and Conditions');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registered User:', userCredential.user);
      alert('Registration successful!');
      navigate('/homee'); // Redirect to homepage after registration
    } catch (error) {
      console.error('Registration Error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="image-section">
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.Kdcg5GiE5lR2v_4Is0VaogHaEK&pid=Api&P=0&h=180"
          alt="Register"
          className="register-image"
        />
      </div>
      <div className="form-container">
        <h1 className="form-title">Sign Up</h1>
        <p className="form-subtitle">Enter your details to register.</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="terms"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label htmlFor="terms">
            I agree to the <span>Terms and Conditions</span>
          </label>
        </div>
        <button className="register-button" onClick={handleRegister}>Register</button>
        <p className="signin-text">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
