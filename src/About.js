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
  { name: "HTML5", level: "Advanced", progress: 100, icon: "🌐" },
  { name: "CSS3", level: "Advanced", progress: 100, icon: "🎨" },
  { name: "JavaScript", level: "Advanced", progress: 100, icon: "⚡" },
  { name: "React.js", level: "Intermediate", progress: 100, icon: "⚛️" },
  { name: "Python", level: "Intermediate", progress: 100, icon: "🐍" },
  { name: "Django", level: "Intermediate", progress: 100, icon: "🌐" },
  { name: "Java", level: "Intermediate", progress: 100, icon: "☕" },
  { name: "C++", level: "Intermediate", progress: 100, icon: "💻" },
  { name: "Dart", level: "Intermediate", progress: 100, icon: "🎯" },
  { name: "SQL", level: "Intermediate", progress: 100, icon: "🗄️" },
  { name: "MySQL", level: "Intermediate", progress: 100, icon: "🐬" },
  { name: "SQLite", level: "Intermediate", progress: 100, icon: "💾" },
  { name: "Bootstrap", level: "Intermediate", progress: 100, icon: "🅱️" },
  { name: "REST APIs", level: "Intermediate", progress: 100, icon: "🔗" },
  { name: "Flutter", level: "Intermediate", progress: 100, icon: "📱" },
  { name: "Firebase", level: "Intermediate", progress: 100, icon: "🔥" },
  { name: "Git & GitHub", level: "Intermediate", progress: 100, icon: "🐙" },
  { name: "OpenCV", level: "Intermediate", progress: 100, icon: "👁️" },
  { name: "NLP", level: "Intermediate", progress: 100, icon: "🧠" },
  { name: "Generative AI", level: "Intermediate", progress: 100, icon: "🤖" },
  { name: "Prompt Engineering", level: "Intermediate", progress: 100, icon: "💡" },
  { name: "Google Gemini", level: "Intermediate", progress: 100, icon: "✨" },
  { name: "Cisco Packet Tracer", level: "Intermediate", progress: 100, icon: "🌐" },
];

// Experience data configuration
const experiencesData = [
  {
    title: "BSC Information Engineering Technology",
    description:
      "Currently pursuing my Bachelor's degree in Information Engineering Technology at Superior University Lahore. I have completed my 6th semester and continue to build practical skills through academic and personal software projects.",
    date: "2023 - Present",
    icon: "🎓"
  },
  {
    title: "Final Year Project - AI Lecturer",
    description:
      "Developed an AI-powered lecturer assistant for slide generation and interactive presentations. The project combines React, Next.js, Django, AI, NLP, RAG, text-to-speech, document processing, and interactive learning features.",
    date: "2025 - Present",
    icon: "🤖"
  },
  {
    title: "Web Development & Software Projects",
    description:
      "Built practical projects including responsive websites, e-commerce applications, weather applications, a memory leak detection tool, C++ games, and software management systems using modern development technologies.",
    date: "2024 - Present",
    icon: "💻"
  },
  {
    title: "MB Auto Parts Inventory System",
    description:
      "Developed a desktop inventory management system for an auto parts business using Java 17, JavaFX, Maven, and NetBeans, with inventory monitoring and CSV/JSON backup functionality.",
    date: "2026",
    icon: "🚗"
  },
  {
    title: "Frontend Development Internship",
    description:
      "Completed practical frontend development work during internship at NexaSecure Tech, including responsive websites, e-commerce projects, JavaScript applications, DOM manipulation, and API-based applications.",
    date: "2026",
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
                I am <strong>Muzalfa Bibi</strong>, a Software Engineering
                and Information Technology student with a strong interest in
                web development, software engineering, and Artificial Intelligence.
              </p>

              <p>
                I enjoy building practical, user-friendly applications and
                working on projects that combine creativity with technology.
                My project experience includes web applications, e-commerce
                websites, desktop software, AI-based systems, and developer tools.
              </p>

              <p>
                I work with technologies including
                <strong>
                  {" "}HTML, CSS, JavaScript, React, Python, Django, Java,
                  C++, Flutter, SQL, Firebase, Git & GitHub, and AI technologies
                </strong>.
                I am continuously learning modern tools and technologies while
                developing solutions for real-world problems.
              </p>
            </div>
            
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects</span>
              </div>

              <div className="stat">
                <span className="stat-number">20+</span>
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
                <span>🎓</span>
                <p>Software Engineering Student</p>
              </div>

              <div className="floating-card projects-card-small">
                <span>🚀</span>
                <p>30+ Projects Done</p>
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

          <h2 className="section-title">
            Technical <span className="highlight">Skills</span>
          </h2>

          <p className="section-subtitle">
            Technologies and tools I use to build web applications,
            software projects, AI solutions, and practical digital products
          </p>

        </div>
        
        <div className="skills-container">
          {skillsData.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
            />
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

          <h2 className="section-title">
            Education & <span className="highlight">Experience</span>
          </h2>

          <p className="section-subtitle">
            A glimpse into my academic journey, development experience,
            and practical software projects
          </p>

        </div>
        
        <div className="timeline">

          {experiencesData.map((experience, index) => (
            <div
              key={index}
              className="timeline-item"
            >
              <div className="timeline-dot"></div>

              {index !== experiencesData.length - 1 && (
                <div className="timeline-line"></div>
              )}

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

          <h2 className="section-title">
            Find Me <span className="highlight">Online</span>
          </h2>

          <p className="section-subtitle">
            Connect with me on professional platforms and explore my work
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
