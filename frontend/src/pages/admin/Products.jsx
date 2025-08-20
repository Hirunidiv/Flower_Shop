import React, { useState, useEffect } from 'react';
import AddProductForm from '../../components/AddProductForm.jsx';
import EditProductForm from '../../components/EditProductForm.jsx';
import OtherProductsForm from '../../components/OtherProductsForm.jsx';
import { getStoredProducts, deleteProductFromStorage } from '../../utils/productStorage';
import './Adminpage.css';

const Products = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showOtherProduct, setShowOtherProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Load products from localStorage
  useEffect(() => {
    loadProducts();
    
    const handleProductsUpdate = () => {
      loadProducts();
    };

    window.addEventListener('productsUpdated', handleProductsUpdate);
    
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate);
    };
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  const loadProducts = () => {
    const storedProducts = getStoredProducts();
    setProducts(storedProducts);
  };

  const handleAddProductClick = () => setShowAddProduct(true);
  const handleOtherProductClick = () => setShowOtherProduct(true);
  
  const handleCloseForm = () => {
    setShowAddProduct(false);
    loadProducts(); // Reload products when form closes
  };

  const handleCloseOtherForm = () => {
    setShowOtherProduct(false);
    loadProducts(); // Reload products when form closes
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowEditProduct(true);
  };

  const handleCloseEditForm = () => {
    setShowEditProduct(false);
    setEditingProduct(null);
    loadProducts(); // Reload products when form closes
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const success = deleteProductFromStorage(productId);
      if (success) {
        loadProducts();
        alert('Product deleted successfully!');
      } else {
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="admin-products-container">
        <div className="admin-products-header">
          <h2 className="admin-products-title">Products</h2>
          <div className="admin-products-controls">
            <input 
              type="text" 
              className="admin-search-input" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="admin-add-product-btn" onClick={handleAddProductClick}>
              Add Plant Product
            </button>
            <button className="admin-add-product-btn" onClick={handleOtherProductClick} style={{ backgroundColor: '#2E7D32' }}>
              Add Other Product
            </button>
          </div>
        </div>
        <div className="admin-table-container">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="admin-product-id">#{product.id}</td>
                    <td className="admin-name-with-image">
                      <div className="admin-product-image">
                        <img 
                          src={product.image || '/images/default-plant.jpg'} 
                          alt={product.name}
                          onError={(e) => {
                            e.target.src = '/images/default-plant.jpg';
                          }}
                        />
                      </div>
                      <span>{product.name}</span>
                    </td>
                    <td className="admin-product-category">{product.category}</td>
                    <td className="admin-product-price">${product.price}</td>
                    <td className="admin-product-edit">
                      <div className="admin-action-btn-group">
                        <button 
                          className="admin-edit-btn"
                          onClick={() => handleEditProduct(product)}
                          title="Edit Product"
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                          </svg>
                        </button>
                        <button 
                          className="admin-delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Delete Product"
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="admin-no-products">
                    {searchQuery ? 'No products found matching your search.' : 'No products available. Add your first product!'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="admin-products-summary">
          <p>Total Products: {filteredProducts.length}</p>
          {searchQuery && <p>Showing results for: "{searchQuery}"</p>}
        </div>
      {showAddProduct && <AddProductForm onClose={handleCloseForm} />}
      {showEditProduct && editingProduct && (
        <EditProductForm 
          product={editingProduct} 
          onClose={handleCloseEditForm} 
        />
      )}
      {showOtherProduct && (
        <OtherProductsForm 
          onClose={handleCloseOtherForm} 
        />
      )}
    </div>
  );
};

export default Products;