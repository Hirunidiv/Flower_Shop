import React from 'react';

const PlantCard = ({ name, category, price, image, alt }) => {
  return (
    <div className="plant-card">
      <div className="plant-image-container">
        <img src={image} alt={alt} className="plant-image" />
      </div>
      <div className="plant-info">
        <div className='plant-des'>
            <h3 className="plant-name">{name}</h3>
            <p className="plant-price">${price}</p>
        </div>
        <p className="plant-category">{category}</p>
      </div>
      <button className="add-to-cart-btn">
        ADD TO CART 🛒
      </button>
    </div>
  );
};

const TopSellingFlowers = ({ 
  titleFirst = "TOP SELLING", 
  titleSecond = "FLOWERS",
  plants = [
    {
      name: "SNAKE PLANT",
      category: "Cactus",
      price: "149",
      image: "/topselling/top1.jpg",
      alt: "Snake Plant"
    },
    {
      name: "CANDELABRA ALOE",
      category: "Aloe Vera",
      price: "39",
      image: "/topselling/top2.jpg",
      alt: "Candelabra Aloe"
    },
    {
      name: "GOLDEN POTHOS",
      category: "Pothos",
      price: "69",
      image: "/topselling/top3.jpg",
      alt: "Golden Pothos"
    },
    {
      name: "HOMALOMENA",
      category: "Bonnie",
      price: "119",
      image: "/topselling/top4.jpg",
      alt: "Homalomena"
    }
  ],
  showViewMore = true
}) => {

  return (
    <div className="container">
      <h1 className="title">
        <span className="green">{titleFirst}</span> {titleSecond}
      </h1>

      <div className="plants-grid">
        {plants.map((plant, index) => (
          <PlantCard
            key={index}
            name={plant.name}
            category={plant.category}
            price={plant.price}
            image={plant.image}
            alt={plant.alt}
          />
        ))}
      </div>

      {showViewMore && (
        <div className="view-more-container">
          <button className="view-more-btn">View More</button>
        </div>
      )}
    </div>
  );
};

export default TopSellingFlowers;