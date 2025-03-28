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
              <div style={{ ...projectCardStyle, width: "50%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "150px", height: "150px", borderRadius: "50%", backgroundColor: "#f0f8ff", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px", fontSize: "60px" }}>
                  👨‍💼
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
                ☀️
              </div>
              <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>Solar-Powered Water Systems</h3>
              <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7" }}>
                In 2022, we funded solar-powered water purification systems for rural areas, improving health and hygiene for over 10,000 people.
              </p>
            </div>
            <div style={{ ...projectCardStyle }}>
              <div style={{ height: "200px", backgroundColor: "#f0f8ff", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "60px", marginBottom: "20px" }}>
                🧠
              </div>
              <h3 style={{ color: "#007BFF", marginBottom: "15px" }}>AI-Powered Diagnostic Tool</h3>
              <p style={{ fontSize: "15px", color: "#555", lineHeight: "1.7" }}>
                This innovation reduced diagnosis time by 70% and improved accuracy, making healthcare more accessible for underserved communities.
              </p>
            </div>
            <div style={{ ...projectCardStyle }}>
              <div style={{ height: "200px", backgroundColor: "#f0f8ff", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "60px", marginBottom: "20px" }}>
                🌆
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
                🔋
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
                🦁
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
                🕶️
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
