import React, { useState, useEffect } from 'react';
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../../utils/adminStorage';
import './Adminpage.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    totalOrders: 0,
    totalSpent: 0
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchQuery]);

  const loadCustomers = () => {
    const customersData = getCustomers();
    setCustomers(customersData);
  };

  const filterCustomers = () => {
    if (searchQuery.trim()) {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  };

  const handleAddCustomer = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      totalOrders: 0,
      totalSpent: 0
    });
    setEditingCustomer(null);
    setShowAddForm(true);
  };

  const handleEditCustomer = (customer) => {
    setFormData({
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
      totalOrders: customer.totalOrders || 0,
      totalSpent: customer.totalSpent || 0
    });
    setEditingCustomer(customer);
    setShowAddForm(true);
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      const success = deleteCustomer(customerId);
      if (success) {
        loadCustomers();
        alert('Customer deleted successfully!');
      } else {
        alert('Failed to delete customer.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('Please fill in name and email fields');
      return;
    }

    if (editingCustomer) {
      const success = updateCustomer(editingCustomer.id, formData);
      if (success) {
        alert('Customer updated successfully!');
        loadCustomers();
        setShowAddForm(false);
      } else {
        alert('Failed to update customer.');
      }
    } else {
      const newCustomer = addCustomer(formData);
      if (newCustomer) {
        alert('Customer added successfully!');
        loadCustomers();
        setShowAddForm(false);
      } else {
        alert('Failed to add customer.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalOrders' ? parseInt(value) || 0 
              : name === 'totalSpent' ? parseFloat(value) || 0 
              : value
    }));
  };

  return (
    <div className="admin-customers-container">
      <div className="admin-customers-card">
        <div className="admin-customers-header">
          <h2 className="admin-customers-title">Customers ({filteredCustomers.length})</h2>
          <div className="admin-customers-controls">
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="admin-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className="admin-add-product-btn"
              onClick={handleAddCustomer}
            >
              Add Customer
            </button>
          </div>
        </div>
        
        <div className="admin-table-container">
          <table className="admin-customers-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="admin-product-id">#{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.totalOrders || 0}</td>
                    <td>${(customer.totalSpent || 0).toFixed(2)}</td>
                    <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                    <td className="admin-action-btn-group">
                      <button 
                        className="admin-edit-btn"
                        onClick={() => handleEditCustomer(customer)}
                      >
                        Edit
                      </button>
                      <button 
                        className="admin-delete-btn"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="admin-no-products">
                    {searchQuery ? 'No customers found matching your search.' : 'No customers found. Add your first customer!'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Form Modal */}
      {showAddForm && (
        <div className="add-product-modal">
          <div className="add-product-content">
            <h2>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Customer name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="customer@email.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1-555-0123"
                />
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Customer address"
                  rows="3"
                />
              </div>
              
              <div className="plant-details-grid">
                <div className="form-group">
                  <label>Total Orders</label>
                  <input
                    type="number"
                    name="totalOrders"
                    value={formData.totalOrders}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                
                <div className="form-group">
                  <label>Total Spent ($)</label>
                  <input
                    type="number"
                    name="totalSpent"
                    value={formData.totalSpent}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit">
                  {editingCustomer ? 'Update Customer' : 'Add Customer'}
                </button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;