import React, { useState, useEffect } from 'react';
import { getAnalytics, initializeAdminData } from '../../utils/adminStorage';
import './Adminpage.css';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    todayOrders: 0,
    monthlyOrders: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Initialize admin data if needed
    initializeAdminData();
    
    // Load analytics
    const analyticsData = getAnalytics();
    setAnalytics(analyticsData);
    
    // Generate recent activity
    const activities = [
      { id: 1, type: 'order', message: 'New order #FS001 received', time: '2 minutes ago' },
      { id: 2, type: 'customer', message: 'New customer registration', time: '15 minutes ago' },
      { id: 3, type: 'product', message: 'Snake Plant added to inventory', time: '1 hour ago' },
      { id: 4, type: 'review', message: 'New product review submitted', time: '2 hours ago' },
      { id: 5, type: 'order', message: 'Order #FS002 shipped', time: '3 hours ago' }
    ];
    setRecentActivity(activities);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <>
      <header className="admin-header">
        <h1 className="admin-header-title">Admin Dashboard</h1>
        <span className="admin-header-welcome">Welcome back! Here's what's happening today.</span>
      </header>
      
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-title">Total Orders</div>
          <div className="admin-stat-value">{analytics.totalOrders}</div>
          <div className="admin-stat-subtitle">{analytics.todayOrders} today</div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-title">Revenue</div>
          <div className="admin-stat-value">{formatCurrency(analytics.totalRevenue)}</div>
          <div className="admin-stat-subtitle">{analytics.monthlyOrders} orders this month</div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-title">Customers</div>
          <div className="admin-stat-value">{analytics.totalCustomers}</div>
          <div className="admin-stat-subtitle">Active customers</div>
        </div>
        
        <div className="admin-stat-card">
          <div className="admin-stat-title">Products</div>
          <div className="admin-stat-value">{analytics.totalProducts}</div>
          <div className="admin-stat-subtitle">In inventory</div>
        </div>
      </div>

      <div className="admin-dashboard-grid">
        {/* Quick Actions */}
        <div className="admin-dashboard-card">
          <h3>Quick Actions</h3>
          <div className="admin-quick-actions">
            <button className="admin-quick-action-btn" onClick={() => window.location.hash = '/admin/products'}>
              Add New Product
            </button>
            <button className="admin-quick-action-btn" onClick={() => window.location.hash = '/admin/orders'}>
              View Orders
            </button>
            <button className="admin-quick-action-btn" onClick={() => window.location.hash = '/admin/customers'}>
              Manage Customers
            </button>
          </div>
        </div>

        {/* Order Status Overview */}
        <div className="admin-dashboard-card">
          <h3>Order Status</h3>
          <div className="admin-order-stats">
            <div className="admin-order-stat">
              <span className="admin-order-stat-label">Pending</span>
              <span className="admin-order-stat-value pending">{analytics.pendingOrders}</span>
            </div>
            <div className="admin-order-stat">
              <span className="admin-order-stat-label">Completed</span>
              <span className="admin-order-stat-value completed">{analytics.completedOrders}</span>
            </div>
            <div className="admin-order-stat">
              <span className="admin-order-stat-label">Processing</span>
              <span className="admin-order-stat-value processing">
                {Math.max(0, analytics.totalOrders - analytics.pendingOrders - analytics.completedOrders)}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-dashboard-card admin-activity-card">
          <h3>Recent Activity</h3>
          <div className="admin-activity-list">
            {recentActivity.map(activity => (
              <div key={activity.id} className="admin-activity-item">
                <div className={`admin-activity-icon ${activity.type}`}>
                  {activity.type === 'order' && '📦'}
                  {activity.type === 'customer' && '👤'}
                  {activity.type === 'product' && '🌱'}
                  {activity.type === 'review' && '⭐'}
                </div>
                <div className="admin-activity-content">
                  <p className="admin-activity-message">{activity.message}</p>
                  <span className="admin-activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;