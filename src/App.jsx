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
                <img src="https://media.licdn.com/dms/image/v2/D5603AQF96VdlPC4nDA/profile-displayphoto-shrink_400_400/B56ZUj7Zx8HoAo-/0/1740064530268?e=1747872000&v=beta&t=1tBSdpRymxAkRgb6qNwtC27-wZEn5MxKCVq-37tsMq8" alt="CEO" style={{ width: "100%", borderRadius: "50%", marginBottom: "10px" }} />
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
              <img src="data:image/jpeg;base64,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" alt="Project 1" style={{ width: "100%", borderRadius: "10px" }} />
              <h3 style={{ marginTop: "10px", color: "#007BFF" }}>Solar-Powered Water Purification Systems</h3>
              <p style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>In 2022, we funded a project to provide clean drinking water to over 10,000 people in rural areas. By installing solar-powered water purification systems, we not only improved health and hygiene but also empowered communities to focus on education and economic growth. This project is a shining example of how innovation can transform lives.</p>
            </div>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <img src="data:image/jpeg;base64,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" alt="Project 2" style={{ width: "100%", borderRadius: "10px" }} />
              <h3 style={{ marginTop: "10px", color: "#007BFF" }}>AI-Powered Diagnostic Tool</h3>
              <p style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>In 2022, we supported a groundbreaking project that developed an AI-powered diagnostic tool for early detection of diseases. This innovation reduced diagnosis time by 70% and improved accuracy, making healthcare more accessible and affordable for underserved communities. The project has since been adopted by clinics worldwide, saving countless lives.</p>
            </div>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <img src="data:image/jpeg;base64,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" alt="Project 3" style={{ width: "100%", borderRadius: "10px" }} />
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
              <img src="data:image/jpeg;base64,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" alt="Project 1" style={{ width: "100%", borderRadius: "10px" }} />
              <h3 style={{ marginTop: "10px", color: "#007BFF" }}>Renewable Energy Microgrids</h3>
              <p style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>
                This project focuses on building renewable energy microgrids in rural areas using solar and wind power. The microgrids will provide sustainable electricity to communities, reducing dependence on fossil fuels and improving quality of life. By empowering local economies and reducing carbon emissions, this initiative is a step toward a greener future.
              </p>
              <button onClick={() => setShowDonationForm(true)} style={{ ...linkStyle, marginTop: "10px" }}>
                Donate to This Project
              </button>
            </div>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <img src="data:image/jpeg;base64,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" alt="Project 2" style={{ width: "100%", borderRadius: "10px" }} />
              <h3 style={{ marginTop: "10px", color: "#007BFF" }}>AI for Wildlife Conservation</h3>
              <p style={{ marginTop: "10px", fontSize: "16px", color: "#333" }}>
                Using AI-powered cameras and drones, this project aims to monitor and protect endangered wildlife in remote areas. The system will track animal movements, detect poaching activities, and provide real-time data to conservationists. This innovative approach will help preserve biodiversity and ensure the survival of vulnerable species.
              </p>
              <button onClick={() => setShowDonationForm(true)} style={{ ...linkStyle, marginTop: "10px" }}>
                Donate to This Project
              </button>
            </div>
            <div style={{ width: "30%", margin: "10px", textAlign: "center" }}>
              <img src="data:image/jpeg;base64,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" alt="Project 3" style={{ width: "100%", borderRadius: "10px" }} />
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
