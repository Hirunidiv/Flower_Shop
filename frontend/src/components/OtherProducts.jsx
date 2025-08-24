import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './OtherProducts.css';

const OtherProducts = ({ className = "", onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fallback hardcoded products
  const fallbackProducts = [
    {
      id: 101,
      name: "CANDELABRA ALOE",
      price: 28,
      rating: 5,
      image: "/images/candelabra-aloe.jpg"
    },
    {
      id: 102,
      name: "HOMALOMENA",
      price: 25,
      rating: 4,
      image: "/images/homalomena.jpg"
    },
    {
      id: 103,
      name: "SNAKE PLANT",
      price: 48,
      rating: 3,
      image: "/images/snake-plant.jpg"
    },
    {
      id: 104,
      name: "GOLDEN POTHOS",
      price: 17,
      rating: 2,
      image: "/images/golden-pothos.jpg"
    },
    {
      id: 105,
      name: "MINI CACTUS",
      price: 8,
      rating: 5,
      image: "/images/placeholder.jpg"
    },
    {
      id: 106,
      name: "BRIDAL BOUQUET",
      price: 95,
      rating: 5,
      image: "/images/wedding-1.jpg"
    },
    {
      id: 107,
      name: "WEDDING ARRANGEMENT",
      price: 78,
      rating: 4,
      image: "/images/wedding-2.jpg"
    }
  ];

  // Fetch other products from API
  useEffect(() => {
    const fetchOtherProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/other-products');
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
          // Map API data to match expected format
          const mappedProducts = data.data.map(product => ({
            id: product._id,
            name: product.name.toUpperCase(),
            price: product.price,
            rating: product.rating || 5,
            image: product.image,
            description: product.description
          }));
          setOtherProducts(mappedProducts);
        } else {
          // Use fallback data if no products from API
          setOtherProducts(fallbackProducts);
        }
        setError('');
      } catch (error) {
        console.error('Error fetching other products:', error);
        // Use fallback data on error
        setOtherProducts(fallbackProducts);
        setError('');
      } finally {
        setLoading(false);
      }
    };

    fetchOtherProducts();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <div key={`full-${i}`} className="other-products-star other-products-full-star"></div>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="other-products-star other-products-half-star"></div>
      );
    }

    return stars;
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    // If parent has onAddToCart handler, use it (for Shop page)
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      // Fallback to direct localStorage update (for other pages)
      const existingCart = JSON.parse(localStorage.getItem('flowerShopCart') || '[]');
      const existingItem = existingCart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        existingCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }
      
      localStorage.setItem('flowerShopCart', JSON.stringify(existingCart));
      
      // Trigger cart update event for navbar
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
    
    closeModal();
  };

  // Modal component using portal
  const Modal = ({ product, onClose }) => {
    useEffect(() => {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);

    const modalContent = (
      <div className="product-modal-overlay" onClick={onClose}>
        <div className="product-modal-card" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>×</button>
          
          <div className="modal-product-image">
            <img 
              src={product.image} 
              alt={product.name}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBGMEYwIiByeD0iMTAiLz4KPHN2ZyB4PSI3NSIgeT0iNzUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjNUJDNTU5Ij4KPHA0aCBkPSJNMTIgMkw2IDhIMTBWMThIMTRWOEgxOEwxMiAyWiIvPgo8L3N2Zz4KPC9zdmc+Cg==';
              }}
            />
          </div>
          
          <div className="modal-product-info">
            <h3 className="modal-product-name">{product.name || 'Product'}</h3>
            
            <div className="modal-rating">
              <div className="modal-stars">
                {renderStars(product.rating)}
              </div>
              <span className="modal-rating-text">({product.rating}/5)</span>
            </div>
            
            <div className="modal-price">
              <span className="modal-price-text">${product.price}</span>
            </div>
            
            <div className="modal-description">
              <p>{product.description || 'Premium quality plant perfect for your home or office. Easy to care for and adds natural beauty to any space.'}</p>
            </div>
            
            <div className="modal-actions">
              <button 
                className="modal-add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  };

  return (
    <div className={`other-products-container ${className}`}>
      {/* Other Products Header */}
      <div className="other-products-header">
        <div className="other-products-header-background">
          <h2 className="other-products-header-title">Other Products</h2>
        </div>
      </div>

      {/* Products List */}
      <div className="other-products-list">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            Loading other products...
          </div>
        ) : otherProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            No other products available
          </div>
        ) : (
          otherProducts.map((product, index) => (
          <div key={product.id} className="other-products-item">
            <div className="other-products-card-frame">
              <div 
                className="other-products-card-background"
                onClick={() => handleProductClick(product)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && handleProductClick(product)}
              >
                {/* Product Image */}
                <div className="other-products-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="other-products-image"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEzIiBoZWlnaHQ9IjExMyIgdmlld0JveD0iMCAwIDExMyAxMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTMiIGhlaWdodD0iMTEzIiBmaWxsPSIjRjBGMEYwIiByeD0iNTYuNSIvPgo8cGF0aCBkPSJNNDUgMzVMNTUgNDVMNDUgNTVMMzUgNDVMNDUgMzVaIiBmaWxsPSIjNUJDNTU5Ii8+CjxwYXRoIGQ9Ik02OCA2MEw3OCA3MEw2OCA4MEw1OCA3MEw2OCA2MFoiIGZpbGw9IiM1QkM1NTkiLz4KPC9zdmc+Cg==';
                    }}
                  />
                </div>

                {/* Product Name */}
                {product.name && (
                  <h3 className="other-products-name">{product.name}</h3>
                )}

                {/* Rating Stars */}
                <div className="other-products-rating-container">
                  {renderStars(product.rating)}
                </div>

                {/* Price */}
                <div className="other-products-price-container">
                  <div className="other-products-price-background">
                    <span className="other-products-price-text">${product.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
        )}
      </div>

      {/* Product Detail Modal using Portal */}
      {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
};

export default OtherProducts;
