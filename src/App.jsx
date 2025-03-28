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
          <img src="ceo.jpg" alt="CEO Dharaneshwaran K R" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
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
                <img src="data:image/jpeg;base64,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" alt="" />
              </div>
              <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>Renewable Energy Microgrids</h3>
              <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7", marginBottom: "20px" }}>
                Building renewable energy microgrids in rural areas using solar and wind power to provide sustainable electricity.
              </p>
              <button 
                onClick={() => setShowDonationForm(true)} 
                style={{ ...linkStyle, ...buttonHoverEffect, width: "100%" }}
              >
                Donate to This Project
              </button>
            </div>
            <div style={{ ...projectCardStyle }}>
              <div style={{ height: "200px", backgroundColor: "#f0f8ff", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "60px", marginBottom: "20px" }}>
                <img src="data:image/jpeg;base64,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" alt="" />
              </div>
              <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>AI for Wildlife Conservation</h3>
              <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7", marginBottom: "20px" }}>
                Using AI-powered cameras and drones to monitor and protect endangered wildlife in remote areas.
              </p>
              <button 
                onClick={() => setShowDonationForm(true)} 
                style={{ ...linkStyle, ...buttonHoverEffect, width: "100%" }}
              >
                Donate to This Project
              </button>
            </div>
            <div style={{ ...projectCardStyle }}>
              <div style={{ height: "200px", backgroundColor: "#f0f8ff", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "60px", marginBottom: "20px" }}>
                <img src="data:image/jpeg;base64,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" alt="" />
              </div>
              <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>VR for Education</h3>
              <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7", marginBottom: "20px" }}>
                Introducing virtual reality technology into classrooms to create immersive learning experiences.
              </p>
              <button 
                onClick={() => setShowDonationForm(true)} 
                style={{ ...linkStyle, ...buttonHoverEffect, width: "100%" }}
              >
                Donate to This Project
              </button>
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
