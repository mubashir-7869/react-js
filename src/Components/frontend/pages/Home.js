import React from 'react';
import { img_url } from '../../../Config';


const Home = ({ sliders = [] }) => { // Default to an empty array if sliders is undefined
  return (
    <section className="cd-hero">
      {sliders.length > 0 ? ( // Check if sliders are available
        <>
          <ul className="cd-hero-slider autoplay">
            {sliders.map((slider, index) => (
              <li 
                key={index} 
                className={index === 0 ? 'selected' : ''} 
                style={{ backgroundImage: `url(${img_url(slider.slide_image)})` }} 
              >
                {console.log("image",slider.slide_image)}
                <div className="cd-full-width">
                  <div className="tm-slide-content-div slide-caption">
                    <span>{slider.slide_subtitle}</span>
                    <h2>{slider.slide_title}</h2>
                    <p>{slider.slide_description}</p>
                    {slider.button_link && slider.button_name && (
                      <div className="primary-button">
                        <a href={slider.button_link}>{slider.button_name}</a>
                      </div>
                    )}
                  </div>
                </div> 
              </li>
            ))}
          </ul>

          <div className="cd-slider-nav">
            <nav>
              <span className="cd-marker item-1"></span>
              <ul>
                {sliders.map((_, index) => (
                  <li key={index} className={index === 0 ? 'selected' : ''}>
                    <a href="/"></a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      ) : (
        <div> </div>
      )}
    </section>
  );
};

export default Home;
