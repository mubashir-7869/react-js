import React, { useState } from 'react';
import { img_url } from '../../../Config';

const Blog = ({ blogs = [], funFacts = [] }) => {  // Default to empty arrays if data is missing
  const [popupIndex, setPopupIndex] = useState(null);  // State to manage which popup to show

  // Function to handle opening the pop-up
  const handleOpenPopup = (index) => {
    setPopupIndex(index);
  };

  // Function to handle closing the pop-up
  const handleClosePopup = () => {
    setPopupIndex(null);
  };

  return (
    <div>
      {/* Blog Section */}
      <div id="blog" className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h4>Our Blog Posts</h4>
                <div className="line-dec"></div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Ensure blogs is an array and has content */}
            {Array.isArray(blogs) && blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <div key={index} className="col-md-6">
                  <div className="blog-item" onClick={() => handleOpenPopup(index)}>
                    <div className="thumb">
                      {/* Blog Post Image */}
                      <img src={img_url(blog.image)} alt={blog.title} />
                      <div className="text-content">
                        <h4>{blog.title}</h4>
                        <span>
                          Posted: <em>{blog.author}</em> / Date: <em>{new Date(blog.date).toLocaleDateString('en-GB')}</em> / Category: <em>{blog.category}</em>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pop-up Section for Blog Post Details */}
                  {popupIndex === index && (
                    <div className={`pop pop${index}`} style={{ display: 'block' }}>
                      <span onClick={handleClosePopup} style={{ cursor: 'pointer' }}>✖</span>
                      <p>{blog.description}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-12">No blog posts available</div>  // Fallback if no blogs
            )}
          </div>
        </div>
      </div>

      {/* Fun Facts Section */}
      <div id="fun-facts">
        <div className="container">
          <div className="row">
            {/* Ensure funFacts is an array and has content */}
            {Array.isArray(funFacts) && funFacts.length > 0 ? (
              funFacts.map((fact, index) => (
                <div key={index} className="col-md-3 col-sm-6 col-xs-12">
                  <div className="fact-item">
                    <div className="counter" data-count={fact.count}>
                      {fact.count}
                    </div>
                    <span>{fact.label}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">No fun facts available</div>  // Fallback if no fun facts
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
