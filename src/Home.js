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
  {
    name: "HTML5",
    description:
      "HTML5: Semantic structure, accessible markup, and modern web page development",
  },
  {
    name: "CSS3",
    description:
      "CSS3: Responsive design, Flexbox, Grid, animations, and modern web styling",
  },
  {
    name: "JavaScript",
    description:
      "JavaScript: ES6+, DOM manipulation, asynchronous programming, and interactive web applications",
  },
  {
    name: "React.js",
    description:
      "React.js: Component-based UI development, React Router, hooks, and responsive web applications",
  },
  {
    name: "Python",
    description:
      "Python: Application development, backend development, automation, and AI-related projects",
  },
  {
    name: "Django",
    description:
      "Django: Backend development, database integration, web applications, and REST APIs",
  },
  {
    name: "Java",
    description:
      "Java: Object-oriented programming, desktop application development, and software development",
  },
  {
    name: "C++",
    description:
      "C++: Object-oriented programming, data structures, algorithms, and application development",
  },
  {
    name: "Dart",
    description:
      "Dart: Programming language used for Flutter-based mobile application development",
  },
  {
    name: "SQL",
    description:
      "SQL: Database queries, data management, relational databases, and database operations",
  },
  {
    name: "MySQL",
    description:
      "MySQL: Relational database management, queries, database design, and data storage",
  },
  {
    name: "SQLite",
    description:
      "SQLite: Lightweight database management for desktop and web applications",
  },
  {
    name: "Bootstrap",
    description:
      "Bootstrap: Responsive layouts, reusable components, and mobile-friendly web interfaces",
  },
  {
    name: "REST APIs",
    description:
      "REST APIs: Connecting frontend and backend applications and working with web services",
  },
  {
    name: "Flutter",
    description:
      "Flutter: Cross-platform mobile application development using Dart",
  },
  {
    name: "Firebase",
    description:
      "Firebase: Authentication, Firestore, and backend services for applications",
  },
  {
    name: "Git & GitHub",
    description:
      "Git & GitHub: Version control, repository management, collaboration, and project tracking",
  },
  {
    name: "OpenCV",
    description:
      "OpenCV: Computer vision, image processing, and real-time visual detection projects",
  },
  {
    name: "NLP",
    description:
      "NLP: Basic natural language processing concepts used in AI-based applications",
  },
  {
    name: "Generative AI",
    description:
      "Generative AI: AI-assisted content generation and AI-based application development",
  },
  {
    name: "Prompt Engineering",
    description:
      "Prompt Engineering: Designing effective prompts for AI tools and Generative AI workflows",
  },
  {
    name: "Google Gemini",
    description:
      "Google Gemini: Generative AI tools for research, brainstorming, planning, and development tasks",
  },
  {
    name: "Cisco Packet Tracer",
    description:
      "Cisco Packet Tracer: Network design, routing, switching, DHCP, DNS, and server configuration",
  },
];

// Hero Section Component
const HeroSection = ({ onViewProjects, onContactMe }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">Muzalfa</span> 👋
          </h1>

          <h2 className="hero-subtitle">
            Software Engineering Student | Full Stack Developer
          </h2>

          <p className="hero-description">
            I’m a Software Engineering student with hands-on experience in web
            development, AI-based projects, and software engineering. I enjoy
            building practical, user-friendly applications and learning modern
            technologies.
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
              alt="Muzalfa - Software Engineering Student and Full Stack Developer"
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
              <h3 className="skill-detail-title">
                {selectedSkill.name}
              </h3>

              <p className="skill-detail-description">
                {selectedSkill.description}
              </p>

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
  const handleSkillSelect = useCallback(
    (skillName, skillDescription) => {
      if (skillName === null) {
        setSelectedSkill(null);
        return;
      }

      if (selectedSkill?.name === skillName) {
        setSelectedSkill(null);
      } else {
        setSelectedSkill({
          name: skillName,
          description: skillDescription,
        });
      }
    },
    [selectedSkill]
  );

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
