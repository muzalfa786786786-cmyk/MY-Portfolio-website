require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const app = express();
app.set('trust proxy', 1);
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
    message: "Portfolio Backend API is running",
    endpoints: {
      health: "/health",
      sendEmail: "/send-email (POST)"
    }
  });
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

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ Email credentials not configured!");
    return res.status(500).json({ 
      success: false, 
      error: "Email service not configured" 
    });
  }

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.verify();
    console.log("✅ Email transporter verified");

    // Email to owner
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📧 New Contact from ${name}`,
      html: `<h2>New Contact</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`
    });
    console.log("✅ Email sent to owner");
    
    // Auto-reply
    await transporter.sendMail({
      from: `"Muzalfa Bibi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting me!",
      html: `<h2>Thank You!</h2><p>Dear ${name},</p><p>Thanks for reaching out. I'll get back to you within 24-48 hours.</p><p>Best,<br>Muzalfa Bibi</p>`
    });
    console.log("✅ Auto-reply sent");

    return res.status(200).json({ 
      success: true, 
      message: "Message sent successfully!" 
    });

  } catch (error) {
    console.error("❌ Email error:", error.message);
    return res.status(500).json({ 
      success: false, 
      error: "Failed to send message" 
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

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER ? 'Configured' : 'NOT Configured'}`);
});
