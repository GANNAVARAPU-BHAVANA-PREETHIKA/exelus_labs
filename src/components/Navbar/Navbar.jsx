import React, { useState, useRef, useEffect, useContext } from 'react';
>>>>>>> 347ae7686bb7afb4a71171b2b0c0cccd23ed3267
=======
import React, { useState, useRef, useEffect, useContext } from 'react';
=======
import React, { useState, useRef, useEffect, useContext } from 'react';
>>>>>>> 347ae7686bb7afb4a71171b2b0c0cccd23ed3267
import './Navbar.css';
import logo from '../../assets/chem.png';
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

const Navbar = () => {
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useContext(ProductContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    const timeout = setTimeout(() => setDropdownOpen(false), 2000);
    setCloseTimeout(timeout);
  };
>>>>>>> 347ae7686bb7afb4a71171b2b0c0cccd23ed3267
=======
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useContext(ProductContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    const timeout = setTimeout(() => setDropdownOpen(false), 2000);
    setCloseTimeout(timeout);
  };

=======
  const dropdownRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useContext(ProductContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    const timeout = setTimeout(() => setDropdownOpen(false), 2000);
    setCloseTimeout(timeout);
  };

>>>>>>> 347ae7686bb7afb4a71171b2b0c0cccd23ed3267
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

>>>>>>> 347ae7686bb7afb4a71171b2b0c0cccd23ed3267
=======
  const closeMenu = () => {
    setMenuOpen(false);
  };

=======
>>>>>>> 347ae7686bb7afb4a71171b2b0c0cccd23ed3267
  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      const search = searchTerm.toLowerCase().trim();

      if (!search) return;

      const match = products.find(
        (product) =>
          (product.name && product.name.toLowerCase() === search) ||
          (product.cas_no && product.cas_no.toLowerCase() === search) ||
          (product.cat_no && product.cat_no.toLowerCase() === search)
      );

      if (match) {
        navigate(`/products/${match.cat_no}`);
      } else {
        navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
      }
      setSearchTerm('');
      closeMenu();
    }
  };

    if (closeTimeout) clearTimeout(closeTimeout);
    closeMenu();
    setDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
>>>>>>> 347ae7686bb7afb4a71171b2b0c0cccd23ed3267
=======
  const handleMenuItemClick = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    closeMenu();
    setDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
=======
    if (closeTimeout) clearTimeout(closeTimeout);
    closeMenu();
    setDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
>>>>>>> 347ae7686bb7afb4a71171b2b0c0cccd23ed3267
  }, []);

  useEffect(() => {
    const handleResize = () => {
<<<<<<< HEAD
      const mobile = window.innerWidth <= 1024;
      setIsMobileNav(mobile);

      if (!mobile) {
        setMenuOpen(false);
      }

      setDropdownOpen(false);
=======
      if (window.innerWidth > 1024) {
        setMenuOpen(false);
      }
>>>>>>> 347ae7686bb7afb4a71171b2b0c0cccd23ed3267
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="scrolling-wrapper">
          <div className="scrolling-text">
            Free shipping for UK, USA, European countries
          </div>
        </div>
        <div className="contact-info">
          <a
            className="contact-pill"
            href="mailto:info@exeluslabs.com?subject=Inquiry&body=Hello%20Exelus%20Labs"
            aria-label="Email Exelus Labs"
          >
            <span className="contact-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16v12H4z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </span>
            <span>info@exeluslabs.com</span>
          </a>
          <a
            className="contact-pill"
            href="tel:+917989540212"
            aria-label="Call Exelus Labs"
          >
            <span className="contact-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.78.68 2.62a2 2 0 0 1-.45 2.11L8.07 9.93a16 16 0 0 0 6 6l1.48-1.27a2 2 0 0 1 2.11-.45c.84.33 1.72.56 2.62.68A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span>+91 79895 40212</span>
          </a>
          <a
            className="contact-pill"
            href="https://wa.me/917989540212"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp Exelus Labs"
          >
            <span className="contact-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.05 4.94A9.94 9.94 0 0 0 12 2C6.48 2 2 6.47 2 12c0 1.76.46 3.48 1.33 5l-1.4 5.1 5.23-1.37A9.96 9.96 0 0 0 12 22c5.52 0 10-4.47 10-10 0-2.67-1.04-5.18-2.95-7.06ZM12 20.13c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.1.81.83-3.02-.2-.31A8.08 8.08 0 0 1 3.87 12 8.13 8.13 0 0 1 12 3.87 8.13 8.13 0 0 1 20.13 12 8.13 8.13 0 0 1 12 20.13Zm4.46-6.1c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.17-.7-.62-1.17-1.38-1.31-1.62-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.77-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.33.98 2.49c.12.16 1.68 2.56 4.07 3.59.57.25 1.01.4 1.35.51.57.18 1.09.15 1.5.09.46-.07 1.4-.57 1.6-1.11.2-.55.2-1.01.14-1.11-.06-.1-.22-.16-.46-.28Z" />
              </svg>
            </span>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      <div className="navbar">
        <div className="navbar-top">
          <img src={logo} alt="Logo" className="logo" />

          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? 'X' : '='}
          </button>
        </div>

        <ul className={menuOpen ? 'show' : ''}>
          <li>
            <Link to="/home" onClick={handleMenuItemClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={handleMenuItemClick}>
              Products
            </Link>
          </li>
<<<<<<< HEAD
          <li
            className="dropdown"
            ref={dropdownRef}
            onMouseEnter={() => {
              if (!isMobileNav) openDropdown();
            }}
            onMouseLeave={() => {
              if (!isMobileNav) closeDropdown();
            }}
          >
            <button
              type="button"
              className="dropdown-toggle"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Services
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-content">
=======
          <li className="dropdown" ref={dropdownRef} onMouseLeave={closeDropdown}>
            <span className="dropdown-toggle" onMouseEnter={toggleDropdown}>
              Services
            </span>
            {isDropdownOpen && (
              <ul className="dropdown-content" onMouseEnter={toggleDropdown}>
                <li>
                  <Link to="/services" onClick={handleMenuItemClick}>
                    Custom Synthesis
                  </Link>
                </li>
              </ul>
            )}
          </li>
                <li>
                  <Link to="/services" onClick={handleMenuItemClick}>
                    Custom Synthesis
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/about-us" onClick={handleMenuItemClick}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact-us" onClick={handleMenuItemClick}>
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="navbar-right">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Name, CAS or CAT number"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={handleSearch}
            />
            <button
              className="search-btn"
              onClick={handleSearch}
              aria-label="Search"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
