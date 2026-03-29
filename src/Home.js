import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "./assets/profile.png";
import "./App.css";

// Separate SkillItem component for better reusability
const SkillItem = ({ name, description, onSkillClick, isActive }) => {
  return (
    <button
      className={`skill-tag ${isActive ? "active" : ""}`}
      onClick={() => onSkillClick(name, description)}
      aria-label={`Learn about ${name}`}
    >
      {name}
    </button>
  );
};

// Skills data configuration
const skillsData = [
  { name: "HTML", description: "HTML: Structure of web pages - Creating semantic, accessible markup" },
  { name: "CSS", description: "CSS: Styling and layout - Modern Flexbox, Grid, and responsive design" },
  // eslint-disable-next-line no-script-url
  { name: "JavaScript", description: "JavaScript: Adds interactivity - ES6+, async programming, DOM manipulation" },
  { name: "React", description: "React: Frontend library - Hooks, Context API, React Router, performance optimization" },
  { name: "Java", description: "Java: Backend & desktop apps - OOP, Spring Boot, multithreading" },
  { name: "MySQL", description: "MySQL: Database management - Complex queries, optimization, database design" },
];

// Hero Section Component
// Hero Section Component
const HeroSection = ({ onViewProjects, onContactMe }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Muzalfa</span> 👋
          </h1>
          <h2 className="hero-subtitle">Web Developer & IT Student</h2>
          <p className="hero-description">
            I build modern web applications and AI-based systems.
            Passionate about creating user-friendly designs and seamless experiences.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn-primary" 
              onClick={onViewProjects}
              aria-label="View my projects"
            >
              View Projects
              <span className="btn-icon">→</span>
            </button>
            <button 
              className="btn-secondary" 
              onClick={onContactMe}
              aria-label="Contact me"
            >
              Contact Me
            </button>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="code-icon">
            <img 
              src={profileImage}
              alt="Muzalfa - Web Developer"
              className="hero-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section Component
const SkillsSection = ({ skills, selectedSkill, onSkillSelect }) => {
  return (
    <section className="skills">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </div>
        
        <div className="skills-grid">
          {skills.map((skill) => (
            <SkillItem
              key={skill.name}
              name={skill.name}
              description={skill.description}
              onSkillClick={onSkillSelect}
              isActive={selectedSkill?.name === skill.name}
            />
          ))}
        </div>
        
        {selectedSkill && (
          <div className="skill-detail animate-fade-in">
            <div className="skill-detail-content">
              <h3 className="skill-detail-title">{selectedSkill.name}</h3>
              <p className="skill-detail-description">{selectedSkill.description}</p>
              <button 
                className="skill-detail-close"
                onClick={() => onSkillSelect(null)}
                aria-label="Close skill details"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Main Home Component
const Home = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Navigation handlers
  const handleViewProjects = useCallback(() => {
    navigate("/projects");
  }, [navigate]);

  const handleContactMe = useCallback(() => {
    navigate("/contact");
  }, [navigate]);

  // Skill selection handler
  const handleSkillSelect = useCallback((skillName, skillDescription) => {
    if (skillName === null) {
      setSelectedSkill(null);
      return;
    }

    if (selectedSkill?.name === skillName) {
      setSelectedSkill(null); // Close if same skill clicked
    } else {
      setSelectedSkill({ name: skillName, description: skillDescription });
    }
  }, [selectedSkill]);

  return (
    <div className="home-container">
      <HeroSection 
        onViewProjects={handleViewProjects}
        onContactMe={handleContactMe}
      />
      
      <SkillsSection 
        skills={skillsData}
        selectedSkill={selectedSkill}
        onSkillSelect={handleSkillSelect}
      />
    </div>
  );
};

export default Home;