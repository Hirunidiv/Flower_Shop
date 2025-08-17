import React from 'react';

const Customers = () => (
  <div className="customers-container">
    <div className="customers-card">
      <div className="customers-header">
        <h2 className="customers-title">Customers</h2>
        <div className="customers-controls">
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="filter-btn">All Customers</button>
        </div>
      </div>
      <div className="table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Contact No.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>C1001</td>
              <td>Atheef Solam</td>
              <td>atheefsolam@gmail.com</td>
              <td>+94 729983819</td>
              <td>
                <div className="action-btn-group">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>C1002</td>
              <td>Mohamed Mukarram</td>
              <td>mukarram23@gmail.com</td>
              <td>+94 766934585</td>
              <td>
                <div className="action-btn-group">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>C1003</td>
              <td>Hansara Hettiyarchchi</td>
              <td>hansara56@gmail.com</td>
              <td>+94 766934612</td>
              <td>
                <div className="action-btn-group">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>C1004</td>
              <td>Nipun Nivindya</td>
              <td>nipun78@gmail.com</td>
              <td>+94 756934585</td>
              <td>
                <div className="action-btn-group">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>C1005</td>
              <td>Dulanka Nimsara</td>
              <td>dulanka45@gmail.com</td>
              <td>+94 719634528</td>
              <td>
                <div className="action-btn-group">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </td>
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
  </div>
);

export default Customers;