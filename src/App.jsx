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
              <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExIWFRUVGRcXGBgYGBoeGxcaFx0XGBYVGB0aHSggGRolHRgYITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0tLS0tLy0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAJ4BPgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAQIDBQYHAAj/xABHEAABAwIDBAYHBAcHAwUAAAABAAIRAyEEEjEFQVFhBiJxgZGhEzJSscHR8BRCcuEHIyRigrLxFTOSk6LC0hZTY0ODo9Pi/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAMBAgUEBv/EADIRAAICAQQBAgQEBAcAAAAAAAABAhEDBBIhMUEFUSIycYETYaHBFCOR0RUzQlKCsfD/2gAMAwEAAhEDEQA/AOhS7gPH8k7MfZ80oTgrFRuZ3Dz/ACShx9nzCcvIAbmPs+YTg4+yfL5pUqAGh59k+I+aUOPsny+aVKgDN9JRL2EiOqfLs7VQQLhaXpWOqw7+sPcs5kv2rkyfOzqx/KgnY9SK9IxvLbcwQtvmPsnxHzWEwxipTdwqM963ybhfAvL2Mzn2T4j5qF7iHtIb6wINxuuP9yJUOJtldwcPPq/FOFD8x9nzC8S7gO8/knryAGS7gPH8l4l3AeJ+SevIAZLuA8T8khzTujvUi8ggidn3ZfP5JRm/d809eQAwZuXmkAdxHgfmpEiAGAO4jwPzXod7Q/wn5p68gBkO4jw/NJld7XknrxQAwsPtHuA+IKaWH2j/AKfkpCkQAyuOpBPfMe5E0TaGtnyH13KKu0HLPJFelaNSufyOELXHeB2C/ifkkFAHXM7tJ92ia7HN3AnsHzTTiHn7niY96miLQTTogaNA8ApCOYQPpH2u0T/XmnZXkeufD+hRQWE24+SS3NCGhxc7xj3lRmg3kf4h46FFEWGl7f6lRnEs4t/xfmhDhhaGg+163dEb1JTww9nyd8SpoLIwlCaE5OKChKkCVQAoSpqUIChUqReQBTdLGTSb+ILOCndavpAyaJ7Qsw1pBXLl+Y6cXykFQQ3MdxB75XQQ6brB4lmZp7Pctrgak02Hi1p8gr4X2UyoIlR4hmZrm8QQnyvSnihtF+ZodxAPinqDBepHAuHg4hTSgBV5IvSgDyVJKSUAKvJJSEoAVelISkCCByRJK8gBUiZWqFoBylxJgARJOu8gaAqP0lSf7l0cZZ/yRYUTlIk63sHxb817rewfFvzUbkTQzHNJcADAtPHx3L1Om0c/M+fyXqjC4yWO7Jbf/UiqdWPuOHZl/wCSWuEWfI2XERlPhbzIKUMdwA7/AP8AJ96a/Eu3Uie1zR814Yl/sAeB/wB4Q2FIlbSd7XhPwdCc7D8XE9w+IKi9O7n3BnxJSmseLv8AT8FG78w2oUYccT3W9ycKH4j/ABO+aCxuObTY6o/0mVgkw86dgcqgdMMFEl9TsIcT74Vo45z5irIc4x7dGkOFHsz239699lZ7DfALLf8AWeAn1XduQfNNd00wI0pvP/tj4lM/hsv+1lfxoe5fBLKpn7dYBOUkcfq/kpae2WHsmNbqu5FqZagr0qt+3ZvVInfM25pv2k3M23QpsKLVKgaOM62VwI3AkanUqXE4nKDETuB47hZRZFBUr0ofC4gOE2neJ0O8KeVIAu1h+qd3HwIWXcdFrMYzMxzeIWSqwNFz5ux+Lojdz7Fq9hPnD0/wx4WWWotzHWLTcgeE71oujjv1McHOHnPxRi7DL0WqWUyU2pUgE3Mbhc9y6BBHTdlc8brOHfY+YJ716pjWATP1wVdtXFBsPzGGwHAWOV/GdLgKox2JDg4tBaDHfpqI7VSU6LqNmuZVB0TpWQ2XiiHZS4hv4xfnYLQvx0fdnsUxlaKyVB0pMwVZWxh/e37hbutPYs9jdpOLoa8tcYA10GpI7QolPaCVmwq4hrdSFFRxzHGAbzHesHWxrjJJJvAid3JQ4V7g8RVyEgwTOo3GNO1J/H5pIvsOlSklZlvSWmwAOJ0EWmecz71ZbJx32kOLXZWBwbm3k6kD58078SJTay1AUrKXFerNLW9Ugczu5mU2m90Q0Zj7TpA+Z7hHNQ5WWURMQPU/GPc5SU2iNOPvUVVjgWZnzLhYCALO0GviSoq1WqHAMYC2NeBzXtImBeN6q+0AZlHAL2QcAgvtNeB+p609YSIAjde5k+R5JprYiB+rbPWm9pHqRebqaQB2UcAvFo4BVzq+Kv8AqmA7pM8d88h47krq+I3U268Rpb97hN+ywRSJD8o4L2UcEFQq1yRmY0CL339bfm45d288Ex9bEwIY0mLzAveRZ5/d8SeSKRAc8tAkwFQba21VYP1WHcZIaHvaQ2SYEDU3O+Eayrip61NkRuNzMWEu3dY944XVzMQ4w9rAA4EHXR7SDE2IbJ7WjsVZRvobinCMrlGwPpKC3BVQ4yRSgniZEmy5JmXWOlBf9jrZ4zZQLaRngeIv3rldRoC1/TV8EvqZmsl8aIzUSCoV5yQNWicxvsLkqsjKQdLRfna2qhFWk3WLcZzW5D5qtwVQuaQ58kGWzMjs4Qo69ed06dbs0XltyNlmm2VtBgkkOg24hvbwUVbaxzHIJbGp5b4Codn4l2Y3JgaceSkxeJc4k5Q2CLDTQ3+uKHJpELlluekWR3WaNOqG7zzJumDbbatS4cAGgwdBzMahZDEF05ibyvUcTLhJPjYqjm6BLk3eExgDgG5Q4n1rwYkgkO+YVxs7bDKpLQbjzjUgSudfapbB3buE7/JNw+JdTeDBadx3TyUxytEuKZ0/FY9jBDnATYb1n6rT1hab7reCztLGl/WJzOm6u6jrnKCBqAd+kmVWU94yEdvke17QwgszOj1iSI7hZWGxsa1rjTu0uMga7hKrXHkosS5wqBzWmYtAmN03Vsb5DIuDWvxMb7qGpiTxgLNYevULuuHTGuhtopq+IqO1GWBrOvhZPc0hKg3yFYk5g4HKZnNESdw13qsrHqw8iRbnI1MDs80xzHAyTzkaKsx1ZwedXTG7hbU6WjwSpzoskWeExYaQWtk7ydTOu6yshtVul/rRZrBVATlIIRXo4kiTyUQm2uAaRYYvFZ4ayzbgzpPFVtU3uL7rjcDzspWjdBB7EPUo2sDbzlLycsmIO+o0g9aOXPihmgGQOH0VI8AaiSJCGLyDvtp8vckoZROGj72g3jl23W0/R8M1OpoMrwQdTdok30WQc/KyXWBgEmIkyQB3BT0uk78AxzW0w4vdq4+rlmR1dZnimwXxIo+jqOI6gzhpe4RA33MWmw7lmq+1sdUcRTpejYDrvIG+XfAKs6LdOvtPphXaymGBpDmk3kxEO7zMpX9KXSQ2mC0wJncJuNOK7MTpu0vuLmrijZ1aku/DUaP9IP8AuTNo7To4ennrPDGyQJ1JuYA3nksRtbpFiqRLWBoc9/pATlLcpAyfduYA5WO9B9JNrHF7NyPdT+0B7TkbN4JDiZAA1mB+SX5LSS8Gjf8ApFwI31D2M+ZCutlbUoYyiX0nktMtducwkAlp/eAcNJC+fq2GqNF2EePyhdb/AET5/sNsv94/Un93krlTQfYKTSZ9KQDFxIMkGBbSQ3/CFJQwNNpDwKksJIke1M2i4v5KzabXieSVQBT/AGOm1uXJVy5CwiAZGl9TNpU2H2dTJD4eCHOcJtdxk24WtPcrJV2M2hkdBc0SYAIdOk7kJAHlNVV/bLJj0jf8D7TMeYPgjMJjmPaXZgcphxggAwDv5EKXGS7RCafRVdNXRhK3ZT/nC5W9dQ6cO/ZKh4mn/MFzArV9N/y39WZ+s+dfQhATgF4r2q0TkthzGn0rQC4C8cxH5K0ZgRABf5KbDbDIcHbwCNRFxClp7EqgznkG68W5y8HotjIKeDDZIOvJK2jfjujiiKuz3gGYHHrR7yggGU3B3pGSLxnBnlEqN2RrkFGmVuJwbnXF7xaR2a7k6lg4JJGZwG7S+vxCXEbTayxeXfuwLd6r3dIXt9VvO+qso5H0VqibGMqT1ATOvHsiUPiKjj1Z9HpIv2TrbsXh0lJJzsMHg4e6Efg8XQrOaGuc18BoB5e+VNTiuUQuRmzqlSmYAztMzYeK11CIFot/RB09kwf7q2p0143R9JkeHgqKbk+hsYtBDqhm0gQJE68ULiXlrhlykxF9PJFABC437p7VZt1aJdkf2l/Cn4O+aicHGfVE30NuWq80nepADubK5Hnyewtua8DXPgRlbpwPiLqor4SxM3sdTu1HgraHcAPBKWAzmAIAPjuQs02+UCbb5RV0Q4EAGcwm035ovDVXTEAgbzv89FBRojMbG1uXl3eKkc4A7rWV1kZen4DTUJEZo/CPzQ1QC/XPuntvKjeQDOnML1NoMkuytElznGGta27nnkAJ9yjdJsjldgjqzWFrXAzrFvMkga3jkhquMpxJEutEkQBvsNfFU9ek7GVS+m408O2zHOHWeJ1jdPkosZsbE0y8sbUdTERkkhs7iGmwgG/AaruxwiuH2UbdX4LvaO16foaYDXOe0uBADQIJkEklSU8AHDK4yBeHAEi1yYMT2LIYEmq/0bhUc50BoDoAv1i6Z0HBaDb+P9E0gEyfVDdSd5/CE/aL3BOCbSo1D+racrpIcHCYuMwOhulxGPzOLoABJsNBO4cljaG03guNtRYzFtdCOKL/ALRebwzuDv8AkhxBNGoqbXYWU21WuIp5rtIzEEyG3BsD5EqpwmP9IXA0nAx1TmAAdOpmZEbhHaq2jXqVHtYwAucYADbnslJXpV2S2IgkmCJEamxmyKCzTYXZ9eq8U6TH1HOGjcoaOJLjYDtXRuhOwsTg6TqVZtMNc4vBbUJMuAloaGRaNx3rnX6NOmFPCvqsxBP6wNyvkQMs2PbPkujU+mlFtSXPGWplyum0RBbO68nmDysUDZpG4dxuB9d686k4aiFPszaLaoJaZhG1KghFAVBQdfBZiTmcJ4E8vDRZ/pltyvhqwbTFHI5sjMxxIMwRIeLabt6zx6a4v2aH+W7/AOxdENJlnFSil/URLUQi6Zv/ALB++7skx9WT6OEykHM4xukxoBcdw+iVz3/rPF/+H/LP/JMPTPF/+L/L/NXehz+y/qVWrxmp6en9kf8Aip+9cyVztLpFiK7PR1CzKSD1Wxcc5VQQtHR4ZYoVL3OPUZYzlaI3lMYpQE1666OezpxotjTxQVfE0m67uElD4nbIuBTBgbybkcuCrau12f8AaFwD6zl4mK55PUydLjsy20MQ/FYh5zBtNhgAkwAPiqzaGScoMxvj3Kwq0WhtRrKrGRmzBzZJLrxm13rK1KjgS06g3+S7ISvhCJw2pN9sOfiRuvG5F7OZndeJ3qrgwjcHTOYZbFWl0Vj2XOI2QCJzDwQdDZjmuDhJgyrai0MaS8l8DQKtxu2KkxTZG4WkDx1PilKTfB0OEUrZ0Lo/imVx6Nwh8XGmaN45rI7f6UP9O+jROWmwlpcNSRZxB3CZjsQGC2Zin5ajKpa4GdSCewi4RVHo8KeepUl82teAeMbzxVfhi9wLFObpFHh+lGKpvltZzwD6r+sD438F0nZWOGKo0qhaW5nBrhwOhg7wsaaNKclKkGvcbQ2/iRotbhQWMa3TJlMc7EnxUSmpdIHhlj7Zd/2PR3l2ukx7kVSwbWiAXBvCZhD1a7y4C5mbtiPnKmNgIk851PAD5rnLEdTZ9JxuXT2oCrSotsJJm5H1dHjDg3mD2oUUnNcYvHKR2iFDRIEKA9KWtDi09bhMWPwRv9mAgzaLnQ2S13ltRhkXlvcb346JX1HT1TdxA8LIpEkn9itiJJ5fFZrpR0crVatJjLYc/wB86RNutly6kGB3wtJisUWtnNaJn4Km2jja3o5aQXESBz0v2SrwdPgpJX2PxODogMY0gNkNs3QC8aclPhcQ5glhd1t4tpMe8+KpMMx1NpdVque86ySQOTW6d6IGLDgA0Gw369o4K1KIyMbQVicU9pL2021CdZs7x396yW0cI/GVmjIyi/LvkAgXgkAq4xuJaBLi5h9oXHj8witl7EdU/W1nvc3/ANPVstMdYjW/wnenYITyT+EVq8uLDjuf6dmTd0Urk5fSU+rbUkfypcX0Uxk5gwVObHDQaCHQfCV0E4JjR1REfUqTC1gLeC1/4ZKPL5PPPXScntXH6nI34KsxziWPb6P1txCr8S+preHEiePELuOJyOEPph4F4czMLciCFz7bXR+viKz6rMOGNcbNYGNa2ABZpIiYnTUrmnHaztxZd65VGPbSIAPHmisO8iAT1ZmJJHgr6r0RrtaMwI/w/wDJNodF603YSPxMH+5UV9jW10db/Ri6aFQ7s4jsytI961WIqkbis50YrPfQZTM0n02ta4sjrBoytJzAgmAFFsutiqrKjjinHLVqsaMlL1WOhs9TVUzz3Tb6L4YpRSXJn/0hvmrT/C73hZQBHbbxFR9Vwe4uyOcBIA3knQBAleg0kduGKfsY+pluyOhE0hOhNhPYpDiYUZKRI5BNHiU1yc1OLVJF0X7aToJ7VXVRu7fmp61Q5but5HsQLKkn64LxMWepkgPH7Kztz0w3PJzSY1IAnN6xs6MtheVTYzCZiMtMghoMyDn5gQtlQdAHo/WiXBrmktykuaX5yAxsmbQTxUNXCUfRltRpzOeQWvmfWP3h6hJvvtC7njfDQndGmmY0Na2PXOkmRBm9hFh3qzwrS0NeIM3Am47Qj3bLh9JlFs1HgE0XXIkS0gWIMTY35CUHjGVWOyvpZDO8OB7pslTjJOhmNwDRtG3WYOSiqY/MQA2TcybgAIJ2IGjjfgU2m4biEpR8jnPwWjtoPp0xkqMY6xJIlwOtv6K12LinOpZoL3B15MZp1N9O4LI2BkEA8Ylx5BbXo3hnMoH0jC1xOYl3rEfdkbt6iaSREZtu/YNIY7I5tOrTBa45c0uc60euTG8zZU2K2lVByjLmaYc3WeBn3pdo4sgsBruc+XF2UgFrBIDRG8z2qqABqE5SBlJZOpHE8bnekp1dmvkhHJHn7G3pYWoGelzBry1pgO1GuVS4NrnHMHOiScsazvvoZnzTNlYkvotdkc7qgC4E9k/Vk/EuDSDBaTaOzee5UfZk7UT1i09UgyIIP9NV41gwX5b/AK8kBi2EQWuO+x38I4JoDXtio24MwNJGn9FKTYNIs69VlpPAiba2+KD9O0BwBM+6/wA0NWc3fYbuXKVXY7agYOq26ssfuSrDMS+bvdYflrKrcV0kpAxBJ46BVFfFVKrou525gv47gOav+j+waDQa2MfTDJDWtLobmgl2cmM26BprqrpJBOUYK2ZuvtfMTlvyVjgsFUqjNUqupwOrAE9+/L71t6ezqFdmag5gAOUGmBkdE7m791lXbX2LWoNzvDS2QJaeOkjVaGjwYZu5Pn2MnX63Uxh8EaXuZnZWAqmo01y0sF3NJnPGgI3jtW2ZtaRaIHlwWXJmwGqOZaGN/qd5K0lghiVRMh6vLqJbpvot6dXNwU3op5fXJRYanAA+uZRrQpoVKb6RE2gErnADRTLzmWlFLyUUpeAX0QdqJ7U19AbrHl8UU5sBQzqjaiVKSLLouDmqTuDfPMk6Lj9mJ9qpXP8A8jx8ET0a++fw/FRbApBmFa0Gb1T41Hn4rK1NLLRvaK3gT/8AeSlxmzaFQkOYJk9YWd47++VnNq9H30wXsOdg19pvaN45jyV79r6zgTvMeKmZiSPktTHOeNKjKclKbv3MGU0lXfSDANaRUYOq7UcDy4AqkWhCanG0Va2uhWNTzS3C6jJ8lMK5YMw5TpccB5Ln1WpWnhuav2H6bTyzzpOl5CKexqzhmbTseYB7YJkJ42HiP+3H8TfmiBiXxM85kT5qYbbLbEEiLTE85m3gVkf4vmfhfr/c1H6Vi92yjqPMDu89E2q6CeY/qvVX7+A925C4lxzB4i2a0xciRfcs6CtnbN0g3EYsUJkwGta0l1PM5maCLGwB5mfJEYauwtpvLqTssS9xmLwc4JjOZ1uQGyFnWY+piGnD0Wuc5xGZziS1rQAA24iZFnHu4rQ7F2C7EVhhKbXnDU/RnEPJgG8kMgXcWw0DcL8zp3Ry2anoBsKtVqfb67y0gFlKA0B7Rq9xA0tA00lbjEYSnUlroceBDTPddOpYSzWxkY0ABgsABYAxw4Iim6+Uery+QSJPcxfkyG0/0e4Su0/qiwnQsPwMhc/2z+i7F0pdQ/XNG6C148eq7uPcu6OqgAk3A3j5IX05IDtx0aNT2/IKKRO5nFtjbArUaBL6dRtR5IIykFjQfvAiTJE+C2GLgiG3JGl5v79VuA1hHWvf1ZkTwG5ebSZTgBobPAWI+o8QufJp90tyZ1R1jWNQa6OLjZeIfWqE0Ht3lzmuEyNG2v8AmiNn4Ou55c6jVs0jNkcABY2BHIXXV9u7WGHoueIzeq0XGZx0E9l+wLl+0tsuLpe4lx525AcAq5NPF3ydOPX5GklFcE+wsS9lMtcAHNc4TBuJzCLRF4twRdXGFxkqiZis33h4qGvjw37wngFGxIhvc7L+pih9519yErY/hYcVmcRtUC5uVWnE1q7srGuceA954DmVNNg9sS8x+3g2zDJ4lR7K2VXxPXc8sp+0dXfhHDn70ZsnowKZD8RD3ahmrR2+0eWnatJTAa8z6pEW47kuWRR4QtzYLhsFTpsysbl4neTxJ3oathzVgNZmc2SByAk8phNxOIIT9k7SbScalRpI06onLmi8SJ/NLhvnJUIllrk03QWs9mHI9FAD3dU2PGRPMlXHTZ37Kfxs+KzD9vw4VMPUzNIAIItMmQRuPmptr9IvT0PRGmGnMDINrTu3arb0uGXwSoy9XqoOM4N80UFIwZ4AnyRGBdvKFZrHGyk0WlNXMx4OsX3f7GhpVpi6KFe2qoKNQgdyLpVj5/BVaITdlmcRzSsrTvVVUrp2HrmJKK4JT+KixrV1F6VV78Xqh34zX671CRaUkjXbKpOfRqtYQHEgXnt1GiOwlA08OxjvWaIMdpuguhD5ovP759zVb44w09iyNRBfjuX2PQ6OT/h4r7nNK9frntPvU9LG210VLVxBJNtSUO2uZla+20ef3VKy+xmIDqVRvKR2i/vCzedEtqnK++75oBzk3T8Wjq+aKZK4osRkBy594EyCYuIideE6IEOU+Ixgpw3QWnePd3Lh9WfwRX5mj6Ynul9A44wPi/W3iZg80FtSm9zBG53PfM27ggX4pwdDwDut/tcIIHNFHGtaJzkTucA6OUyD4rENYfiBF5kTGnIqt2kT6MsES4taO1xA1RuKdBEie3xQW0y4N6gBIO8A2AObXkUzEviQvI+AmtiBQw4aJqNIDXZm3LtQ6YIykdUCQYFtSul/orwpZs6kTc1DUqOMmTme6Ji/qgLjmHpmo5zWFzafVzkycgEDOeQNgOHYu99GaYZhcOzMHFtKmJy6jKNBNhw5Fdk+jkck3RY1HBo0A7ffKhFTJqcpcYEmSec8OXYo6+MEkNIcRcBtnEXBF7GDHiFWuxmXLd4G7M0tEH/SlAWe08SIDZgkiY9mfBPfW9Z5MZR1TcjTUiwlZHa22GMdmc4iLAZXW32gwPcqPF9NCJaDAMRGYeIiDogi0dBpY1mSmXPYImC45ZdEaOHAnepXYkkB8DQ3FxBvuuVzAdMqbqZpuzzO4W5QoaDvSEOZ1ZcRMQZF5MfAqVZV0X/6R8a4sp1G+rTLg/UEF0ZXERpaJk6rnFXaIcZN+0rS7ZxNRkk1C5swWuuL6+tNjMLN4qiw9ZrWtaT90QYt4CbJW+L5O7Fhy1VcEdXaIix8EuC2biawzMpug/fdYdxOvctL0TqH0jg32dOMbudlpnVHxdkHu4yCCNyTPLTqi6izF7O6J5j+teXH2WC3PrHXuC0uFwYw5ysbAgk2sfn4outjXMNgCdL6DeYMeaCbiHuEEANJiToZ3QEmU2y1JD8TtEgxP12L1WqXAaXvr8+S9Vw4JgAj96BqOQ0CZVblLRqRobRaUp8i5JspdqOvv1geGpjsT9m4cvac1U0wDpd0iByRdfZ7c2ZxJEg5RBib69nkgnYpjXOHVIJ3xx5hdemXN+xzyjXZYhlNrS1kwNSRBcbSVG9104VmOByiBYTvOnWP1pCjqFei0bvGjzfqSrMyfZtLPVa0mJzX4GDCMxeCfT9YWBIkXbY6SENsQTiKY0kkeIK6Rh8K7NeMt9wuD9w8Reb8EjV55YsqpWqOrQaSGfTu3TTf/SOeh2iIpP17/qy121+jlOoCabQx+6NDxBHxCxbWgTrv4FNx5Y5Fwc2fTywtWSVnqSmbCBvQ57frxTmDS29OfRzxfJ6vqLcvq6grt0sfrvTiy5sfDuQ9U30+vFQgl1yb7oMP2Y83u9wCsNqGGOP7p8kF0LbGFHNzz5ojbzoovP7rvcsjNzlf1PR6fjBH6HJXm5hDFylqC6gO+/13LZPPIk9L1XW3BCgqY+q6N8fFQMarYPJ3LiKJQEmMcWmHAGYmIkR2b1JSGnMqHEME3HYVweqy4jE0PTFblICq1BMzYaTuNgo8pm8nsEqWpQuDbWDpzkJ32cyfRkkLHo1bLGqQ5rST9bwgNpVGtyuc3MOuIPMAAxN/clBMiN9/H+qmxAGQ5r/RUxk48isitUThvo2te4y50GnXaJuPVYQPV3dU7o0Mx1p2NdlzQ09QQQSBcaacNFwNj3hwogzmcxgk2h3UDS2IiYl2sLvW0MaaWRrwHVIEAABk6Gd8LqnLck0cqtKmAYV1TrWETbMSSJ4uBmPJR1qeJObKC0C+Wnb+IOdIixnT5m18TiCHuNRtNrAHH0bZO+wzdio8XihUBzGpUDhA9I8xNxJa2ANeaogvwVG1cMA4gvD3xHVMhutnP0/hbJ7FmquzHExlIIEHv335d62uMpigynVIBqVPUt1WCDeDqRuGiGwGBDzlN5lziSSSXSSe31vFWFGSpbOgzEAcTw+vJX+ApQCwboI/h9Y+Z8Er2gPgAWP8t/ePNPoWIcfDtuUxFEBbVHXde0TPCNVmKbCbCZJBAPC+WeAvPgtFtJ+V3Ml3haR5KjxcsLesTF+EXus9rbJpHoNLNuKZa7GquFUSRmiHQY8e0cFq6rniwdOveN2qwQqtNTIMwETm+9mEwZlbLYWMFdotcAAkgcNUvIvIZMdcolrUHxvsNzhed9yoaTKjXgE23gmeeo8O9WRpRZQMwz6lTK0MIjMS8mdYtY3SeRL4G4fF1KROT70WymOUW0Uhax7S55c117aN7eI89FZN2VUbBDmxHP5fJNq7KJE2vzPyQkwpFLia7Gi4gCIMjQHsmVWYvCsfUpta0OGpNi6BxNlabbwJawyGE7jc9tiq/YABBqPE3gRaOPw8F0we3G35ESXxc9E+KwzWAQCCdQeRAnnZBPN1Y7ScDEbpH8qrHFb3p7/kxPNeqr+e/sGbGE12DiSPIroGzMXUDm0z12kkTvaLm/LQX4i+5c2wbiHgg3Emd+hW32HtQVnNpPBDrw5tpjfr1T2SOQRq4tyv8hnp00obb5v+xrabgZi/0QuYh3rTuJXTqQi0zAF951uuZOE5vxFJ0fkd6l/p+4x8SvZbWUbz9d6kpGIXe+jJVWNqROu/mhO9TVu3f80OSYUpFZPk6V0REYSn/F/M5N6TuihU/CVL0YH7LS/D7yUH0ud+z1OxY0uc33/c9LDjT/8AH9jlZ1UZ1KVxKiK2WefiuSR7+qoC8p1YwCoM6tg6Z21aRM19x7+CZjCZEkR7QsSvUbuHf7ikqi8LL9Um98Y/kavp8EouRDV6zS4WvPboExp+rIj12uBN7XHDgeKHcMtjfePd8Fmnf5P/2Q==" alt="Project 1" style={{ width: "100%", borderRadius: "10px" }} />
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
