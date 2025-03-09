import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import { userModel } from "../models/User.js";  // Assuming this is your MongoDB user model
dotenv.config();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile);

    // Check if the user already exists in the database by GitHub ID
    const user = await userModel.findOne({ githubId: profile.id });

    if (user) {
      // If the user exists, update the access token
      user.accessToken = accessToken;
      await user.save();
      return done(null, user);  // Pass the user to done
    }

    // If user does not exist, create a new user
    const newUser = await userModel.create({
      githubId: profile.id,
      username: profile.username,  // GitHub username
      firstName: profile.displayName, // GitHub user name or display name
      email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,  // GitHub email if available
      profilePicture: profile.photos ? `${profile.photos[0].value}.png` : null,  // GitHub profile picture if available
      accessToken: accessToken  // Store the access token
    });

    done(null, newUser);  // Pass the new user to done
  } catch (error) {
    done(error);
  }
}));

// Serialize the user into the session
passport.serializeUser((user, done) => {
  done(null, user._id);  // Store the user's MongoDB ID in the session
});

// Deserialize the user from the session
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await userModel.findOne({ _id: userId });
    done(null, user);  // Pass the user to done
  } catch (error) {
    done(error);
  }
});

export default passport;
