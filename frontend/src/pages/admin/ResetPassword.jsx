import React from 'react';

const ResetPassword = () => (
  <div className="password-container">
    <div className="password-card">
      <h2 className="password-title">Reset Password</h2>
      <form className="password-form">
        <div className="password-row">
          <div className="password-item">
            <label>Customer ID</label>
            <input type="text" className="password-input" value="C1003" readOnly />
          </div>
          <div className="password-item">
            <label>Current Password</label>
            <input type="password" className="password-input" placeholder="Current Password" />
          </div>
          <div className="password-item">
            <label>New Password</label>
            <input type="password" className="password-input" placeholder="New Password" />
          </div>
          <div className="password-item">
            <label>Confirm Password</label>
            <input type="password" className="password-input" placeholder="Confirm Password" />
          </div>
        </div>
        <button type="submit" className="enter-btn">Enter</button>
      </form>
    </div>
  </div>
);

export default ResetPassword;