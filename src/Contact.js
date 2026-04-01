import React, { useState, useEffect } from "react";
import "./App.css";

// Custom hook for form validation
const useFormValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (fieldValues = values) => {
    let tempErrors = {};

    if ('name' in fieldValues) {
      tempErrors.name = fieldValues.name.length < 2 
        ? 'Name must be at least 2 characters' 
        : '';
    }

    if ('email' in fieldValues) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      tempErrors.email = !emailRegex.test(fieldValues.email) 
        ? 'Please enter a valid email address' 
        : '';
    }

    if ('message' in fieldValues) {
      tempErrors.message = fieldValues.message.length < 10 
        ? 'Message must be at least 10 characters' 
        : fieldValues.message.length > 500 
          ? 'Message cannot exceed 500 characters' 
          : '';
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validate,
    resetForm
  };
};

// Social Media Link Component
const SocialLink = ({ platform, url, icon, color }) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="social-link"
      style={{ '--social-color': color }}
      aria-label={`Follow me on ${platform}`}
    >
      <span className="social-icon">{icon}</span>
      <span className="social-platform">{platform}</span>
    </a>
  );
};

// Contact Info Card Component
const ContactInfoCard = ({ icon, title, info, link }) => {
  return (
    <div className="contact-info-card">
      <div className="info-icon">{icon}</div>
      <div className="info-content">
        <h4 className="info-title">{title}</h4>
        {link ? (
          <a href={link} className="info-link">{info}</a>
        ) : (
          <p className="info-text">{info}</p>
        )}
      </div>
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, formData }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="success-modal">
      <div className="success-modal-content animate-slide-up">
        <div className="success-icon">✓</div>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for reaching out, {formData.name}!</p>
        <p className="success-detail">I'll get back to you within 24 hours.</p>
        <button onClick={onClose} className="success-close">Got it</button>
      </div>
    </div>
  );
};

// Main Contact Component
const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  
  const initialValues = {
    name: "",
    email: "",
    message: ""
  };

  const {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validate,
    resetForm
  } = useFormValidation(initialValues);

  // ✅ COMPLETE WORKING handleSubmit FUNCTION - YAHAN CHANGE KARO
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    
    if (validate()) {
      setIsSubmitting(true);
      setIsLoading(true);
      
      try {
        // ✅ Environment variable based API URL
        const API_URL = process.env.REACT_APP_API_URL || "https://my-portfolio-website-f91g.onrender.com/send-email";
        
        console.log("📡 Sending to:", API_URL);
        console.log("📝 Data:", { name: values.name, email: values.email });
        
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            message: values.message
          })
        });

        console.log("📊 Response status:", response.status);
        
        let data;
try {
  data = await response.json();
} catch {
  throw new Error("Server returned invalid response");
}

if (!response.ok) {
  throw new Error(data?.error || "Server error");
}
        console.log("📦 Response data:", data);

        if (response.ok && data.success) {
          setIsLoading(false);
          setShowSuccess(true);
          resetForm();
          
          setTimeout(() => {
            setShowSuccess(false);
          }, 5000);
        } else {
          throw new Error(data.error || "Failed to send message");
        }
      } catch (error) {
        console.error("❌ Error:", error);
        setServerError(error.message || "Network error. Please try again.");
        setIsLoading(false);
        
        setTimeout(() => {
          setServerError("");
        }, 5000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      info: "muzalfa786786786@example.com",
      link: "mailto:muzalfa786786786@example.com"
    },
    {
      icon: "📱",
      title: "Phone",
      info: "+92 3277755575",
      link: "tel:+923277755575"
    },
    {
      icon: "📍",
      title: "Location",
      info: "Lahore, Punjab, Pakistan",
      link: null
    },
    {
      icon: "💼",
      title: "Working Hours",
      info: "Mon-Fri, 9AM - 6PM",
      link: null
    }
  ];

  const socialLinks = [
    { platform: "GitHub", url: "https://github.com/muzalfa786786786-cmyk", icon: "🐙", color: "#333" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/muzalfa-bibi-49ba203b2", icon: "🔗", color: "#0077b5" },
    { platform: "Email", url: "mailto:muzalfa786786786@example.com", icon: "📧", color: "#ea4335" }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="hero-title">Let's <span className="highlight">Connect</span></h1>
          <p className="hero-subtitle">
            Have a project in mind? I'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h2>Send me a message</h2>
                <p>I'll get back to you as soon as possible</p>
              </div>
              
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={errors.name ? 'error' : ''}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <div className="input-wrapper">
                    <span className="input-icon">📧</span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="youremail@example.com"
                      className={errors.email ? 'error' : ''}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <div className="input-wrapper">
                    <span className="input-icon message-icon">💬</span>
                    <textarea
                      id="message"
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows="5"
                      className={errors.message ? 'error' : ''}
                      disabled={isSubmitting}
                      required
                    ></textarea>
                  </div>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                  <div className="char-counter">
                    {values.message.length}/500 characters
                  </div>
                </div>

                {serverError && (
                  <div className="error-message-server">
                    ❌ {serverError}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner-small"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="btn-icon">✈️</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-container">
              <div className="info-header">
                <h2>Contact Information</h2>
                <p>Feel free to reach out through any of these channels</p>
              </div>

              <div className="contact-info-grid">
                {contactInfo.map((info, index) => (
                  <ContactInfoCard key={index} {...info} />
                ))}
              </div>

              <div className="social-section">
                <h3>Follow me</h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>

              {/* Availability Badge */}
              <div className="availability-badge">
                <span className="status-dot"></span>
                <span>Available for freelance work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How quickly do you respond?</h3>
              <p>I typically respond within 24 hours during business days.</p>
            </div>
            <div className="faq-item">
              <h3>What's your preferred project size?</h3>
              <p>I work on projects of all sizes, from small fixes to large applications.</p>
            </div>
            <div className="faq-item">
              <h3>Do you offer ongoing support?</h3>
              <p>Yes, I provide maintenance and support packages for my projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        formData={values}
      />
    </div>
  );
};

export default Contact;
