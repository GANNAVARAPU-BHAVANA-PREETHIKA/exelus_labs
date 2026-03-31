import React, { useEffect } from 'react';
import './CustomSynthesis.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import lab1 from '../assets/lab1.jpg';
import lab2 from '../assets/lab2.jpg';
import lab3 from '../assets/lab3.png';
import lab4 from '../assets/lab4.jpg';

const CustomSynthesis = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const particlesInit = async (main) => {
    await loadSlim(main);
  };

  return (
    <div className="custom-synthesis-container">
      {/* Particle Background */}
      <div className="particles-wrapper">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            background: { color: '#ffffff00' },
            particles: {
              number: { value: 60, density: { enable: true, value_area: 800 } },
              color: { value: '#3f8efc' },
              links: { enable: true, color: '#3f8efc', opacity: 0.4, distance: 120 },
              move: { enable: true, speed: 1 },
              size: { value: 2 },
              opacity: { value: 0.6 },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: 'repulse' },
                onClick: { enable: true, mode: 'push' },
              },
              modes: {
                repulse: { distance: 100 },
                push: { quantity: 4 },
              },
            },
          }}
        />
      </div>

      {/* Page Content */}
      <div className="custom-header">
        <h1>Custom Synthesis</h1>
        <p>Precision chemistry solutions tailored to your research needs</p>
        <a href="/Exelus- Custom Synthesis.pdf" download="Exelus- Custom Synthesis.pdf" className="download-btn">
          Product list
        </a>
      </div>

      <div className="custom-section">
        <div className="custom-card" data-aos="fade-up">
          <i className="fas fa-search"></i>
          <h3>Scouting</h3>
          <p>Identifying the best synthetic routes and starting materials.</p>
        </div>
        <div className="custom-card" data-aos="fade-up" data-aos-delay="100">
          <i className="fas fa-flask"></i>
          <h3>Development</h3>
          <p>Refining synthetic processes for maximum efficiency.</p>
        </div>
        <div className="custom-card" data-aos="fade-up" data-aos-delay="200">
          <i className="fas fa-cogs"></i>
          <h3>Optimization</h3>
          <p>Enhancing yield, purity, and reproducibility for production.</p>
        </div>
        <div className="custom-card" data-aos="fade-up" data-aos-delay="300">
          <i className="fas fa-vials"></i>
          <h3>Small Synthesis</h3>
          <p>Producing lab-scale quantities for testing and trials.</p>
        </div>
      </div>

      <div className="custom-details" data-aos="fade-up">
        <img src={lab1} alt="Lab" className="lab-image" />
        <div className="details-text">
          <h2>Capabilities and Specialties</h2>
          <p>
            At Exelus Labs, our advanced synthetic chemistry laboratories are outfitted with cutting-edge equipment, and staffed by highly qualified scientists. We offer unmatched expertise in custom synthesis, building blocks, intermediates, and speciality chemicals, making us a trusted partner for designing efficient, scalable processes or working seamlessly with your existing methods.
          </p>
          <p>
            Whether you need pharmaceutical ingredients or other complex chemical entities, we deliver precision, reliability, and scientific excellence at every step.
          </p>
        </div>
      </div>

      <div className="custom-details reverse" data-aos="fade-up">
        <div className="details-text">
          <h2>Quality and Analysis</h2>
          <p>
            At Exelus Labs, quality isn&apos;t just a standard - it&apos;s a core principle that defines every aspect of our operations. From our comprehensive quality management systems to cutting-edge laboratories and a team of expert scientists, technicians, administrators, and project managers, we are committed to delivering excellence.
          </p>
          <p>
            Our research and synthesis facilities adhere to ISO 9001:2015 and ISO 14001:2015 standards, enabling precise and efficient in-process and final product quality control through advanced analytical technologies. This capability allows our teams to thoroughly understand, refine, and complete synthesis processes, ensuring the production of high-quality outcomes. Beyond certifications, Exelus Labs is fully licensed to manufacture, store, distribute, and sell controlled substances, ensuring full regulatory compliance at every step.
          </p>
        </div>
        <img src={lab2} alt="Quality Analysis" className="lab-image" />
      </div>

      <div className="custom-details" data-aos="fade-up">
        <img src={lab3} alt="Project Management" className="lab-image" />
        <div className="details-text">
          <h2>Partnership and Project Management</h2>
          <p>
            Effective collaboration and transparent communication are integral to successful project execution in chemical research and development. Prior to project initiation, our scientific team conducts a thorough evaluation of feasible synthetic pathways tailored to your target molecule, performs risk assessments, and generates a detailed proposal. This includes comprehensive documentation planning and alignment with quality control specifications.
          </p>
          <p>
            Throughout the project lifecycle, a dedicated project manager acts as your primary liaison, ensuring seamless coordination, real-time updates, and alignment with technical and regulatory milestones from route scouting through to final delivery.
          </p>
        </div>
      </div>

      <div className="custom-details reverse" data-aos="fade-up">
        <div className="details-text">
          <h2>Chemistry for All Applications</h2>
          <p>
            At Exelus Labs, we excel in tackling complex synthetic challenges. Our core expertise lies in the design and synthesis of bespoke molecules tailored to meet diverse R&amp;D requirements. We collaborate with partners across the pharmaceutical and diagnostic industries, as well as academic and research institutions.
          </p>
        </div>
        <img src={lab4} alt="Chemistry Model" className="lab-image" />
      </div>
    </div>
  );
};

export default CustomSynthesis;
