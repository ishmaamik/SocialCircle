import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle Google login response
  const GoogleResponse = async (response) => {
    try {
      const creds = response.credential; // The ID token from Google OAuth

      // Send the token to the backend for verification
      const res = await fetch('http://localhost:3000/auth/google/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: creds })  // Send the ID token to the backend
      });

      const data = await res.json();

      if (res.ok) {
        // If successful, store the JWT token and navigate to home page
        localStorage.setItem('auth_token', data.token);
        navigate('/home');
      } else {
        alert('Error occurred during Google authentication.');
      }
    } catch (error) {
      console.error('Error in Google Login:', error);
    }
  };

  // Handle user registration
  const handleSubmit = async () => {
    const response = await fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password })
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
      <a href="http://localhost:3000/auth/google">
        <button>Login with Google</button>
      </a>
    </div>
  );
};

export default Login;
