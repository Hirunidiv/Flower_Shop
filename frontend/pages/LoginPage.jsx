import { useState } from 'react';
import './LoginPage.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Login attempt:', formData);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <p className="login-subtitle">Please Enter Your Login Information</p>
          <h1 className="login-title">Welcome Back</h1>
        </div>
        
        <div className="login-form">
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username or Email Address"
              value={formData.username}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <button 
            type="button" 
            className="forgot-password-link"
            onClick={handleForgotPassword}
          >
            Forgot Password
          </button>
          
          <button 
            type="button" 
            className="login-button"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        
        <div className="signup-section">
          <span className="signup-text">Don't have an account? </span>
          <button 
            type="button" 
            className="signup-link"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}