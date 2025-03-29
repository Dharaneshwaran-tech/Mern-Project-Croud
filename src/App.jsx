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
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.25)",
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
  padding: "12px 25px",
  background: "rgba(0, 63, 127, 0.8)",
  borderRadius: "30px",
  cursor: "pointer",
  border: "none",
  transition: "all 0.3s ease",
  fontWeight: "bold",
  ':hover': {
    transform: "translateY(-3px)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    background: "rgba(0, 63, 127, 1)",
  }
};

const sectionStyle = {
  padding: "120px 20px 60px",
  minHeight: "100vh",
  textAlign: "center",
  background: "#f4f8ff",
  borderRadius: "15px",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
  margin: "20px",
  maxWidth: "80%",
  marginLeft: "auto",
  marginRight: "auto",
};

const inputStyle = {
  width: "80%",
  padding: "12px",
  margin: "15px 0",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "16px",
  transition: "all 0.3s ease",
  ':focus': {
    borderColor: "#007BFF",
    boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.25)",
    outline: "none",
  }
};

const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#fff",
  color: "#333",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
  zIndex: "2000",
  width: "400px",
  maxWidth: "90%",
  textAlign: "center",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "1000",
  backdropFilter: "blur(5px)",
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
  borderRadius: "15px",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  width: "350px",
  maxWidth: "90%",
};

const projectCardStyle = {
  width: "30%",
  margin: "15px",
  textAlign: "center",
  background: "#fff",
  borderRadius: "15px",
  padding: "20px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  ':hover': {
    transform: "translateY(-10px)",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
  }
};

const buttonHoverEffect = {
  ':hover': {
    transform: "translateY(-3px)",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  }
};

const switchFormStyle = {
  color: "#007BFF",
  cursor: "pointer",
  textDecoration: "underline",
  marginTop: "15px",
  fontSize: "14px",
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
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [authError, setAuthError] = useState("");

  // User management functions
  const getUsers = () => {
    const users = localStorage.getItem('dreamforgeUsers');
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem('dreamforgeUsers', JSON.stringify(users));
  };

  const handleSignUp = (userData) => {
    setIsLoading(true);
    setAuthError("");
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(user => user.email === userData.email)) {
      setIsLoading(false);
      setAuthError('User with this email already exists');
      return;
    }

    // Add new user (in a real app, you would hash the password)
    const newUser = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    
    // Auto-login after signup
    handleLogin(userData.email, userData.password);
  };

  const handleLogin = (email, password) => {
    setIsLoading(true);
    setAuthError("");
    const users = getUsers();
    const user = users.find(user => user.email === email);
    
    if (!user) {
      setIsLoading(false);
      setAuthError('User not found');
      return;
    }

    if (user.password !== password) {
      setIsLoading(false);
      setAuthError('Incorrect password');
      return;
    }

    // Login successful
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setIsLoggedIn(true);
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShowDonationForm(false);
      setShowThankYou(true);
      setIsLoading(false);
      setDonationData({ name: "", email: "", amount: "" });
      setTimeout(() => setShowThankYou(false), 3000);
    }, 1500);
  };

  if (!isLoggedIn) {
    return (
      <div style={loginPageStyle}>
        <div style={loginFormStyle}>
          <h2 style={{ color: "#007BFF", marginBottom: "30px", fontSize: "28px" }}>
            {showLogin ? "Welcome to DreamForge" : "Create an Account"}
          </h2>
          
          {authError && (
            <div style={{ color: "red", marginBottom: "15px" }}>{authError}</div>
          )}

          {showLogin ? (
            <LoginForm 
              onLogin={handleLogin} 
              isLoading={isLoading} 
              onSwitchToSignup={() => setShowLogin(false)}
            />
          ) : (
            <SignUpForm 
              onSignUp={handleSignUp} 
              isLoading={isLoading} 
              onSwitchToLogin={() => setShowLogin(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link to="home" smooth={true} duration={500} style={linkStyle}>Home</Link>
          <Link to="about" smooth={true} duration={500} style={linkStyle}>About</Link>
          <Link to="past-projects" smooth={true} duration={500} style={linkStyle}>Past Projects</Link>
          <Link to="current-projects" smooth={true} duration={500} style={linkStyle}>Current Projects</Link>
          <Link to="apply" smooth={true} duration={500} style={linkStyle}>Apply a Project</Link>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "20px", fontWeight: "bold" }}>Welcome, {currentUser?.name}</span>
          <button 
            onClick={handleLogout}
            style={{ 
              ...linkStyle, 
              background: "#ff4444",
              ':hover': {
                background: "#cc0000",
              }
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ marginTop: "80px" }}>
        {/* Home Section */}
        <Element name="home" style={sectionStyle}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ fontSize: "48px", color: "#007BFF", marginBottom: "20px", fontWeight: "700" }}>Welcome to DreamForge</h1>
            <p style={{ fontSize: "20px", color: "#333", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
              Where innovation meets opportunity. We are a global crowdfunding platform dedicated to turning bold ideas into reality.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", marginTop: "60px" }}>
            <div style={{ ...projectCardStyle }}>
              <div style={{ fontSize: "48px", color: "#007BFF", marginBottom: "15px" }}>🚀</div>
              <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>Empowering Innovators</h3>
              <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
                We provide creators with the tools, resources, and community support they need to bring their ideas to life.
              </p>
            </div>
            <div style={{ ...projectCardStyle }}>
              <div style={{ fontSize: "48px", color: "#007BFF", marginBottom: "15px" }}>🌍</div>
              <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>Supporting Impactful Projects</h3>
              <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
                From renewable energy to education, we focus on projects that create a positive impact.
              </p>
            </div>
            <div style={{ ...projectCardStyle }}>
              <div style={{ fontSize: "48px", color: "#007BFF", marginBottom: "15px" }}>🔒</div>
              <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>Transparent and Secure</h3>
              <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
                Every donation is tracked and accounted for, ensuring transparency and trust.
              </p>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <p style={{ fontSize: "20px", color: "#333", marginBottom: "30px", lineHeight: "1.6" }}>
              Ready to make a difference? Explore our current projects or submit your own idea today!
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
              <Link to="current-projects" smooth={true} duration={500} style={{ ...linkStyle, ...buttonHoverEffect }}>
                Explore Projects
              </Link>
              <Link to="apply" smooth={true} duration={500} style={{ ...linkStyle, ...buttonHoverEffect }}>
                Submit Your Idea
              </Link>
            </div>
          </div>
        </Element>

        {/* About Section */}
        {/* About Section */}
<Element name="about" style={sectionStyle}>
  <h1 style={{ fontSize: "48px", color: "#007BFF", marginBottom: "30px", fontWeight: "700" }}>About DreamForge</h1>
  <div style={{ maxWidth: "800px", margin: "0 auto 40px", textAlign: "center" }}>
    <p style={{ fontSize: "18px", color: "#333", lineHeight: "1.8", marginBottom: "30px" }}>
      At DreamForge, we are more than just a crowdfunding platform—we are a movement. Our mission is to empower individuals and communities by supporting innovative projects that drive positive change.
    </p>
  </div>
  
  <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", margin: "40px 0" }}>
    <div style={{ ...projectCardStyle, width: "45%" }}>
      <h3 style={{ color: "#007BFF", marginBottom: "15px", fontSize: "22px" }}>Our Vision</h3>
      <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.8" }}>
        To create a world where innovative ideas are nurtured, supported, and brought to life, fostering a global community of creators and backers who believe in the power of collective progress.
      </p>
    </div>
    <div style={{ ...projectCardStyle, width: "45%" }}>
      <h3 style={{ color: "#007BFF", marginBottom: "15px", fontSize: "22px" }}>Our Mission</h3>
      <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.8" }}>
        To empower individuals and communities by providing a platform that connects visionary creators with passionate backers, enabling groundbreaking projects to come to life.
      </p>
    </div>
  </div>

  <div style={{ marginTop: "60px" }}>
    <h3 style={{ color: "#007BFF", marginBottom: "30px", textAlign: "center", fontSize: "28px" }}>Meet Our CEO</h3>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ ...projectCardStyle, width: "50%", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: "#f0f8ff", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
          <img src="https://media.licdn.com/dms/image/v2/D5603AQF96VdlPC4nDA/profile-displayphoto-shrink_100_100/B56ZUj7Zx8HoAc-/0/1740064530268?e=1748476800&v=beta&t=cMZoR6vXZrn0liSZPPX99dOKhXSHAVC8HOn3O7jcQzM" alt="CEO Dharaneshwaran K R" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
        </div>
        <h4 style={{ color: "#007BFF", marginBottom: "10px", fontSize: "22px" }}>Dharaneshwaran K R</h4>
        <p style={{ fontSize: "16px", color: "#555", marginBottom: "15px", fontWeight: "500" }}>Co-Founder & CEO</p>
        <p style={{ fontSize: "15px", color: "#666", lineHeight: "1.7", textAlign: "center" }}>
          Dharaneshwaran is a visionary leader with over 4 years of experience in technology and entrepreneurship. He founded DreamForge to bring groundbreaking ideas to life.
        </p>
      </div>
    </div>
  </div>

  <div style={{ marginTop: "60px" }}>
    <h3 style={{ color: "#007BFF", marginBottom: "30px", textAlign: "center", fontSize: "28px" }}>Contact Us</h3>
    <div style={{ ...projectCardStyle, width: "60%", margin: "0 auto", padding: "30px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "15px", fontSize: "20px" }}>📍</span>
          <span style={{ fontSize: "16px" }}>123 Arivoli Nagar, Kovaipudur, Coimbatore, Tamil Nadu</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "15px", fontSize: "20px" }}>✉️</span>
          <span style={{ fontSize: "16px" }}>DreamForge@gmail.com</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "15px", fontSize: "20px" }}>📞</span>
          <span style={{ fontSize: "16px" }}>+91 1234567890</span>
        </div>
      </div>
    </div>
  </div>
</Element>
        {/* Past Projects Section */}
        <Element name="past-projects" style={sectionStyle}>
          <h1 style={{ fontSize: "48px", color: "#007BFF", marginBottom: "30px", fontWeight: "700" }}>Past Projects</h1>
          <div style={{ maxWidth: "800px", margin: "0 auto 40px" }}>
            <p style={{ fontSize: "18px", color: "#333", lineHeight: "1.8", marginBottom: "20px" }}>
              We've transformed countless ideas into reality, fueled by the power of collective support. Each project has been a step toward building a brighter future.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ ...projectCardStyle }}>
              <div style={{ height: "200px", backgroundColor: "#f0f8ff", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "60px", marginBottom: "20px" }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLFwQ956OPM3fyWf11aX3lpImRDU2Gmd7NiQ&s" alt="" />
              </div>
              <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>Solar-Powered Water Systems</h3>
              <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7" }}>
                In 2022, we funded solar-powered water purification systems for rural areas, improving health and hygiene for over 10,000 people.
              </p>
            </div>
            <div style={{ ...projectCardStyle }}>
              <div style={{ height: "200px", backgroundColor: "#f0f8ff", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "60px", marginBottom: "20px" }}>
                <img src="data:image/jpeg;base64,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" alt="" />
              </div>
              <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>AI-Powered Diagnostic Tool</h3>
              <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7" }}>
                This innovation reduced diagnosis time by 70% and improved accuracy, making healthcare more accessible for underserved communities.
              </p>
            </div>
            <div style={{ ...projectCardStyle }}>
              <div style={{ height: "200px", backgroundColor: "#f0f8ff", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "60px", marginBottom: "20px" }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqspijxLt5CYLo-8lNdNUu0HGYA0z3MIyKWw&s" alt="" />
              </div>
              <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>Smart City Platform</h3>
              <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7" }}>
                Our IoT-based platform optimized traffic management and reduced energy consumption in urban areas, making cities more efficient.
              </p>
            </div>
          </div>
        </Element>

        {/* Current Projects Section */}
        <Element name="current-projects" style={sectionStyle}>
          <h1 style={{ fontSize: "48px", color: "#007BFF", marginBottom: "30px", fontWeight: "700" }}>Current Projects</h1>
          <p style={{ fontSize: "18px", color: "#333", maxWidth: "800px", margin: "0 auto 40px", lineHeight: "1.6" }}>
            Check out the projects we're currently supporting. Your support can make a difference!
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ ...projectCardStyle }}>
  <div style={{ height: "200px", backgroundColor: "#f0f8ff", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "60px", marginBottom: "20px" }}>
    <img src="data:image/png;base64,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" alt="" />
  </div>
  <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>Renewable Energy Microgrids Initiative</h3>
  <div style={{ fontSize: "15px", color: "#555", lineHeight: "1.7", marginBottom: "20px", textAlign: "left" }}>
    <strong>Project Overview:</strong> We're deploying modular microgrid systems combining 5kW solar arrays with 3kW wind turbines and advanced battery storage (20kWh capacity) to bring reliable electricity to off-grid communities. Each system powers 15-20 households 24/7.
    
    <br/><br/>
    <strong>Technical Innovation:</strong> Our patent-pending smart controllers balance generation/storage in real-time using machine learning, achieving 92% uptime even in variable weather conditions. The systems feature:
    <ul style={{ textAlign: "left", paddingLeft: "20px", margin: "10px 0" }}>
      <li>Hybrid solar-wind-diesel architecture</li>
      <li>Blockchain-based energy trading between neighbors</li>
      <li>IoT-enabled remote monitoring</li>
    </ul>
    
    <strong>Current Impact:</strong> (Phase 1 Completed)
    <ul style={{ textAlign: "left", paddingLeft: "20px", margin: "10px 0" }}>
      <li>3 villages electrified (187 households)</li>
      <li>62% reduction in kerosene use</li>
      <li>12 new micro-businesses enabled</li>
    </ul>
    
    <strong>Funding Goals:</strong> $250,000 will scale to 10 additional villages, benefiting 1,200+ people. Your $50 donation provides one household with clean power for a month.
  </div>
  <div style={{ display: "flex", gap: "10px" }}>
    <button 
      onClick={() => setShowDonationForm(true)} 
      style={{ ...linkStyle, ...buttonHoverEffect, flex: 1 }}
    >
      Donate Now
    </button>
    <button 
      onClick={() => window.open('https://www.bloomenergy.com/blog/what-are-microgrids/', '_blank')}
      style={{ 
        ...linkStyle, 
        background: "transparent", 
        color: "#007BFF",
        border: "2px solid #007BFF",
        flex: 1,
        ':hover': {
          background: "#f0f8ff"
        }
      }}
    >
      Learn More
    </button>
  </div>
</div>
<div style={{ ...projectCardStyle }}>
  <div style={{ height: "200px", backgroundColor: "#f0f8ff", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "60px", marginBottom: "20px" }}>
    <img src="data:image/jpeg;base64,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" alt="" />
  </div>
  <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>AI Wildlife Conservation System</h3>
  <div style={{ fontSize: "15px", color: "#555", lineHeight: "1.7", marginBottom: "20px", textAlign: "left" }}>
    <strong>Project Overview:</strong> We deploy AI-powered monitoring systems combining thermal drones (DJI Mavic 3T) and rugged camera traps (Bushnell Trophy Cam) with edge computing to protect endangered species across 500,000+ acres of protected areas.

    <br/><br/>
    <strong>Technical Implementation:</strong> Our custom-trained YOLOv7 models achieve 94.3% accuracy in species identification with:
    <ul style={{ textAlign: "left", paddingLeft: "20px", margin: "10px 0" }}>
      <li>Real-time poacher detection using movement pattern analysis</li>
      <li>Automated animal census with individual identification</li>
      <li>Predictive habitat modeling (6-month migration forecasts)</li>
      
    </ul>

    <strong>Documented Impact:</strong> (12-Month Pilot Results)
    <ul style={{ textAlign: "left", paddingLeft: "20px", margin: "10px 0" }}>
      <li>83% reduction in illegal poaching activities</li>
      <li>27 endangered rhinos and 14 tigers identified</li>
      
    </ul>

    <strong>Funding Needs:</strong> $180,000 will expand coverage to 3 new reserves. $300 sponsors one AI camera for a year (including satellite data transmission).
  </div>
  <div style={{ display: "flex", gap: "10px" }}>
    <button 
      onClick={() => setShowDonationForm(true)} 
      style={{ ...linkStyle, ...buttonHoverEffect, flex: 1 }}
    >
      Donate Now
    </button>
    <button 
      onClick={() => window.open('https://wildlife.ai/', '_blank')}
      style={{ 
        ...linkStyle, 
        background: "transparent", 
        color: "#007BFF",
        border: "2px solid #007BFF",
        flex: 1,
        ':hover': {
          background: "#f0f8ff"
        }
      }}
    >
      Learn More
    </button>
  </div>
</div>
<div style={{ ...projectCardStyle }}>
  <div style={{ height: "200px", backgroundColor: "#f0f8ff", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "60px", marginBottom: "20px" }}>
    <img src="data:image/jpeg;base64,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" alt="" />
  </div>
  <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>VR Classroom Immersion Program</h3>
  <div style={{ fontSize: "15px", color: "#555", lineHeight: "1.7", marginBottom: "20px", textAlign: "left" }}>
    <strong>Project Overview:</strong> We're deploying Oculus Quest 2 VR kits with custom educational software to transform STEM learning in 200+ underserved schools. Each kit serves 30 students with curriculum-aligned immersive experiences.

    <br/><br/>
    <strong>Technical Implementation:</strong> Our Unity-based platform features:
    <ul style={{ textAlign: "left", paddingLeft: "20px", margin: "10px 0" }}>
      <li>120+ interactive science simulations (physics/chemistry/biology)</li>
      <li>Historical recreations with 360° environments</li>
      <li>Multiplayer collaborative learning spaces</li>
      <li>Teacher dashboard with progress analytics</li>
    </ul>

    <strong>Measured Outcomes:</strong> (Pilot Program Results)
    <ul style={{ textAlign: "left", paddingLeft: "20px", margin: "10px 0" }}>
      <li>45% improvement in retention vs traditional methods</li>
      <li>32% increase in STEM interest among participants</li>
      <li>90% teacher satisfaction rating</li>
      <li>Supported 4,500+ student learning hours</li>
    </ul>

    <strong>Funding Goals:</strong> $120,000 will equip 50 additional schools. $2,400 sponsors a complete VR classroom kit (headsets, software, training).
  </div>
  <div style={{ display: "flex", gap: "10px" }}>
    <button 
      onClick={() => setShowDonationForm(true)} 
      style={{ ...linkStyle, ...buttonHoverEffect, flex: 1 }}
    >
      Donate Now
    </button>
    <button 
      onClick={() => window.open('https://immersivevreducation.com/vr-education-case-studies/', '_blank')}
      style={{ 
        ...linkStyle, 
        background: "transparent", 
        color: "#007BFF",
        border: "2px solid #007BFF",
        flex: 1,
        ':hover': {
          background: "#f0f8ff"
        }
      }}
    >
      Learn More
    </button>
  </div>
</div>
          </div>
        </Element>

        {/* Donation Form Popup */}
        {showDonationForm && (
          <>
            <div style={overlayStyle} onClick={() => setShowDonationForm(false)} />
            <div style={popupStyle}>
              <h3 style={{ color: "#007BFF", marginBottom: "20px" }}>Support This Project</h3>
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
                  min="1"
                />
                <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                  <button 
                    type="button" 
                    onClick={() => setShowDonationForm(false)} 
                    style={{ 
                      ...linkStyle, 
                      background: "#e0e0e0", 
                      color: "#333",
                      ':hover': {
                        background: "#d0d0d0",
                      }
                    }}
                  >
                    Go Back
                  </button>
                  <button 
                    type="submit" 
                    style={{ 
                      ...linkStyle, 
                      ...buttonHoverEffect,
                      position: "relative",
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span style={{ visibility: "hidden" }}>Submit Donation</span>
                        <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>🔄</span>
                      </>
                    ) : "Submit Donation"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {/* Thank You Popup */}
        {showThankYou && (
          <>
            <div style={overlayStyle} onClick={() => setShowThankYou(false)} />
            <div style={popupStyle}>
              <div style={{ fontSize: "60px", marginBottom: "20px" }}>🎉</div>
              <h3 style={{ color: "#007BFF", marginBottom: "10px" }}>Thank You!</h3>
              <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
                Your donation will help make this project a reality. We appreciate your support!
              </p>
              <button 
                onClick={() => setShowThankYou(false)} 
                style={{ 
                  ...linkStyle, 
                  ...buttonHoverEffect,
                  width: "100%",
                }}
              >
                Continue Browsing
              </button>
            </div>
          </>
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
const LoginForm = ({ onLogin, isLoading, onSwitchToSignup }) => {
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
        minLength="8"
        style={inputStyle}
      />
      <button 
        type="submit" 
        style={{ 
          ...linkStyle, 
          marginTop: "20px",
          position: "relative",
          width: "100%",
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span style={{ visibility: "hidden" }}>Login</span>
            <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>🔄</span>
          </>
        ) : "Login"}
      </button>
      <p style={switchFormStyle} onClick={onSwitchToSignup}>
        Don't have an account? Sign up
      </p>
    </form>
  );
};

// SignUp Form Component
const SignUpForm = ({ onSignUp, isLoading, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSignUp({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        style={inputStyle}
      />
      {errors.name && <span style={{ color: "red", fontSize: "14px", alignSelf: "flex-start" }}>{errors.name}</span>}
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={{ ...inputStyle, marginTop: "15px" }}
      />
      {errors.email && <span style={{ color: "red", fontSize: "14px", alignSelf: "flex-start" }}>{errors.email}</span>}
      
      <input
        type="password"
        name="password"
        placeholder="Password (min 8 characters)"
        value={formData.password}
        onChange={handleChange}
        style={{ ...inputStyle, marginTop: "15px" }}
      />
      {errors.password && <span style={{ color: "red", fontSize: "14px", alignSelf: "flex-start" }}>{errors.password}</span>}
      
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        style={{ ...inputStyle, marginTop: "15px" }}
      />
      {errors.confirmPassword && <span style={{ color: "red", fontSize: "14px", alignSelf: "flex-start" }}>{errors.confirmPassword}</span>}
      
      <button 
        type="submit" 
        style={{ 
          ...linkStyle, 
          marginTop: "20px",
          position: "relative",
          width: "100%",
        }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span style={{ visibility: "hidden" }}>Sign Up</span>
            <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>🔄</span>
          </>
        ) : "Sign Up"}
      </button>
      <p style={switchFormStyle} onClick={onSwitchToLogin}>
        Already have an account? Login
      </p>
    </form>
  );
};

// Apply Section Component
const ApplySection = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    projectTitle: "", 
    description: "" 
  });
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const mailtoLink = `mailto:dharaneswaran92@gmail.com?subject=New Crowdfunding Application&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AProject Title: ${formData.projectTitle}%0D%0ADescription: ${formData.description}`;
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setShowPopup(true);
      setFormData({ name: "", email: "", projectTitle: "", description: "" });
      setIsSubmitting(false);
      setTimeout(() => setShowPopup(false), 3000);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#007BFF", fontSize: "36px", fontWeight: "700", marginBottom: "20px" }}>Apply for Crowdfunding</h2>
      <p style={{ fontSize: "18px", color: "#333", marginBottom: "40px", lineHeight: "1.6" }}>
        Submit your project details and get a chance to be featured on our crowdfunding platform!
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
        <input 
          type="text" 
          name="projectTitle" 
          placeholder="Project Title" 
          value={formData.projectTitle} 
          onChange={handleChange} 
          required 
          style={inputStyle} 
        />
        <textarea 
          name="description" 
          placeholder="Project Description (Tell us about your idea, goals, and impact)" 
          value={formData.description} 
          onChange={handleChange} 
          required 
          style={{ ...inputStyle, minHeight: "150px", resize: "vertical" }} 
        />
        <button 
          type="submit" 
          style={{ 
            ...linkStyle, 
            ...buttonHoverEffect,
            marginTop: "10px",
            position: "relative",
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span style={{ visibility: "hidden" }}>Submit Application</span>
              <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>🔄</span>
            </>
          ) : "Submit Application"}
        </button>
      </form>
      
      {showPopup && (
        <>
          <div style={overlayStyle} onClick={() => setShowPopup(false)} />
          <div style={popupStyle}>
            <div style={{ fontSize: "60px", marginBottom: "20px" }}>📨</div>
            <h3 style={{ color: "#007BFF", marginBottom: "10px" }}>Application Sent!</h3>
            <p style={{ fontSize: "16px", color: "#555", marginBottom: "20px" }}>
              Your idea has been sent for review. We'll get back to you soon!
            </p>
            <button 
              onClick={() => setShowPopup(false)} 
              style={{ 
                ...linkStyle, 
                ...buttonHoverEffect,
                width: "100%",
              }}
            >
              Continue Browsing
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
