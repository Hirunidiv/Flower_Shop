import React, { useState } from 'react';
import './Adminpage.css';

const Adminpage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Orders');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const orders = [
    { id: 'C001', customer: 'David Smith', address: '123 Oak Street, Oak Street, New York', contact: '+91 123456 78901', products: 'Product Name', payment: 'Debit Card', total: '$107', status: 'Paid' },
    { id: 'C002', customer: 'Alex William', address: '456 Pine Avenue, Pine Avenue, California', contact: '+91 123456 78902', products: 'Product Name', payment: 'Debit Card', total: '$102', status: 'Pending' },
    { id: 'C003', customer: 'George Washington', address: '789 Elm Drive, Elm Drive, Texas', contact: '+91 123456 78903', products: 'Product Name', payment: 'Debit Card', total: '$127', status: 'Paid' },
    { id: 'C004', customer: 'Charles Wilson', address: '321 Maple Lane, Maple Lane, Florida', contact: '+91 123456 78904', products: 'Product Name', payment: 'Debit Card', total: '$92', status: 'Paid' },
    { id: 'C005', customer: 'David Smith', address: '654 Birch Road, Birch Road, Nevada', contact: '+91 123456 78905', products: 'Product Name', payment: 'Debit Card', total: '$118', status: 'Pending' }
  ];

  const sidebarItems = [
    { name: 'Dashboard', active: true },
    { name: 'Orders', active: false },
    { name: 'Products', active: false },
    { name: 'Customers', active: false },
    { name: 'Comments', active: false },
    { name: 'Reset Password', active: false },
    { name: 'Logout', active: false }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="logo-section">
          <div className="logo-leaf">
            <svg className="leaf-icon" viewBox="0 0 24 24">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
            </svg>
          </div>
          <span className="logo-text">ADORA</span>
        </div>
        
        <nav>
          <ul className="sidebar-nav">
            {sidebarItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a className={`nav-link ${item.active ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Enhanced Responsive Header */}
        <header className="header">
          <h1 className="header-title">Admin Dashboard</h1>
          <span className="header-welcome">Welcome, Admin!</span>
        </header>

        {/* Enhanced Responsive Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value">$986</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Total Orders</div>
            <div className="stat-value">05</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">New Customers</div>
            <div className="stat-value">3</div>
          </div>
          <div className="stat-card">
            <div className="stat-title">Low Stock Plants</div>
            <div className="stat-value">2</div>
          </div>
        </div>

        {/* Orders Section */}
        <section className="orders-section">
          <div className="orders-header">
            <h2 className="section-title">All Orders</h2>
            <div className="orders-controls">
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-input"
              />
              <select 
                className="filter-dropdown"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option>All Orders</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Address</th>
                  <th>Contact</th>
                  <th>Products</th>
                  <th>Payment</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.address}</td>
                    <td>{order.contact}</td>
                    <td>{order.products}</td>
                    <td>{order.payment}</td>
                    <td>{order.total}</td>
                    <td>
                      <span className={`status-badge ${order.status === 'Paid' ? 'status-paid' : 'status-pending'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="pagination-btn">Previous</button>
            <div className="pagination-numbers">
              <span className="page-number active">1</span>
              <span className="page-number">2</span>
              <span className="page-number">3</span>
              <span className="page-dots">...</span>
              <span className="page-number">10</span>
            </div>
            <button className="pagination-btn">Next</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Adminpage;