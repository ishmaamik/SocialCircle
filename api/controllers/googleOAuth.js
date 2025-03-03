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
        const user = await userModel.findOne({ googleId: profile.id })

        if (user) {
            return done(null, user)
        }

        const newUser = await userModel.create({
            googleId: profile.id,
            firstName: profile.displayName,
            email: profile.emails[0].value
        })  

        done(null, newUser)
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

        if (!user) {
            return done(new Error('User not found'))
        }

        done(null, user)
    } catch (error) {
        done(error)
    }
})

export default passport