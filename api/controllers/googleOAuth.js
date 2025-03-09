import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from "dotenv"
import {userModel} from "../models/User.js"
dotenv.config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile);
        const user = await userModel.findOne({ googleId: profile.id })

        if (user) {
            // Attach the access token to the user object
            user.accessToken = accessToken;
            await user.save();
            return done(null, user);
        }

        const newUser = await userModel.create({
            googleId: profile.id,
            firstName: profile.name.givenName, // Store the given name from the profile
            lastName: profile.name.familyName, // Store the family name from the profile
            email: profile.emails[0].value,   // Store the email from the profile
            profilePicture: profile.photos ? profile.photos[0].value : null, // Store the profile picture if available
            accessToken: accessToken // Save the access token
        });

        console.log(profile.name.familyName)
        

        done(null, newUser, profile)
    } catch (error) {
        done(error)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await userModel.findOne({ _id: userId })
        done(null, user)
    } catch (error) {
        done(error)
    }
})

export default passport