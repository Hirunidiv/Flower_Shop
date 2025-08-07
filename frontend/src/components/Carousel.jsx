import React, { useState } from 'react'
import '../components/carousel.css'


const slides = [
  { src: "/carousel/carousel1.jpg", alt: "Slide 1" },
  { src: "/carousel/carousel2.webp", alt: "Slide 2" },
  { src: "/carousel/carousel3.jpg", alt: "Slide 3" },
];
function Carousel() {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };
  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, idx) => (
          <div className="carousel-slide" key={idx}>
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>
      <button className="carousel-btn prev" onClick={prevSlide}>&lt;</button>
      <button className="carousel-btn next" onClick={nextSlide}>&gt;</button>
      <button className="carousel-order-btn">ORDER NOW</button>
    </div>
  )
}

export default Carousel