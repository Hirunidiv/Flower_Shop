import React, { useState } from 'react';
import AddProductForm from '../../components/Addproductform.jsx';

const Products = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleAddProductClick = () => setShowAddProduct(true);
  const handleCloseForm = () => setShowAddProduct(false);

  return (
    <div className="products-container">
        <div className="products-header">
          <h2 className="products-title">Products</h2>
          <div className="products-controls">
            <input type="text" className="search-input" placeholder="Search products..." />
            <button className="add-product-btn" onClick={handleAddProductClick}>
              Add Product
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Plant Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="product-id">P1001</td>
                <td className="name-with-image">
                  <div className="product-image"><img src="/admin/no1.jpg" alt="" /></div>
                  <span>Homalomena </span>
                </td>
                <td><span className="stock-badge available">Available</span></td>
                <td className="product-price">$15.99</td>
                <td className="product-edit">
                  <button className="edit-btn">
                    <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                  </button>
                </td>
              </tr>
              <tr>
                    <td className="product-id">P1002</td>
                    <td className="name-with-image">
                      <div className="product-image"><img src="/admin/no2.jpg" alt="" /></div>
                      <span>Goldon Pothos</span>
                    </td>
                    <td><span className="stock-badge not-available">Not Available</span></td>
                    <td className="product-price">$12.50</td>
                    <td className="product-edit">
                      <button className="edit-btn">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="product-id">P1003</td>
                    <td className="name-with-image">
                      <div className="product-image"><img src="/admin/no3.jpg" alt="" /></div>
                      <span>Snake Plant</span>
                    </td>
                    <td><span className="stock-badge available">Available</span></td>
                    <td className="product-price">$18.75</td>
                    <td className="product-edit">
                      <button className="edit-btn">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="product-id">P1004</td>
                    <td className="name-with-image">
                      <div className="product-image"><img src="/admin/no4.png" alt="" /></div>
                      <span>Candelabra Aloe</span>
                    </td>
                    <td><span className="stock-badge not-available">Not Available</span></td>
                    <td className="product-price">$22.00</td>
                    <td className="product-edit">
                      <button className="edit-btn">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="product-id">P1005</td>
                    <td className="name-with-image">
                      <div className="product-image"><img src="/admin/no5.jpg" alt="" /></div>
                      <span>Cuctos</span>
                    </td>
                    <td><span className="stock-badge available">Available</span></td>
                    <td className="product-price">$18.75</td>
                    <td className="product-edit">
                      <button className="edit-btn">
                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                    </td>
                  </tr>
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button className="pagination-btn">Prev</button>
          <div className="pagination-numbers">
            <span className="page-number active">1</span>
            <span className="page-number">2</span>
            <span className="page-number">3</span>
            <span className="page-dots">...</span>
            <span className="page-number">10</span>
          </div>
          <button className="pagination-btn">Next</button>
        </div>
      {showAddProduct && <AddProductForm onClose={handleCloseForm} />}
    </div>
  );
};

export default Products;