import React, { useState, useEffect } from "react";
import profileImage from "./assets/profile.png";
import "./App.css";

// Skill Card Component
const SkillCard = ({ skill, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`skill-card ${isVisible ? 'visible' : ''}`}>
      <div className="skill-icon">{skill.icon}</div>
      <h3 className="skill-name">{skill.name}</h3>
      <p className="skill-level">{skill.level}</p>
      <div className="skill-progress">
        <div 
          className="skill-progress-bar" 
          style={{ width: isVisible ? skill.progress : '0%' }}
        ></div>
      </div>
    </div>
  );
};

// Experience Card Component
const ExperienceCard = ({ experience }) => {
  return (
    <div className="experience-card">
      <div className="experience-icon">{experience.icon}</div>
      <div className="experience-content">
        <h3 className="experience-title">{experience.title}</h3>
        <p className="experience-description">{experience.description}</p>
        <span className="experience-date">{experience.date}</span>
      </div>
    </div>
  );
};

// Skills data configuration
const skillsData = [
  { name: "HTML5", level: "Advanced", progress: 90, icon: "🌐" },
  { name: "CSS3", level: "Advanced", progress: 85, icon: "🎨" },
  { name: "JavaScript", level: "Advanced", progress: 80, icon: "⚡" },
  { name: "React", level: "Intermediate", progress: 75, icon: "⚛️" },
  { name: "Java", level: "Intermediate", progress: 70, icon: "☕" },
  { name: "MySQL", level: "Intermediate", progress: 65, icon: "🗄️" },
];

// Experience data configuration
const experiencesData = [
  {
    title: "BS Information Technology",
    description: "Currently pursuing Bachelor's degree in Information Technology. Working on real-world projects and building practical solutions.",
    date: "2023 - Present",
    icon: "🎓"
  },
  {
    title: "Web Development Projects",
    description: "Developed POS system, restaurant dashboard, e-commerce platforms, and AI-based applications with modern tech stack.",
    date: "2024 - Present",
    icon: "💻"
  },
  {
    title: "Freelance Developer",
    description: "Provided web development services to clients, building responsive websites and web applications.",
    date: "2025 - Present",
    icon: "🚀"
  }
];

// About Section Component
const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <div className="section-badge">Get to know me</div>
            <h1 className="about-title">
              About <span className="highlight">Me</span>
            </h1>
            <div className="about-description">
              <p>
                I am <strong>Muzalfa Bibi</strong>, an enthusiastic IT student and 
                passionate web developer dedicated to crafting exceptional digital experiences.
              </p>
              <p>
                I specialize in building modern, responsive websites and working on 
                innovative AI-based systems. My approach combines technical expertise 
                with creative problem-solving to deliver solutions that make a difference.
              </p>
              <p>
                With experience in <strong>HTML, CSS, JavaScript, React, Java, and MySQL</strong>,
                I continuously push my boundaries to learn new technologies and apply them 
                to solve real-world challenges.
              </p>
            </div>
            
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number">6+</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Dedication</span>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-wrapper">
              <div className="profile-placeholder">
                <img
                  src={profileImage}
                  alt="Muzalfa profile"
                  className="profile-image"
                />
              </div>
              <div className="floating-card experience-card-small">
                <span>💻</span>
                <p>2+ Years Experience</p>
              </div>
              <div className="floating-card projects-card-small">
                <span>🚀</span>
                <p>10+ Projects Done</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section Component
const SkillsSection = () => {
  return (
    <section className="skills-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">My Expertise</div>
          <h2 className="section-title">Technical <span className="highlight">Skills</span></h2>
          <p className="section-subtitle">
            Technologies and tools I master to build amazing digital solutions
          </p>
        </div>
        
        <div className="skills-container">
          {skillsData.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Section Component
const ExperienceSection = () => {
  return (
    <section className="experience-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">My Journey</div>
          <h2 className="section-title">Education & <span className="highlight">Experience</span></h2>
          <p className="section-subtitle">
            A glimpse into my professional journey and academic background
          </p>
        </div>
        
        <div className="timeline">
          {experiencesData.map((experience, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              {index !== experiencesData.length - 1 && <div className="timeline-line"></div>}
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Links Section Component
const ContactLinksSection = () => {
  return (
    <section className="contact-links-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Let's Connect</div>
          <h2 className="section-title">Find Me <span className="highlight">Online</span></h2>
          <p className="section-subtitle">
            Connect with me on professional platforms and get in touch
          </p>
        </div>

        <div className="contact-links-container">

          <a
            href="mailto:muzalfa786786786@example.com"
            className="contact-link email-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send email to Muzalfa"
          >
            <div className="contact-link-icon">📧</div>
            <div className="contact-link-content">
              <h3>Email</h3>
              <p>muzalfa786786786@example.com</p>
            </div>
            <div className="contact-link-arrow">→</div>
          </a>

          <a
            href="https://linkedin.com/in/muzalfa-bibi-49ba203b2"
            className="contact-link linkedin-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Muzalfa's LinkedIn profile"
          >
            <div className="contact-link-icon">💼</div>
            <div className="contact-link-content">
              <h3>LinkedIn</h3>
              <p>linkedin.com/in/muzalfa-bibi-49ba203b2</p>
            </div>
            <div className="contact-link-arrow">→</div>
          </a>

          <a
            href="https://github.com/muzalfa786786786-cmyk"
            className="contact-link github-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Muzalfa's GitHub profile"
          >
            <div className="contact-link-icon">🐙</div>
            <div className="contact-link-content">
              <h3>GitHub</h3>
              <p>github.com/muzalfa786786786-cmyk</p>
            </div>
            <div className="contact-link-arrow">→</div>
          </a>
        </div>
      </div>
    </section>
  );
};

// Main About Component
const About = () => {
  useEffect(() => {
    // Smooth scroll to top on component mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="about-page">
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactLinksSection />
    </div>
  );
};

export default About;
