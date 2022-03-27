const dotenv=require('dotenv').config(),
User=require('./models/User.js'),
mongoose=require('mongoose'),
passport=require('passport'),
 GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null,profile)
  }
));
passport.serializeUser((user,done)=>{
    done(null,user)
});
passport.deserializeUser((user,done)=>{
     done(null,user)
})