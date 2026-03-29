import React, { useState, useEffect } from "react";
// Local project images:
import todoImage from "./assets/TO DO.png";
import heelsImage from "./assets/Heels.png";
import hijabImage from "./assets/Hijab.png";
import weatherImage from "./assets/weather.png";
import portfolioImage from "./assets/portfolio.png";
import gameImage from "./assets/game.png"; 
import memoryLeakImage from "./assets/memory leak.png"; 
import gsImage from "./assets/GS.png";
import "./App.css";

// Project Card Component
const ProjectCard = ({ project, onViewDetails, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`project-card ${isVisible ? 'visible' : ''}`}>
      <div className="project-image">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="project-overlay">
          <span className="project-category">{project.category}</span>
        </div>
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.shortDesc}</p>
        
        <div className="project-tech">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="tech-tag">{tech}</span>
          ))}
        </div>
        
        <button 
          className="project-btn"
          onClick={() => onViewDetails(project)}
          aria-label={`View details of ${project.title}`}
        >
          View Details
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

// Modal Component
const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content animate-slide-up">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        
        <div className="modal-image">
          <img src={project.image} alt={project.title} />
        </div>
        
        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          
          <div className="modal-tech">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="tech-tag">{tech}</span>
            ))}
          </div>
          
          <p className="modal-description">{project.longDesc}</p>
          
          <div className="modal-features">
            <h4>📋 Key Features:</h4>
            <ul>
              {project.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="modal-actions">
            {project.demoLink && (
              <a 
                href={project.demoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="modal-btn demo-btn"
              >
                🔗 Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Complete Projects Data with Images
const projectsData = [
  {
    id: 1,
    title: "✅ To-Do List Application",
    shortDesc: "Dynamic task management app with local storage persistence",
    longDesc: "A fully functional To-Do List Application that allows users to manage tasks efficiently. Built with HTML, CSS, and JavaScript, this app demonstrates modern web development practices including DOM manipulation and browser storage. Tasks remain saved even after page refresh, providing a seamless user experience.",
    category: "Web App",
    image: todoImage,
    technologies: ["HTML5", "CSS3", "JavaScript", "Local Storage"],
    features: [
      "Add new tasks with ease",
      "Delete unwanted tasks",
      "Tasks persist after page refresh using Local Storage",
      "Clean and responsive user interface",
      "Real-time UI updates",
      "Task completion tracking"
    ],
    demoLink: "https://calculator-web-application-eue3.vercel.app"
  },
  {
    id: 2,
    title: "🛒 GS Grocery Store",
    shortDesc: "Online grocery delivery system with shopping cart",
    longDesc: "A comprehensive online grocery delivery system that provides a seamless shopping experience. Users can browse products, add to cart, search and filter items, and complete orders through an intuitive interface.",
    category: "E-commerce",
    image: gsImage,
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "React"],
    features: [
      "User-friendly grocery interface",
      "Product catalog with categories",
      "Shopping cart functionality",
      "Product search and filtering options",
      "Order management system",
      "Checkout process"
    ],
    demoLink: "https://github.com/muzalfa786786786-cmyk/GS-Grocery-Store"
  },
  {
    id: 3,
    title: "❌⭕ Tic Tac Toe Game",
    shortDesc: "Classic Tic Tac Toe game with single & two-player modes",
    longDesc: "An interactive console-based Tic Tac Toe game developed in C++. Features both single-player and two-player modes with complete game logic implementation.",
    category: "Game",
    image: gameImage,
    technologies: ["C++", "Arrays", "Functions", "OOP"],
    features: [
      "Single-player and two-player modes",
      "Symbol selection (X or O) for players",
      "2D Array game board implementation",
      "Player turn management system",
      "Winning logic detection",
      "Match draw detection",
      "Replay option functionality"
    ],
    demoLink: "https://github.com/muzalfa786786786-cmyk/Tic-Tac-Toe-Game-C-"
  },
  {
    id: 4,
    title: "🧠 Memory Leak Detection Tool",
    shortDesc: "Real-time system process monitoring & memory leak detection",
    longDesc: "An advanced memory leak detection and monitoring tool that tracks system processes in real-time, identifies abnormal memory consumption, and ensures optimal software performance.",
    category: "Developer Tool",
    image: memoryLeakImage,
    technologies: ["Python", "Django", "SQLite", "OS Concepts"],
    features: [
      "Real-time system process monitoring",
      "Memory and CPU usage tracking",
      "Historical data storage with SQLite",
      "Automated memory leak detection algorithm",
      "Statistical memory growth analysis",
      "Long-term performance auditing"
    ],
    demoLink: "https://github.com/muzalfa786786786-cmyk/Memory-Leak-Detection-Monitoring-Tool"
  },
  {
    id: 5,
    title: "👠 Jutti Heels - Fashion E-Commerce",
    shortDesc: "Premium fashion e-commerce for modern heels & footwear",
    longDesc: "A fully responsive, multi-page fashion e-commerce website for a modern heels and footwear brand. Features elegant UI with product exploration, details view, color selection, and quantity management.",
    category: "E-commerce",
    image: heelsImage,
    technologies: ["HTML5", "CSS3", "JavaScript", "Font Awesome"],
    features: [
      "Fully responsive design",
      "Multi-page website",
      "Interactive product cards with hover effects",
      "Add to Cart functionality",
      "Product details page with image gallery",
      "Color selection with visual feedback",
      "Quantity selector",
      "Mobile-friendly navigation"
    ],
    demoLink: "https://e-commerce-website-heels.vercel.app"
  },
  {
    id: 6,
    title: "🧕 E-Commerce Website - Hijab",
    shortDesc: "Modern multi-page online store for hijab fashion",
    longDesc: "A fully responsive multi-page e-commerce website focused on building a clean, modern, and fully interactive online store experience.",
    category: "E-commerce",
    image: hijabImage,
    technologies: ["HTML5", "CSS3", "JavaScript", "Flexbox", "Grid"],
    features: [
      "Responsive Home Page",
      "About Us Page",
      "Products Page with pricing",
      "Individual Product Details Page",
      "Add to Cart & Buy Now Buttons",
      "Quantity Selector",
      "Color Selection",
      "Multi-page Navigation"
    ],
    demoLink: "https://e-commerce-website-hijab.vercel.app"
  },
  {
    id: 7,
    title: "🌤️ Weather Web Application",
    shortDesc: "Professional weather app with OpenWeatherMap API",
    longDesc: "A fully functional professional multi-page weather web application using OpenWeatherMap API. Features login validation, city-based weather search, and dynamic backgrounds.",
    category: "Web App",
    image: weatherImage,
    technologies: ["HTML5", "CSS3", "JavaScript", "OpenWeatherMap API"],
    features: [
      "Login Page with validation",
      "Weather Search functionality",
      "API Integration using Fetch()",
      "Dynamic background based on weather",
      "DOM Manipulation",
      "Responsive UI design",
      "Glassmorphism styling"
    ],
    demoLink: "https://github.com/muzalfa786786786-cmyk/Weather-Web-Application"
  },
  {
    id: 8,
    title: "💼 Frontend Internship Projects",
    shortDesc: "Complete frontend development portfolio from NexaSecure Tech",
    longDesc: "A collection of frontend development projects completed during internship at NexaSecure Tech. Includes multiple e-commerce websites and web applications.",
    category: "Portfolio",
    image: portfolioImage,
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "API Integration"],
    features: [
      "Multiple e-commerce website projects",
      "Weather application with API",
      "Responsive multi-page websites",
      "Interactive product catalogs",
      "Shopping cart implementations",
      "Form validation systems",
      "Modern UI/UX design"
    ],
    demoLink: "https://e-commerce-website-portfolio-cdt1.vercel.app"
  }
];

// Filter Component
const ProjectFilters = ({ activeFilter, onFilterChange, categories }) => {
  return (
    <div className="project-filters">
      {categories.map(category => (
        <button
          key={category}
          className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
          onClick={() => onFilterChange(category)}
        >
          {category === "All" && "📁 All Projects"}
          {category === "Web App" && "🌐 Web Apps"}
          {category === "E-commerce" && "🛒 E-commerce"}
          {category === "Game" && "🎮 Games"}
          {category === "Developer Tool" && "🔧 Developer Tools"}
          {category === "Portfolio" && "💼 Portfolio"}
        </button>
      ))}
    </div>
  );
};

// Stats Component
const ProjectStats = ({ projects }) => {
  const totalProjects = projects.length;
  const categories = [...new Set(projects.map(p => p.category))];
  const technologies = [...new Set(projects.flatMap(p => p.technologies))];
  
  return (
    <div className="project-stats">
      <div className="stat-card">
        <span className="stat-number">{totalProjects}</span>
        <span className="stat-label">Total Projects</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{categories.length}</span>
        <span className="stat-label">Categories</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{technologies.length}+</span>
        <span className="stat-label">Technologies</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">100%</span>
        <span className="stat-label">Completion</span>
      </div>
    </div>
  );
};

// Main Projects Component
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = ["All", ...new Set(projectsData.map(p => p.category))];
  
  const filteredProjects = projectsData.filter(project => {
    const matchesFilter = filter === "All" || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <h1 className="hero-title">My <span className="highlight">Projects</span></h1>
          <p className="hero-subtitle">
            Explore my portfolio of web applications, e-commerce stores, games, and developer tools
          </p>
          <p className="hero-subtitle-small">
            🚀 8+ Projects | 💻 Multiple Technologies | 🌟 Real-world Applications
          </p>
        </div>
      </section>
      
      {/* Stats Section */}
      <ProjectStats projects={projectsData} />
      
      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          {/* Search and Filter */}
          <div className="projects-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="🔍 Search projects by name or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <ProjectFilters
              activeFilter={filter}
              onFilterChange={setFilter}
              categories={categories}
            />
          </div>
          
          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onViewDetails={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>❌ No projects found matching your criteria.</p>
              <button onClick={() => {setFilter("All"); setSearchTerm("");}}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Projects;