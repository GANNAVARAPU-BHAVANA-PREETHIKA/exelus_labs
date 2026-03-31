import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [mailPromptVisible, setMailPromptVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const company = formData.get('company')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    const subject = 'Contact Us Enquiry';
    const mailBody = [
      'Hello Exelus Labs,',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || '-'}`,
      `Organisation / Company: ${company || '-'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    setMailPromptVisible(true);
    setTimeout(() => setMailPromptVisible(false), 4000);
    e.target.reset();
    window.location.href = `mailto:info@exeluslabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
  };

  return (
    <div className="cu-page">
      {/* Hero Banner */}
      <div className="cu-hero">
        <div className="cu-hero-inner">
          <p className="cu-hero-sub">We&apos;d love to hear from you</p>
          <h1 className="cu-hero-title">Get In Touch</h1>
          <p className="cu-hero-desc">
            Whether you have a specific project, need a quote, or just want to explore what&apos;s possible - our team is ready to help.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="cu-body">
        {/* Left - Info Panel */}
        <div className="cu-info">
          <div className="cu-info-card">
            <span className="cu-info-label">Phone</span>
            <p className="cu-info-value">+91 78995 40212</p>
            <p className="cu-info-value">+91 97096 66777</p>
          </div>
          <div className="cu-info-card">
            <span className="cu-info-label">Email</span>
            <a href="mailto:info@exeluslabs.com" className="cu-info-value cu-link">
              info@exeluslabs.com
            </a>
          </div>
          <div className="cu-info-card">
            <span className="cu-info-label">Address</span>
            <a
              href="https://www.google.com/maps/place/Gaddapotharam,+Kistaipally,+Telangana+502319"
              target="_blank"
              rel="noopener noreferrer"
              className="cu-info-value cu-link"
            >
              Gaddapotharam, Kistaipally,<br />Telangana 502319, India
            </a>
          </div>
          <div className="cu-info-card">
            <span className="cu-info-label">Business Hours</span>
            <p className="cu-info-value">Mon - Sat: 9:00 AM - 6:00 PM</p>
            <p className="cu-info-value cu-dim">Sundays &amp; Holidays: Closed</p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="cu-form-panel">
          <h2 className="cu-form-title">Send Us a Message</h2>
          {mailPromptVisible && (
            <div className="cu-success">
              Your email app should open with this message ready to send.
            </div>
          )}
          <form className="cu-form" onSubmit={handleSubmit}>
            <div className="cu-form-row">
              <div className="cu-field">
                <label>Your Name</label>
                <input type="text" name="name" placeholder="Full name" required />
              </div>
              <div className="cu-field">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="cu-field">
              <label>Phone Number</label>
              <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" />
            </div>
            <div className="cu-field">
              <label>Organisation / Company</label>
              <input type="text" name="company" placeholder="Your company name" />
            </div>
            <div className="cu-field">
              <label>Message</label>
              <textarea name="message" placeholder="Describe your requirement or project..." rows="5" required></textarea>
            </div>
            <button type="submit" className="cu-submit">Send Message</button>
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="cu-map-section">
        <h2 className="cu-map-title">Our Location</h2>
        <div className="cu-map-wrap">
          <iframe
            title="Exelus Labs Location"
            src="https://maps.google.com/maps?q=Gaddapotharam,+Kistaipally,+Telangana+502319&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
