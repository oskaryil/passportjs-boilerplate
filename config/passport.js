var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GithubStrategy = require("passport-github").Strategy;
var LocalStrategy = require('passport-local').Strategy;
var configAuth = require('./auth');

module.exports = function (passport) {
    passport.use(new LocalStrategy((username, password, done) => {
        // Fill in
    }));

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'emails', 'name']
    }, (accessToken, refreshToken, profile, done) => {
        //process.nextTick(() => {
            // Handle information

            // -- token = accessToken;
            // -- facebookId = profile.id;
            // -- facebookName = profile.name.givenName + ' ' + profile.name.familyName;
            // -- facebookEmail = profile.emails[0].value;
            // -- id = GENERATE/AUTO-INCREMENT
            // -- name = profile.name.givenName + ' ' + profile.name.familyName;
            // -- email = profile.emails[0].value;

            console.log(profile);
            return done(null, profile);
        //});
    }));

    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        //process.nextTick(() => {
            // Handle information

            // -- token = accessToken;
            // -- googleId = profile.id;
            // -- googleName = profile.displayName;
            // -- googleEmail = profile.emails[0].value;
            // -- id = GENERATE/AUTO-INCREMENT
            // -- name = profile.displayName;
            // -- email = profile.emails[0].value;
            // -- profilePic = profile.photos[0].value;

            console.log(profile);
            return done(null, profile);
        //});
    }));

    passport.use(new GithubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        //process.nextTick(() => {
            // Handle information

            // -- token = accessToken;
            // -- githubId = profile.id;
            // -- githubName = profile.name;
            // -- githubEmail = profile.email;
            // -- id = GENERATE/AUTO-INCREMENT
            // -- name = profile.name;
            // -- email = profile.email;
            console.log(profile);
            return done(null, profile);
        //});
    }));
};
