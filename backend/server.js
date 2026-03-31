require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    "https://my-portfolio-website-orpin-phi.vercel.app",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:5001"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: "Too many messages sent. Please try again later." }
});

app.use("/send-email", limiter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is running",
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Portfolio Backend API is running"
  });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Test endpoint working!" });
});

// Validation middleware
const validateContactForm = (req, res, next) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: "All fields are required" 
    });
  }
  
  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({ 
      success: false, 
      error: "Name must be between 2 and 50 characters" 
    });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      error: "Please enter a valid email address" 
    });
  }
  
  if (message.length < 10 || message.length > 1000) {
    return res.status(400).json({ 
      success: false, 
      error: "Message must be between 10 and 1000 characters" 
    });
  }
  
  next();
};

// Email sending endpoint
app.post("/send-email", validateContactForm, async (req, res) => {
  const { name, email, message } = req.body;

  console.log("\n📧 New message received:");
  console.log(`   From: ${name} <${email}>`);
  console.log(`   Message: ${message.substring(0, 50)}...`);
  console.log(`   Origin: ${req.headers.origin}`);

  // Check email configuration
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Email credentials not configured!");
    return res.status(500).json({ 
      success: false, 
      error: "Email service not configured. Please contact administrator." 
    });
  }

  try {
    // Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verify transporter connection
    await transporter.verify();
    console.log("✅ Email transporter verified");

    // Email to owner (you)
    const mailOptionsToOwner = {
      from: `"Muzalfa Bibi Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📧 New Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    // Email to user (auto-reply)
    const mailOptionsToUser = {
      from: `"Muzalfa Bibi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting me! 🙏",
      html: `
        <h2>Thank You for Reaching Out! 🙏</h2>
        <p>Dear ${name},</p>
        <p>Thank you for contacting me. I have received your message and will get back to you within 24-48 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>"${message}"</p>
        <p>Best regards,<br>Muzalfa Bibi<br>Web Developer & IT Student</p>
      `
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToOwner);
    console.log("✅ Email sent to owner");
    
    await transporter.sendMail(mailOptionsToUser);
    console.log("✅ Auto-reply sent to user");

    return res.status(200).json({ 
      success: true, 
      message: "Message sent successfully! I'll get back to you soon." 
    });

  } catch (error) {
    console.error("❌ Email error:", error.message);
    
    if (error.code === 'EAUTH') {
      return res.status(500).json({ 
        success: false, 
        error: "Email authentication failed. Please check credentials." 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      error: "Failed to send message. Please try again later." 
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: "Route not found" 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ 
    success: false, 
    error: "Internal server error" 
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log(`📧 Email Account: ${process.env.EMAIL_USER || 'Not set'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});
