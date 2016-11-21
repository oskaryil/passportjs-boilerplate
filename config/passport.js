const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GithubStrategy = require("passport-github").Strategy;
const LocalStrategy = require('passport-local').Strategy;
const configAuth = require('./auth');
const db = require ('./db');

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new LocalStrategy((username, password, done) => {
        // Fill in
    }));

    /*
     * Facebook Strategy OAuth
     */
    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'emails', 'name']
    }, (token, refreshToken, profile, done) => {
        process.nextTick(() => {
            // Handle information

            db.data.user.facebookToken = token;
            db.data.user.facebookId = profile.id;
            db.data.user.facebookName = profile.name.givenName + ' ' + profile.name.familyName;
            db.data.user.facebookEmail = profile.emails[0].value;
            db.data.user.name = profile.name.givenName + ' ' + profile.name.familyName;
            db.data.user.email = profile.emails[0].value;

            return done(null, db.data.user);
        });
    }));

    /*
     * Google Strategy OAuth
     */
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    }, (token, refreshToken, profile, done) => {
        process.nextTick(() => {
            // Handle information
            db.data.user.googleToken = token;
            db.data.user.googleId = profile.id;
            db.data.user.googleName = profile.displayName;
            db.data.user.googleEmail = profile.emails[0].value;
            db.data.user.googlePic = profile.photos[0].value;
            db.data.user.name = profile.displayName;
            db.data.user.email = profile.emails[0].value;

            return done(null, db.data.user);
        });
    }));

    /*
     * Github Strategy OAuth
     */
    passport.use(new GithubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
    }, (token, refreshToken, profile, done) => {
        process.nextTick(() => {
            // Handle information

            db.data.user.githubToken = token;
            db.data.user.githubId = profile.id;
            db.data.user.githubName = profile.name;
            db.data.user.githubEmail = profile.email;
            db.data.user.name = profile.name;
            db.data.user.email = profile.email;

            return done(null, db.data.user);
        });
    }));
};
