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
  const token = generateJWT(req.user); // Assuming req.user contains the authenticated user
  res.cookie('auth_token', token, { httpOnly: true });  // Send token as HTTP cookie
  res.redirect('http://localhost:5173/home');
});

function generateJWT(user) {
  const token = jwt.sign({ userId: user.id }, 'your_jwt_secret');
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
