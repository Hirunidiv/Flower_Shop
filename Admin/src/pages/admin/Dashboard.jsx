import React from 'react';

const Dashboard = () => (
  <>
    <header className="header">
      <h1 className="header-title"> Admin Dashboard</h1>
      <span className="header-welcome">Welcome, Admin!</span>
    </header>
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-title">Total Sales</div>
        <div className="stat-value">$12,345</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">New Orders</div>
        <div className="stat-value">89</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Total Products</div>
        <div className="stat-value">150</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Active Users</div>
        <div className="stat-value">250</div>
      </div>
    </div>
  </>
);

export default Dashboard;