import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './slider.css';

import img1 from '../assets/img1.jpg'; // istockphoto
import img2 from '../assets/img2.jpg'; // pexels-olly
import img3 from '../assets/img3.jpg'; // pexels-artempodrez
import img4 from '../assets/img4.jpg'; // pexels-yankrukov

const images = [
  {
    src: img2,
    title: 'Unlock Your Future',
    type: 'Global Scholarships',
 
    textColor: '#ffffff',
  },
  {
    src: img1,
    title: 'Dream Big',
    type: 'Study Abroad',
   
    textColor: 'white',
  },
  {
    src: img3,
    title: 'Invest in Yourself',
    type: 'Merit-Based Awards',

    textColor: '#ffffff',
  },
  {
    src: img4,
    title: 'No Limits, Just Goals',
    type: 'Need-Based Support',

    textColor: 'white',
  },
];

function Home() {
  const sliderRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const initializeSlider = () => {
      if (!thumbnailRef.current || !listRef.current || !sliderRef.current) return;

      const thumbnails = thumbnailRef.current.querySelectorAll('.item');
      if (thumbnails.length > 0) {
        thumbnailRef.current.appendChild(thumbnails[0]);
      }

      const interval = setInterval(() => {
        moveSlider('next');
      }, 3000);

      return () => clearInterval(interval);
    };

    const timeout = setTimeout(initializeSlider, 100);
    return () => clearTimeout(timeout);
  }, []);

  const moveSlider = (direction) => {
    if (!listRef.current || !thumbnailRef.current || !sliderRef.current) return;

    const slider = sliderRef.current;
    const sliderItems = listRef.current.querySelectorAll('.item');
    const thumbnailItems = thumbnailRef.current.querySelectorAll('.item');

    if (direction === 'next') {
      listRef.current.appendChild(sliderItems[0]);
      thumbnailRef.current.appendChild(thumbnailItems[0]);
      slider.classList.add('next');
    } else {
      listRef.current.prepend(sliderItems[sliderItems.length - 1]);
      thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      slider.classList.add('prev');
    }

    slider.addEventListener(
      'animationend',
      () => {
        slider.classList.remove(direction);
      },
      { once: true }
    );
  };

  return (
    <div className="slider" ref={sliderRef}>
      <div className="list" ref={listRef}>
        {images.map((img, index) => (
          <div className="item" key={index}>
            <img src={img.src} alt={`slide-${index}`} />
            <div className="content" style={{ color: img.textColor }}>
              <div className="title">{img.title}</div>
              <div className="type">{img.type}</div>
              <div className="description">{img.description}</div>
              <div className="buttons">
                <button
                 
               onClick={() => navigate('/all')}
                >
                  SEE MORE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="thumbnail" ref={thumbnailRef}>
        {images.map((img, index) => (
          <div className="item" key={`thumb-${index}`}>
            <img src={img.src} alt={`thumb-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
