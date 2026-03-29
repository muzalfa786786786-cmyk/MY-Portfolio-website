import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import logoImage from "./assets/logo.png";

import "./App.css";

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);
// Lazy load components for better performance
// const Home = lazy(() => import("./Home"));
// const About = lazy(() => import("./About"));
// const Projects = lazy(() => import("./Projects"));
// const Contact = lazy(() => import("./Contact"));

// Navigation links configuration
const navLinks = [
  { path: "/", label: "Home", exact: true },
  { path: "/about", label: "About", exact: false },
  { path: "/projects", label: "Projects", exact: false },
  { path: "/contact", label: "Contact", exact: false },
];

// Navbar component
const Navbar = () => {
  return (
    <header className="header">
<div className="logo-container">
  <img src={logoImage} alt="Logo" className="logo-image" />
  <div>
    <h2 className="logo">Muzalfa Bibi</h2>
  </div>
</div>

      <nav className="nav-menu" aria-label="Main Navigation">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => 
              `nav-link ${isActive ? "active" : ""}`
            }
            end={link.exact}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button className="mobile-menu-btn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2026 Muzalfa Bibi. All rights reserved.</p>
        
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/projects">Projects</a>
          <a href="/contact">Contact</a>
        </div>
        
        <div className="social-icons">
          <a href="mailto:muzalfa786786786@example.com" aria-label="Email">📧</a>
          <a href="https://linkedin.com/in/muzalfa-bibi-49ba203b2" className="social-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">💼</a>
          <a href="https://github.com/muzalfa786786786-cmyk" className="social-btn" aria-label="GitHub" target="_blank" rel="noopener noreferrer">🐙</a>
          
        </div>
      </div>
    </footer>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Optional: 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

// Optional: 404 Not Found Component
const NotFound = () => (
  <div className="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <NavLink to="/" className="home-link">
      Go Back Home
    </NavLink>
  </div>
);

export default App;