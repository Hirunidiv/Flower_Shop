import React from 'react';

const Orders = () => (
  <div className="orders-section">
    <div className="orders-header">
      <h2 className="section-title">Orders</h2>
      <div className="orders-controls">
        <input type="text" className="search-input" placeholder="Search orders..." />
        <select className="filter-dropdown">
          <option value="">Total Revenue</option>
          <option value="today">Total Orders</option>
          <option value="week">New Customers</option>
          <option value="month">Low Stock Plants</option>
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#1001</td>
            <td>John Doe</td>
            <td>123 Green St, Colombo</td>
            <td>+94 712 345 678</td>
            <td>Green Plant, Herb Pot</td>
            <td className='paid'>Paid</td>
            <td>$120.00</td>
          </tr>
          <tr>
            <td>#1002</td>
            <td>Jane Smith</td>
            <td>45 Flower Rd, Kandy</td>
            <td>+94 711 234 567</td>
            <td>Succulent Set</td>
            <td className='notpaid'>Not Paid</td>
            <td>$85.50</td>
          </tr>
          <tr>
            <td>#1003</td>
            <td>Mike Johnson</td>
            <td>78 Plant Ave, Galle</td>
            <td>+94 714 567 890</td>
            <td>Indoor Tree</td>
            <td className='paid'>Paid</td>
            <td>$200.75</td>
          </tr>
          <tr>
            <td>#1004</td>
            <td>Sarah Williams</td>
            <td>12 Leaf Ln, Negombo</td>
            <td>+94 713 456 789</td>
            <td>Flower Basket</td>
            <td className='paid'>Paid</td>
            <td>$150.30</td>
          </tr>
          <tr>
            <td>#1005</td>
            <td>Robert Brown</td>
            <td>34 Garden St, Matara</td>
            <td>+94 715 678 901</td>
            <td>Cactus Kit</td>
            <td className='notpaid'>Not Paid</td>
            <td>$95.25</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="pagination">
      <button className="pagination-btn">Previous</button>
      <div className="pagination-numbers">
        <span className="page-number">|[ 1 | 2 | 3 | 4 ]|</span>
      </div>
      <button className="pagination-btn">Next</button>
    </div>
  </div>
);

export default Orders;