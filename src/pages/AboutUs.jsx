import React from 'react';
import './AboutUs.css';
import aboutUsFooterBg from '../assets/about-us-footer background image.jpg';

const AboutUs = () => {
  return (
    <div className="au-page">
      {/* Hero Banner */}
      <div className="au-hero">
        <div className="au-hero-inner">
          <p className="au-hero-sub">Precision Meets Innovation</p>
          <h1 className="au-hero-title">About Us</h1>
          <p className="au-hero-desc">
            Exelus Labs Private Limited delivers high-performance impurity standards and custom organic synthesis solutions to pharmaceutical, chemical, and research industries worldwide.
          </p>
        </div>
      </div>

      {/* Who We Are */}
      <div className="au-section au-intro-section">
        <div className="au-intro-grid">
          <div className="au-intro-text">
            <h2 className="au-section-title">Who We Are</h2>
            <p>
              Founded on a commitment to quality and scientific excellence, Exelus Labs is a trusted name in the supply of impurity reference standards and complex organic molecules. Our team of experienced chemists and researchers work tirelessly to deliver compounds that meet the most demanding regulatory and research requirements.
            </p>
            <p>
              We serve clients across continents, providing reliable, fast delivery from our ready-stock inventory, backed by rigorous quality control at every step.
            </p>
          </div>
          <div className="au-stat-grid">
            <div className="au-stat-card">
              <span className="au-stat-num">Impurities &amp; </span>
              <span className="au-stat-num">Custom Synthesis</span>
            </div>
            <div className="au-stat-card">
              <span className="au-stat-num">10+</span>
              <span className="au-stat-label">Countries Served</span>
            </div>
            <div className="au-stat-card">
              <span className="au-stat-num">Assured</span>
              <span className="au-stat-label">Purity Standard</span>
            </div>
            <div className="au-stat-card">
              <span className="au-stat-num">ISO</span>
              <span className="au-stat-label">9001 &amp; 14001 Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="au-section au-dark-section">
        <div className="au-section-inner">
          <h2 className="au-section-title au-light-title">What We Do</h2>
          <div className="au-cards-row">
            <div className="au-card">
              <h3>Impurity Standards</h3>
              <p>We offer a comprehensive range of impurity standards including nitroso impurities, stable isotope-labeled compounds, and deuterated compounds - all engineered to meet the highest standards of purity and regulatory compliance.</p>
            </div>
            <div className="au-card">
              <h3>Custom Organic Synthesis</h3>
              <p>From novel compound development to complex multi-step synthesis, our team delivers scalable solutions ensuring flexibility, efficiency, and precision for your specific research and manufacturing needs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="au-section au-why-section">
        <div className="au-section-inner">
          <h2 className="au-section-title">Why Choose Us</h2>
          <div className="au-cards-row au-three-col">
            <div className="au-info-card">
              <span className="au-card-label">Expertise</span>
              <h3>Leading Expertise</h3>
              <p>We provide an extensive selection of high-purity impurity standards essential for research, testing, and regulatory compliance across a wide range of industries.</p>
            </div>
            <div className="au-info-card">
              <span className="au-card-label">Custom</span>
              <h3>Tailored Solutions</h3>
              <p>Our chemists excel in complexity - offering fully customized synthesis and process optimization to meet your unique project goals.</p>
            </div>
            <div className="au-info-card">
              <span className="au-card-label">Global</span>
              <h3>Global Delivery</h3>
              <p>Serving clients across continents, we ensure fast, dependable delivery from our ready-stock inventory - no matter where you're located.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div
        className="au-footer-banner"
        style={{ backgroundImage: `url(${aboutUsFooterBg})` }}
      >
        <div className="au-footer-overlay">
          <h2>More Than a Supplier - A Strategic Partner</h2>
          <p>
            At Exelus Labs, we collaborate closely with our clients to solve challenges, drive innovation, and support the development of next-generation solutions.
          </p>
          <p>
            We&apos;re excited to hear about your ideas and help you turn them into reality. Whether you have a specific project in mind or just want to explore possibilities, we&apos;re here for you.
          </p>
          <p className="au-tagline">Exelus Labs - Quality Leads.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
