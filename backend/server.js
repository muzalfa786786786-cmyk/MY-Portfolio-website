require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
    emailConfigured: !!process.env.EMAIL_USER,
    timestamp: new Date().toISOString()
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
  console.log(`   Message: ${message.substring(0, 50)}...`);

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
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📧 New Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #667eea;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>💬 Message:</strong></p>
            <p style="background: white; padding: 10px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p><strong>📅 Sent at:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nSent at: ${new Date().toLocaleString()}`
    };

    // Email to user (auto-reply)
    const mailOptionsToUser = {
      from: `"Muzalfa Bibi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting me! 🙏",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #667eea;">Thank You for Reaching Out! 🙏</h2>
          <p>Dear ${name},</p>
          <p>Thank you for contacting me. I have received your message and will get back to you within 24-48 hours.</p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Your message:</strong></p>
            <p style="background: white; padding: 10px; border-radius: 5px;">"${message}"</p>
          </div>
          <p>In the meantime, you can:</p>
          <ul>
            <li>Check out my portfolio</li>
            <li>Connect with me on LinkedIn</li>
            <li>Follow my GitHub for updates</li>
          </ul>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">Best regards,<br><strong>Muzalfa Bibi</strong><br>Web Developer & IT Student</p>
        </div>
      `,
      text: `Thank You for Reaching Out!\n\nDear ${name},\n\nThank you for contacting me. I have received your message and will get back to you within 24-48 hours.\n\nYour message: "${message}"\n\nBest regards,\nMuzalfa Bibi\nWeb Developer & IT Student`
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
      console.error("Authentication failed. Check your email and app password.");
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health\n`);
});