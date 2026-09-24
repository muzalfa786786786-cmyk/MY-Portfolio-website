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
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
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
    title: "🤖 AI Lecturer - AI Assistant",
    shortDesc:
      "AI-powered assistant for automated slide generation and interactive presentations",
    longDesc:
      "AI Lecturer is a final year project designed as an AI-powered assistant for slide generation and presentation support. The system can transform topics and uploaded documents into structured presentation content, support AI-generated slides, provide text-to-speech presentation capabilities, and enable interactive question answering. The project also incorporates Retrieval-Augmented Generation (RAG), NLP, multilingual support, quizzes and assessments, analytics, and AI avatar-based presentation features.",
    category: "AI Application",
    image: portfolioImage,
    technologies: [
      "React",
      "Next.js",
      "Django",
      "OpenAI",
      "NLP",
      "RAG",
      "TTS",
      "PostgreSQL",
      "Firebase"
    ],
    features: [
      "AI-powered slide generation",
      "Topic and document-based presentation generation",
      "PPTX and PDF document support",
      "AI presentation with text-to-speech",
      "Live AI-powered Q&A",
      "Retrieval-Augmented Generation (RAG)",
      "Natural Language Processing",
      "Multilingual learning support",
      "Interactive quizzes and assessments",
      "Learning analytics",
      "AI avatar-based presentation",
      "Whiteboard-style explanations"
    ],
    demoLink: "https://ai-lecture-ghr7.vercel.app/"
  },

  {
    id: 2,
    title: "🛒 GS Grocery Store",
    shortDesc: "Online grocery delivery system with shopping cart",
    longDesc:
      "A comprehensive online grocery delivery system that provides a seamless shopping experience. Users can browse products, add items to the cart, search and filter products, and complete orders through an intuitive interface.",
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
    demoLink:
      "https://github.com/muzalfa786786786-cmyk/GS-Grocery-Store"
  },

  {
    id: 3,
    title: "❌⭕ Tic Tac Toe Game",
    shortDesc: "Classic Tic Tac Toe game with single and two-player modes",
    longDesc:
      "An interactive console-based Tic Tac Toe game developed in C++. The project implements complete game logic and provides both single-player and two-player modes.",
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
    demoLink:
      "https://github.com/muzalfa786786786-cmyk/Tic-Tac-Toe-Game-C-"
  },

  {
    id: 4,
    title: "🧠 Memory Leak Detection Tool",
    shortDesc: "Real-time system process monitoring and memory leak detection",
    longDesc:
      "An advanced memory leak detection and monitoring tool that tracks system processes in real-time, identifies abnormal memory consumption, and helps analyze software performance. The project combines Python, Django, SQLite, and operating system concepts.",
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
    demoLink:
      "https://www.linkedin.com/feed/update/urn:li:activity:7446783810349862912/?originTrackingId=%2BPGgfTbE%2FEK4Syp%2F1yoEPg%3D%3D"
  },

  {
    id: 5,
    title: "👠 Jutti Heels - Fashion E-Commerce",
    shortDesc: "Premium fashion e-commerce website for modern heels and footwear",
    longDesc:
      "A fully responsive, multi-page fashion e-commerce website for a modern heels and footwear brand. The project features an elegant user interface with product exploration, product details, color selection, and quantity management.",
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
    demoLink:
      "https://e-commerce-website-heels.vercel.app"
  },

  {
    id: 6,
    title: "🧕 E-Commerce Website - Hijab",
    shortDesc: "Modern multi-page online store for hijab fashion",
    longDesc:
      "A fully responsive multi-page e-commerce website focused on building a clean, modern, and interactive online shopping experience for hijab fashion products.",
    category: "E-commerce",
    image: hijabImage,
    technologies: ["HTML5", "CSS3", "JavaScript", "Flexbox", "Grid"],
    features: [
      "Responsive Home Page",
      "About Us Page",
      "Products Page with pricing",
      "Individual Product Details Page",
      "Add to Cart and Buy Now buttons",
      "Quantity Selector",
      "Color Selection",
      "Multi-page Navigation"
    ],
    demoLink:
      "https://e-commerce-website-hijab.vercel.app"
  },

  {
    id: 7,
    title: "🌤️ Weather Web Application",
    shortDesc: "Professional weather application using OpenWeatherMap API",
    longDesc:
      "A fully functional professional multi-page weather web application using the OpenWeatherMap API. The project includes login validation, city-based weather search, API integration, and dynamic weather-based backgrounds.",
    category: "Web App",
    image: weatherImage,
    technologies: ["HTML5", "CSS3", "JavaScript", "OpenWeatherMap API"],
    features: [
      "Login page with validation",
      "Weather search functionality",
      "API integration using Fetch()",
      "Dynamic background based on weather",
      "DOM manipulation",
      "Responsive UI design",
      "Glassmorphism styling"
    ],
    demoLink:
      "https://github.com/muzalfa786786786-cmyk/Weather-Web-Application"
  },

  {
    id: 8,
    title: "💼 Frontend Internship Projects",
    shortDesc: "Frontend development projects completed during NexaSecure Tech internship",
    longDesc:
      "A collection of frontend development projects completed during internship at NexaSecure Tech. The work includes e-commerce websites, web applications, API integration, responsive interfaces, and interactive UI components.",
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
    demoLink:
      "https://e-commerce-website-portfolio-cdt1.vercel.app"
  },

  {
    id: 9,
    title: "✅ To-Do List Application",
    shortDesc: "Dynamic task management application with local storage persistence",
    longDesc:
      "A fully functional To-Do List Application that allows users to manage tasks efficiently. Built with HTML, CSS, and JavaScript, this application demonstrates modern web development practices including DOM manipulation and browser storage. Tasks remain saved even after page refresh, providing a seamless user experience.",
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
  // ==============================
  // NEW PROJECT 10
  // ==============================
  {
    id: 10,
    title: "🚗 MB Auto Parts Inventory System",
    shortDesc:
      "Desktop inventory management system for an auto parts business",
    longDesc:
      "MB Auto Parts Inventory System is a desktop-based inventory management application developed for managing an auto parts business. The system was converted from a Java POS project into a modern JavaFX desktop application using Java 17 and Maven. It provides an organized interface for managing inventory, monitoring low-stock items, and maintaining backup data.",
    category: "Developer Tool",
    image: portfolioImage,
    technologies: [
      "Java 17",
      "JavaFX",
      "Maven",
      "NetBeans",
      "CSV",
      "JSON"
    ],
    features: [
      "Auto parts inventory management",
      "Modern JavaFX desktop interface",
      "Product and stock management",
      "Low-stock monitoring",
      "Reorder level management",
      "Low-stock threshold below 5 items",
      "Reorder quantity management",
      "CSV data backup",
      "JSON data backup",
      "Maven-based project structure"
    ],
    demoLink: "https://lnkd.in/p/dzhp8GMn"
  }
];

// Filter Component
const ProjectFilters = ({ activeFilter, onFilterChange, categories }) => {
  return (
    <div className="project-filters">
      {categories.map(category => (
        <button
          key={category}
          className={`filter-btn ${
            activeFilter === category ? 'active' : ''
          }`}
          onClick={() => onFilterChange(category)}
        >
          {category === "All" && "📁 All Projects"}
          {category === "Web App" && "🌐 Web Apps"}
          {category === "E-commerce" && "🛒 E-commerce"}
          {category === "Game" && "🎮 Games"}
          {category === "Developer Tool" && "🔧 Developer Tools"}
          {category === "Portfolio" && "💼 Portfolio"}
          {category === "AI Application" && "🤖 AI Applications"}
        </button>
      ))}
    </div>
  );
};

// Stats Component
const ProjectStats = ({ projects }) => {
  const totalProjects = projects.length;
  const categories = [...new Set(projects.map(p => p.category))];
  const technologies = [
    ...new Set(projects.flatMap(p => p.technologies))
  ];
  
  return (
    <div className="project-stats">
      <div className="stat-card">
        <span className="stat-number">{totalProjects}+</span>
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
  
  const categories = [
    "All",
    ...new Set(projectsData.map(p => p.category))
  ];
  
  const filteredProjects = projectsData.filter(project => {
    const matchesFilter =
      filter === "All" || project.category === filter;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      project.title.toLowerCase().includes(search) ||
      project.shortDesc.toLowerCase().includes(search) ||
      project.technologies.some(tech =>
        tech.toLowerCase().includes(search)
      );

    return matchesFilter && matchesSearch;
  });
  
  return (
    <div className="projects-page">

      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <h1 className="hero-title">
            My <span className="highlight">Projects</span>
          </h1>

          <p className="hero-subtitle">
            Explore my portfolio of web applications, e-commerce
            projects, AI applications, games, and developer tools
          </p>

          <p className="hero-subtitle-small">
            🚀 15+ Projects | 💻 Multiple Technologies | 🤖 AI & Web Development
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

              <p>
                ❌ No projects found matching your criteria.
              </p>

              <button
                onClick={() => {
                  setFilter("All");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </button>

            </div>
          )}
        </div>
      </section>
      
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
};

export default Projects;
