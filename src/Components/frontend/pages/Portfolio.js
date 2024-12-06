import React, { useState } from 'react';
import { img_url } from '../../../Config';
const Portfolio = ({ categories, portfolios }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="page-section" id="portfolio">
      <div className="content-wrapper">
        <div className="inner-container container">
          <div className="section-heading">
            <h4>Our Portfolio</h4>
            <div className="line-dec"></div>
          </div>
          <div className="filter-categories">
            <ul className="project-filter">
              <li
                className={`filter ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('all')}
              >
                <span>All</span>
              </li>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`filter ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span>{category.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="projects-holder">
            <div className="row">
              {portfolios
                .filter((portfolio) => selectedCategory === 'all' || portfolio.category_id === selectedCategory)
                .map((portfolio) => (
                  <div key={portfolio.id} className={`col-md-3 col-sm-6 project-item mix ${portfolio.category_id}`}>
                    <div className="thumb">
                      <div className="image">
                        <h1>{portfolio.title}</h1>
                        <img
                          src={img_url(portfolio.image)}
                          alt={portfolio.title}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                      <div className="hover-effect">
                        <a href={img_url(portfolio.image)} data-lightbox="image-1">
                          <i className="fa fa-search"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
