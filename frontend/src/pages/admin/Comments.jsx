import React from 'react';

const Comments = () => (
  <div className="feedback-container">
    <div className="feedback-card">
      <h2 className="feedback-title">Feedback</h2>
      <div className="feedback-form">
        <div className="feedback-row">
          <div className="feedback-item">
            <label>Customer ID</label>
            <input type="text" className="feedback-input" value="C1003" readOnly />
          </div>
          <div className="feedback-item">
            <label>Feedback</label>
            <textarea className="feedback-textarea" placeholder="Worem ipsum dolor sit amet, consectetur adipiscing elit..."></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Comments;