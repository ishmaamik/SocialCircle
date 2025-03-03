import express from 'express';
import passport from "./controllers/googleOAuth.js";
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
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
  allowedHeaders: 'Content-Type',
  credentials: true  // Allow cookies and sessions
}));


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: false }), (req, res) => {
  console.log("Yayy hoise")  
  res.redirect('http://localhost:5173/HomePage')
})
// Middleware to initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
connect();

// Body parsing middleware
app.use(express.json());

// Google Authentication Route (Step 1: Initiate OAuth)


// Example of generating a JWT (You can use any JWT library to generate tokens)
function generateJWT(user) {
  const jwt = require('jsonwebtoken');
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
