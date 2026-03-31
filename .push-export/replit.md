# Exelus Labs - React Web Application

## Overview
A professional laboratory/chemical company website for Exelus Labs. Features product listings, custom synthesis services, and company information.

## Tech Stack
- **Frontend:** React 18 (Create React App)
- **Routing:** react-router-dom v6
- **Styling:** CSS Modules / Standard CSS
- **UI Libraries:** react-icons, FontAwesome, react-slick, AOS (animate on scroll), tsparticles
- **Package Manager:** npm

## Project Structure
```
src/
  assets/       - Images, PDFs, brochures
  components/   - Reusable UI (Navbar, Footer, ProductCard, ParticlesBackground)
  context/      - Global state (ProductContext.jsx)
  data/         - Static data (products.json)
  pages/        - Page components (Home, AboutUs, ContactUs, CustomSynthesis, ProductList, ProductDetail)
  App.js        - Main routing and entry point
public/         - Static assets, index.html
```

## Running the App
- **Workflow:** "Start application"
- **Command:** `PORT=5000 HOST=0.0.0.0 DANGEROUSLY_DISABLE_HOST_CHECK=true npm start`
- **Port:** 5000

## Deployment
- **Target:** Static site
- **Build command:** `npm run build`
- **Public directory:** `build`
