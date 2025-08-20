import React, { useState, useEffect } from 'react';
import { getOrders, addOrder, updateOrderStatus } from '../../utils/adminStorage';
import './Adminpage.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    paymentMethod: 'credit_card',
    shippingAddress: ''
  });

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchQuery, statusFilter]);

  const loadOrders = () => {
    const ordersData = getOrders();
    setOrders(ordersData);
  };

  const filterOrders = () => {
    let filtered = orders;
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    setFilteredOrders(filtered);
  };

  const handleAddOrder = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 15,
      total: 0,
      paymentMethod: 'credit_card',
      shippingAddress: ''
    });
    setShowAddForm(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    const success = updateOrderStatus(orderId, newStatus);
    if (success) {
      loadOrders();
      alert(`Order status updated to ${newStatus}`);
    } else {
      alert('Failed to update order status.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail) {
      alert('Please fill in customer name and email');
      return;
    }

    const orderData = {
      ...formData,
      items: [
        { id: 1, name: 'Sample Product', price: 29.99, quantity: 1 }
      ],
      subtotal: 29.99,
      tax: 2.40,
      total: 47.39
    };

    const newOrder = addOrder(orderData);
    if (newOrder) {
      alert('Order added successfully!');
      loadOrders();
      setShowAddForm(false);
    } else {
      alert('Failed to add order.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'admin-paid';
      case 'pending': return 'admin-notpaid';
      case 'processing': return 'admin-processing';
      case 'shipped': return 'admin-shipped';
      default: return 'admin-notpaid';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="admin-orders-container">
      <div className="admin-orders-card">
        <div className="admin-orders-header">
          <h2 className="admin-orders-title">Orders ({filteredOrders.length})</h2>
          <div className="admin-orders-controls">
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="admin-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select 
              className="admin-filter-dropdown"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
            </select>
            <button 
              className="admin-add-product-btn"
              onClick={handleAddOrder}
            >
              Add Order
            </button>
          </div>
        </div>
        
        <div className="admin-table-container">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="admin-product-id">{order.orderNumber}</td>
                    <td>{order.customerName}</td>
                    <td>{order.customerEmail}</td>
                    <td>
                      {order.items && order.items.length > 0 
                        ? order.items.map(item => item.name).join(', ')
                        : 'No items'
                      }
                    </td>
                    <td>{formatCurrency(order.total || 0)}</td>
                    <td>
                      <select 
                        className={`admin-payment-status ${getStatusClass(order.status)}`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="admin-action-btn-group">
                      <button 
                        className="admin-view-btn"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="admin-no-products">
                    {searchQuery || statusFilter ? 'No orders found matching your criteria.' : 'No orders found. Add your first order!'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Order Form Modal */}
      {showAddForm && (
        <div className="add-product-modal">
          <div className="add-product-content">
            <h2>Add New Order</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Customer Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="Customer name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Customer Email *</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="customer@email.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Customer Phone</label>
                <input
                  type="text"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="+1-555-0123"
                />
              </div>
              
              <div className="form-group">
                <label>Shipping Address</label>
                <textarea
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                  placeholder="Full shipping address"
                  rows="3"
                />
              </div>
              
              <div className="plant-details-grid">
                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash_on_delivery">Cash on Delivery</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Shipping Cost ($)</label>
                  <input
                    type="number"
                    name="shipping"
                    value={formData.shipping}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="submit">
                  Add Order
                </button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="add-product-modal">
          <div className="add-product-content">
            <h2>Order Details - {selectedOrder.orderNumber}</h2>
            <div className="order-details-content">
              <div className="order-info-grid">
                <div className="order-info-section">
                  <h3>Customer Information</h3>
                  <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                  <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customerPhone || 'N/A'}</p>
                  <p><strong>Address:</strong> {selectedOrder.shippingAddress || 'N/A'}</p>
                </div>
                
                <div className="order-info-section">
                  <h3>Order Information</h3>
                  <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
                  <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {selectedOrder.status}</p>
                  <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                </div>
              </div>
              
              <div className="order-items-section">
                <h3>Order Items</h3>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <table className="order-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No items in this order</p>
                )}
              </div>
              
              <div className="order-summary">
                <h3>Order Summary</h3>
                <p><strong>Subtotal:</strong> {formatCurrency(selectedOrder.subtotal || 0)}</p>
                <p><strong>Tax:</strong> {formatCurrency(selectedOrder.tax || 0)}</p>
                <p><strong>Shipping:</strong> {formatCurrency(selectedOrder.shipping || 0)}</p>
                <p><strong>Total:</strong> {formatCurrency(selectedOrder.total || 0)}</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;