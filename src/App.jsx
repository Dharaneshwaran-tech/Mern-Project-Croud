import React, { useState } from "react";
import { Link, Element } from "react-scroll";

// Styles
const navStyle = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  padding: "20px",
  background: "linear-gradient(90deg, #0056b3, #00bfff)",
  color: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  position: "fixed",
  width: "100%",
  top: "0",
  zIndex: "1000",
  borderRadius: "0 0 15px 15px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  fontSize: "18px",
  padding: "12px 20px",
  background: "#003f7f",
  borderRadius: "30px",
  cursor: "pointer",
  border: "none",
  transition: "0.3s",
  fontWeight: "bold",
};

const sectionStyle = {
  padding: "120px 20px 40px",
  minHeight: "100vh",
  textAlign: "center",
  background: "#f4f8ff",
  borderRadius: "15px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  margin: "20px",
  maxWidth: "80%",
  marginLeft: "auto",
  marginRight: "auto",
};

const inputStyle = {
  width: "80%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#007BFF",
  color: "#fff",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
};

const loginPageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #0056b3, #00bfff)",
};

const loginFormStyle = {
  background: "#fff",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  width: "300px",
};

// Main App Component
const App = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [donationData, setDonationData] = useState({
    name: "",
    email: "",
    amount: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // Handle donation form submission
  const handleDonationSubmit = (e) => {
    e.preventDefault();
    setShowDonationForm(false);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
    setDonationData({ name: "", email: "", amount: "" });
  };

  // Handle login
  const handleLogin = (email, password) => {
    if (password.length >= 8) {
      setIsLoggedIn(true); // Set login status to true
    } else {
      alert("Password must be at least 8 characters long.");
    }
  };

  // If the user is not logged in, show the login page
  if (!isLoggedIn) {
    return (
      <div style={loginPageStyle}>
        <div style={loginFormStyle}>
          <h2 style={{ color: "#007BFF", marginBottom: "20px" }}>Login</h2>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  // If the user is logged in, show the website
  return (
    <div>
      {/* Navigation Bar */}
      <nav style={navStyle}>
        <Link to="home" smooth={true} duration={500} style={linkStyle}>Home</Link>
        <Link to="about" smooth={true} duration={500} style={linkStyle}>About</Link>
        <Link to="past-projects" smooth={true} duration={500} style={linkStyle}>Past Projects</Link>
        <Link to="current-projects" smooth={true} duration={500} style={linkStyle}>Current Projects</Link>
        <Link to="apply" smooth={true} duration={500} style={linkStyle}>Apply a Project</Link>
      </nav>

      {/* Main Content */}
      <div style={{ marginTop: "80px" }}>
        {/* Home Section */}
        <Element name="home" style={sectionStyle}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ fontSize: "48px", color: "#007BFF", marginBottom: "20px" }}>Welcome to DreamForge</h1>
            <p style={{ fontSize: "20px", color: "#333", maxWidth: "800px", margin: "0 auto" }}>
              Where innovation meets opportunity. We are a global crowdfunding platform dedicated to turning bold ideas into reality. Whether you're a creator with a vision or a supporter looking to make a difference, you're in the right place.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginTop: "40px" }}>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <h3 style={{ color: "#007BFF", marginBottom: "10px" }}>Empowering Innovators</h3>
              <p style={{ fontSize: "16px", color: "#333" }}>
                We provide creators with the tools, resources, and community support they need to bring their ideas to life.
              </p>
            </div>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <h3 style={{ color: "#007BFF", marginBottom: "10px" }}>Supporting Impactful Projects</h3>
              <p style={{ fontSize: "16px", color: "#333" }}>
                From renewable energy to education, we focus on projects that create a positive impact on society and the environment.
              </p>
            </div>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <h3 style={{ color: "#007BFF", marginBottom: "10px" }}>Transparent and Secure</h3>
              <p style={{ fontSize: "16px", color: "#333" }}>
                Every donation is tracked and accounted for, ensuring transparency and trust between creators and backers.
              </p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <p style={{ fontSize: "20px", color: "#333", marginBottom: "20px" }}>
              Ready to make a difference? Explore our current projects or submit your own idea today!
            </p>
            <button style={{ ...linkStyle, marginRight: "10px" }}>
              <Link to="current-projects" smooth={true} duration={500} style={{ textDecoration: "none", color: "#fff" }}>
                Explore Projects
              </Link>
            </button>
            <button style={{ ...linkStyle }}>
              <Link to="apply" smooth={true} duration={500} style={{ textDecoration: "none", color: "#fff" }}>
                Submit Your Idea
              </Link>
            </button>
          </div>
        </Element>

        {/* About Section */}
        <Element name="about" style={sectionStyle}>
          <h1 style={{ fontSize: "48px", color: "#007BFF", marginBottom: "20px" }}>About DreamForge</h1>
          <p style={{ fontSize: "18px", color: "#333", maxWidth: "800px", margin: "0 auto 20px" }}>
            At DreamForge, we are more than just a crowdfunding platform—we are a movement. Our mission is to empower individuals and communities by supporting innovative projects that drive positive change and create a sustainable future. We believe that every great idea deserves a chance to thrive, and we are here to make that happen.
          </p>
          <div style={{ marginTop: "40px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h3 style={{ color: "#007BFF", marginBottom: "10px" }}>Our Vision</h3>
              <p style={{ fontSize: "16px", color: "#333", maxWidth: "800px", margin: "0 auto" }}>
                To create a world where innovative ideas are nurtured, supported, and brought to life, fostering a global community of creators and backers who believe in the power of collective progress.
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "#007BFF", marginBottom: "10px" }}>Our Mission</h3>
              <p style={{ fontSize: "16px", color: "#333", maxWidth: "800px", margin: "0 auto" }}>
                To empower individuals and communities by providing a platform that connects visionary creators with passionate backers, enabling groundbreaking projects to come to life.
              </p>
            </div>
          </div>
          <div style={{ marginTop: "40px" }}>
            <h3 style={{ color: "#007BFF", marginBottom: "20px", textAlign: "center" }}>Meet Our CEO</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
                <img src="ceo.jpg" alt="CEO" style={{ width: "100%", borderRadius: "50%", marginBottom: "10px" }} />
                <h4 style={{ color: "#007BFF", marginBottom: "10px" }}>Dharaneshwaran K R</h4>
                <p style={{ fontSize: "16px", color: "#333" }}>Co-Founder & CEO</p>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  Dharaneshwaran K R is a visionary leader with over 4 years of experience in technology and entrepreneurship. He is passionate about innovation and social impact, and he founded IgniteFund to bring groundbreaking ideas to life.
                </p>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "40px" }}>
            <h3 style={{ color: "#007BFF", marginBottom: "20px", textAlign: "center" }}>Contact Us</h3>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
                <strong>Address:</strong> 123 arivoli nagar, kovaipudur, coimbatore, Tamil Nadu
              </p>
              <p style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
                <strong>Email:</strong> DreamForge@gmail.com
              </p>
              <p style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
                <strong>Phone:</strong> +91 1234567890
              </p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <p style={{ fontSize: "20px", color: "#333", marginBottom: "20px" }}>
              Join us in building a brighter future. Whether you're a creator or a backer, your contribution matters.
            </p>
            <button style={{ ...linkStyle, marginRight: "10px" }}>
              <Link to="current-projects" smooth={true} duration={500} style={{ textDecoration: "none", color: "#fff" }}>
                Explore Projects
              </Link>
            </button>
            <button style={{ ...linkStyle }}>
              <Link to="apply" smooth={true} duration={500} style={{ textDecoration: "none", color: "#fff" }}>
                Submit Your Idea
              </Link>
            </button>
          </div>
        </Element>

        {/* Past Projects Section */}
        <Element name="past-projects" style={sectionStyle}>
          <h1 style={{ fontSize: "48px", color: "#007BFF", marginBottom: "20px" }}>Past Projects</h1>
          <p>At our core, we believe in empowering communities through innovation and collaboration. Over the years, we've transformed countless ideas into reality, fueled by the power of collective support. Each project we've funded has been a step toward building a brighter, more sustainable future—one where creativity and determination pave the way for meaningful change.</p>
          <br></br>
          <p>Explore projects we've successfully funded in the past.</p>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <img src="past img1.jpeg" alt="Project 1" style={{ width: "100%", borderRadius: "10px" }} />
              <h3 style={{ marginTop: "10px", color: "#007BFF" }}>Solar-Powered Water Purification Systems</h3>
              <p style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>In 2022, we funded a project to provide clean drinking water to over 10,000 people in rural areas. By installing solar-powered water purification systems, we not only improved health and hygiene but also empowered communities to focus on education and economic growth. This project is a shining example of how innovation can transform lives.</p>
            </div>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <img src="past img2.jpg" alt="Project 2" style={{ width: "100%", borderRadius: "10px" }} />
              <h3 style={{ marginTop: "10px", color: "#007BFF" }}>AI-Powered Diagnostic Tool</h3>
              <p style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>In 2022, we supported a groundbreaking project that developed an AI-powered diagnostic tool for early detection of diseases. This innovation reduced diagnosis time by 70% and improved accuracy, making healthcare more accessible and affordable for underserved communities. The project has since been adopted by clinics worldwide, saving countless lives.</p>
            </div>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <img src="past img3.jpg" alt="Project 3" style={{ width: "100%", borderRadius: "10px" }} />
              <h3 style={{ marginTop: "10px", color: "#007BFF" }}>IoT-Based Smart City Platform</h3>
              <p style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>Our 2021 initiative funded the development of an IoT-based smart city platform. This system optimized traffic management, reduced energy consumption, and improved public safety in urban areas. By integrating real-time data and automation, the project has transformed how cities operate, making them more efficient and sustainable.</p>
            </div>
          </div>
        </Element>

        {/* Current Projects Section */}
        <Element name="current-projects" style={sectionStyle}>
          <h1 style={{ fontSize: "48px", color: "#007BFF", marginBottom: "20px" }}>Current Projects</h1>
          <p>Check out the projects we're currently supporting. Your support can make a difference!</p>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <img src="current img1.jpg" alt="Project 1" style={{ width: "100%", borderRadius: "10px" }} />
              <h3 style={{ marginTop: "10px", color: "#007BFF" }}>Renewable Energy Microgrids</h3>
              <p style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>
                This project focuses on building renewable energy microgrids in rural areas using solar and wind power. The microgrids will provide sustainable electricity to communities, reducing dependence on fossil fuels and improving quality of life. By empowering local economies and reducing carbon emissions, this initiative is a step toward a greener future.
              </p>
              <button onClick={() => setShowDonationForm(true)} style={{ ...linkStyle, marginTop: "10px" }}>
                Donate to This Project
              </button>
            </div>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <img src="current img2.jpg" alt="Project 2" style={{ width: "100%", borderRadius: "10px" }} />
              <h3 style={{ marginTop: "10px", color: "#007BFF" }}>AI for Wildlife Conservation</h3>
              <p style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>
                Using AI-powered cameras and drones, this project aims to monitor and protect endangered wildlife in remote areas. The system will track animal movements, detect poaching activities, and provide real-time data to conservationists. This innovative approach will help preserve biodiversity and ensure the survival of vulnerable species.
              </p>
              <button onClick={() => setShowDonationForm(true)} style={{ ...linkStyle, marginTop: "10px" }}>
                Donate to This Project
              </button>
            </div>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <img src="current img3.jpg" alt="Project 3" style={{ width: "100%", borderRadius: "10px" }} />
              <h3 style={{ marginTop: "10px", color: "#007BFF" }}>Virtual Reality for Education</h3>
              <p style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>
                This project introduces virtual reality (VR) technology into classrooms to create immersive learning experiences. Students can explore historical sites, conduct virtual science experiments, and interact with 3D models. By making education more engaging and accessible, this initiative aims to bridge the gap between traditional learning and modern technology.
              </p>
              <button onClick={() => setShowDonationForm(true)} style={{ ...linkStyle, marginTop: "10px" }}>
                Donate to This Project
              </button>
            </div>
          </div>
        </Element>

        {/* Donation Form Popup */}
        {showDonationForm && (
          <div style={popupStyle}>
            <h3>Donate to Support Our Projects</h3>
            <form onSubmit={handleDonationSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Your Name"
                value={donationData.name}
                onChange={(e) => setDonationData({ ...donationData, name: e.target.value })}
                required
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={donationData.email}
                onChange={(e) => setDonationData({ ...donationData, email: e.target.value })}
                required
                style={inputStyle}
              />
              <input
                type="number"
                placeholder="Donation Amount ($)"
                value={donationData.amount}
                onChange={(e) => setDonationData({ ...donationData, amount: e.target.value })}
                required
                style={inputStyle}
              />
              <button type="submit" style={{ ...linkStyle, marginTop: "10px" }}>Submit Donation</button>
            </form>
          </div>
        )}

        {/* Thank You Popup */}
        {showThankYou && (
          <div style={popupStyle}>
            <p>Thank you for your donation!</p>
          </div>
        )}

        {/* Apply Section */}
        <Element name="apply" style={sectionStyle}>
          <ApplySection />
        </Element>
      </div>
    </div>
  );
};

// Login Form Component
const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={{ ...linkStyle, marginTop: "10px" }}>Login</button>
    </form>
  );
};

// Apply Section Component
const ApplySection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", projectTitle: "", description: "" });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:dharaneswaran92@gmail.com?subject=New Crowdfunding Application&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AProject Title: ${formData.projectTitle}%0D%0ADescription: ${formData.description}`;
    window.location.href = mailtoLink;
    setShowPopup(true);
    setFormData({ name: "", email: "", projectTitle: "", description: "" });
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div>
      <h2 style={{ color: "#007BFF", fontSize: "28px", fontWeight: "bold" }}>Apply for Crowdfunding</h2>
      <p style={{ fontSize: "18px", color: "#333" }}>Submit your project details and get a chance to be featured on our crowdfunding platform!</p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="projectTitle" placeholder="Project Title" value={formData.projectTitle} onChange={handleChange} required style={inputStyle} />
        <textarea name="description" placeholder="Project Description" value={formData.description} onChange={handleChange} required style={inputStyle} />
        <button type="submit" style={{ ...linkStyle, marginTop: "10px" }}>Submit</button>
      </form>
      {showPopup && (
        <div style={popupStyle}>
          <p>Your idea has been sent for review!</p>
        </div>
      )}
    </div>
  );
};

export default App;