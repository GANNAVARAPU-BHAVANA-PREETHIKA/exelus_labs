import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/chem.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section with Logo on Top */}
        <div className="footer-section about">
          <img src={logo} alt="Exelus Labs Logo" className="footer-logo" />
          <h3>Exelus Labs</h3>
          <p>
            Leading provider of high-quality chemical reference standards,
            impurities, and stable isotopes for pharmaceutical research.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>
            <i className="fas fa-envelope"></i>&nbsp;
            <a href="mailto:info@exeluslabs.com?subject=Inquiry&body=Hello%20Exelus%20Labs,">info@exeluslabs.com</a>
          </p>
          <p>
            <i className="fas fa-phone"></i>&nbsp;
            <a href="tel:+917989540212">+91-79895-40212</a>
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i>&nbsp;
            <a href="https://share.google/NEc5f2MUpQDeanMe6" target="_blank" rel="noopener noreferrer">
              Location
            </a>
          </p>
          <p className="contact-snippet">
            Certified ISO 9001:2015 | ISO 14001:2015 | Serving clients in 20+ countries
          </p>
          <div className="social-links">
            <a href="https://www.instagram.com/exelus_labs?igsh=MXEyeWU2bXF0NHdhcg==" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/exelus-labs-private-limited-1/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Exelus Labs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
