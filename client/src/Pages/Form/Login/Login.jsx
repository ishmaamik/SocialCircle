import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Check if token is in cookies after redirect
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('auth_token', token);

      // Redirect to home page after login
      navigate('/home');
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const googleAuthURL = 'http://localhost:3000/auth/google'; // Initiates Google login
      window.location.href = googleAuthURL; // Redirect user to Google OAuth
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  // Handle user registration
  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User registered successfully", data);
      navigate('/home');
    } else {
      alert("Error occurred during registration.");
    }
  };



  return (
    <div className="login">
      <h1>Register</h1>

      {/* Registration Form */}
      <TextField onChange={(e) => setFirstName(e.target.value)} label="First Name" style={{ marginTop: "10px" }} />
      <TextField onChange={(e) => setLastName(e.target.value)} label="Last Name" style={{ marginTop: "20px" }} />
      <TextField onChange={(e) => setEmail(e.target.value)} label="Email" style={{ marginTop: "20px" }} />
      <TextField onChange={(e) => setPassword(e.target.value)} label="Password" style={{ marginTop: "20px" }} />

      <Button onClick={handleSubmit} variant="contained" style={{ marginTop: "20px" }}>Submit</Button>

      {/* Google Login Button */}
      <Button onClick={handleGoogleLogin}>Login with Google</Button>
    </div>
  );
};

export default Login;
