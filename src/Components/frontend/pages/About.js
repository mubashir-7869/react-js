import React from 'react';
import { img_url } from '../../../Config';

const About = ({ whatWeDo, services }) => {
  return (
    <div>
      <div id="about" className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h4>What We Do</h4>
                <div className="line-dec"></div>
              </div>
            </div>
          </div>
          <div className="row">
            {Array.isArray(whatWeDo) && whatWeDo.length > 0 ? (
              whatWeDo.map((item, index) => (
                <div key={index} className="col-md-3 col-sm-6 col-xs-12">
                  <div
                    className={`service-item ${index === 0 ? 'first-service' : index === whatWeDo.length - 1 ? 'fourth-service' : ''}`}
                  >
                    {/* {item.icon ? (
                      <i data-feather={item.icon} className="service-icon"></i>
                    ) : ( */}
                      <div className="icon"></div>
                    {/* )} */}
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12"></div> 
            )}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="what-we-do">
        <div className="container">
          <div className="row">
            {Array.isArray(services) && services.length > 0 ? (
              services.map((service, index) => (
                <React.Fragment key={index}>
                  <div className="col-md-6">
                    <div className="left-text">
                      <h4>{service.title}</h4>
                      <p>{service.description}</p>
                      <ul>
                        <li>
                          <div className="white-button">
                            <a href={service.first_btn_link} data-id="portfolio">
                              {service.first_btn_name ?? 'discover more'}
                            </a>
                          </div>
                        </li>
                        <li>
                          <div className="primary-button">
                            <a href={service.second_btn_link}>
                              {service.second_btn_name ?? 'purchase now'}
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="right-image">
                      <img src={img_url(service.right_image_url)} alt={service.title} />
                    </div>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <div className="col-12"></div> // Fallback message
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
