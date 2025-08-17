import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Adminpage.css';

const navLinks = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/customers', label: 'Customers' },
  { to: '/admin/comments', label: 'Comments' },
  { to: '/admin/reset-password', label: 'Reset Password' }
];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Logout handler
  const handleLogout = () => {
    // Clear any authentication tokens here if needed
    // localStorage.removeItem('token');
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div className="dashboard-container">
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>☰</button>
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'sidebar-open' : ''}`}
        onClick={toggleSidebar}
      ></div>
      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="logo-section">
          <div className="logo-leaf">
            <svg className="leaf-icon" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          <span className="logo-text">Admin Panel</span>
        </div>
        <ul className="sidebar-nav">
          {navLinks.map(link => (
            <li className="nav-item" key={link.to}>
              <Link
                className={`nav-link${location.pathname === link.to ? ' active' : ''}`}
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <button className="nav-link logout-link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;