import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the googleAccessToken in cookies
    const googleAccessToken = document.cookie.split('; ').find(row => row.startsWith('googleAccessToken='))?.split('=')[1];
    
    if (googleAccessToken) {
      // Store googleAccessToken in localStorage
      localStorage.setItem('googleAccessToken', googleAccessToken);
      
      // Fetch user info if token is found
      fetchGoogleUserInfo(googleAccessToken);
    }
  }, []); // Empty dependency array ensures this effect runs once on mount

  const fetchGoogleUserInfo = async (accessToken) => {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
      const data = await response.json();
      console.log("Data:",data);
      if (data.error) {
        throw new Error(data.error_description);
      }

      // Storing the user's info in localStorage for easy access
      localStorage.setItem("firstName", data.given_name);
      localStorage.setItem("email", data.email);

      // Optionally, you can navigate here after fetching user info
      navigate('/home'); // Navigate to home after successful login
    } catch (error) {
      console.error('Failed to fetch Google user info:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleAuthURL = 'http://localhost:3000/auth/google'; // Initiates Google login
      window.location.href = googleAuthURL; // Redirect user to Google OAuth
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

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
