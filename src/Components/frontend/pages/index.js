import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Home from './Home';
import About from './About';
import Blog from './Blog';
import Portfolio from './Portfolio';
import axios from "axios";
import { https } from '../../../Config';

const Navbar = () => {
  return (
    <div className="header">
      <div className="container">
        <nav className="navbar navbar-inverse" role="navigation">
          <div className="navbar-header">
            <button type="button" id="nav-toggle" className="navbar-toggle" data-toggle="collapse" data-target="#main-nav">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="#" className="navbar-brand scroll-top">
              <div></div>
            </a>
          </div>
          <div id="main-nav" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><a href="#" className="scroll-top">Home</a></li>
              <li><a href="#" className="scroll-link" data-id="about">About Us</a></li>
              <li><a href="#" className="scroll-link" data-id="portfolio">Portfolio</a></li>
              <li><a href="#" className="scroll-link" data-id="blog">Blog</a></li>
              <li><a href="#" className="scroll-link" data-id="contact">Contact Us</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('/contact/message/store', formData);
      setIsSubmitting(false);

      if (response.data.status === 'success') {
        Swal.fire({
          position: 'center',
          title: response.data.message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
        });
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        Swal.fire({
          position: 'center',
          title: response.data.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Something went wrong. Please try again later.',
        showConfirmButton: false,
        timer: 4500,
      });
    }
  };

  return (
    <div id="contact" className="page-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h4>Contact Us</h4>
              <div className="line-dec"></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 mx-auto">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <fieldset>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Your name..."
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-md-6">
                  <fieldset>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Your email..."
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </fieldset>
                </div>
                <div className="col-md-12">
                  <fieldset>
                    <textarea
                      name="message"
                      rows="6"
                      className="form-control"
                      id="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </fieldset>
                </div>
                <div className="col-md-12">
                  <fieldset>
                    <button type="submit" id="form-submit" className="btn" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </fieldset>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ socialLinks }) => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="copyright-text">
              <p>Copyright &copy; 2024 Company Name - Design: <a href="#" target="_parent">Portfolio</a></p>
            </div>
          </div>
          <div className="col-md-6">
            <ul>
              {socialLinks && socialLinks.map((socialLink, index) => (
                <li key={index}>
                  <a href={socialLink.link} target="_blank">
                    <i className={socialLink.icon}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Main = ({ socialLinks }) => {
  const [data, setData] = useState({
    sliders: [],
    services: [],
    whatWeDo: [],
    portfolios: [],
    categories: [],
    blogs: [],
    funFacts: [],
    socialLinks: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${https}/api/data`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Home sliders={data.sliders} />
      <About whatWeDo={data.whatWeDo} services={data.services} />
      <Portfolio portfolios={data.portfolios} categories={data.categories} />
      <Blog blogs={data.blogs} funFacts={data.funFacts} />
      <ContactForm />
      <Footer socialLinks={data.socialLinks} />
      {loading && (
        <div className="loader-overlay">
          <div className="loader">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default Main;
