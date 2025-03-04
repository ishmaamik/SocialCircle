import express from 'express';
import passport from "./controllers/googleOAuth.js";
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import jwt from "jsonwebtoken"
import { addUser } from './controllers/userController.js';  // Assume addUser handles user creation
import { connect } from './middlewares/mongo.js';  // MongoDB connection setup

dotenv.config();

const app = express();

app.use(session({
  secret: 'your-secret-key', // Change to a strong secret
  resave: false,
  saveUninitialized: true
}));

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173',  // Allow frontend to access backend
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true  // Allow cookies and sessions
}));




app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// Middleware to initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
connect();

// Body parsing middleware
app.use(express.json());

// Google Authentication Route (Step 1: Initiate OAuth)


app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Generate JWT token after successful authentication
  console.log("Yayy hoise")
  const accessToken = req.user.accessToken; // Assuming req.user contains the authenticated user
  res.cookie('googleAccessToken', accessToken, {
    maxAge: 300000    // Expiry time for the token (e.g., 1 minute)
  });  // Send token as HTTP cookie
  res.redirect('http://localhost:5173/');
});

function generateJWT(user) {
  // Extract necessary user details for the JWT payload
  const payload = {
    userId: user.id,                // User's ID
    firstName: "Aizen",          // User's display name (from Google)
    email: user.email,               // User's email (from Google)
    profilePicture: user.photos ? user.photos[0].value : null, // Profile picture (if available)
    googleId: user.id                // Google's unique ID for the user
  };

  // Generate and return JWT token with the additional user details
  const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });  // Expiry time can be adjusted
  return token;
}
// Route to handle user registration
app.post('/user', addUser);

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hi there!');
});

// Listen on the specified port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
