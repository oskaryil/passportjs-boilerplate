const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const GithubStrategy = require("passport-github").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const config = require('./config.json');

var app = express();
app.use(bodyParser.json()); // Support JSON Encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // Support encoded bodies

// Express Session
app.use(session({
  secret: 'passportjs-boilerplate',
  saveUninitialized: true,
  resave: true
}));

// Init PassportJS
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

/*
 * ---------------------------
 * Start Routes
 * ---------------------------
 */

// Default
app.get('/', (req, res, next) => {
	res.json({
        success: true,
        page: 'Home',
        message: `You have reached the homepage. Too bad it's just json...`
    });
});

// Passport redirect routes
app.get('/login', (req, res, next) => {
  res.send("<a href='/auth/facebook'>Login with Facebook</a><br /><a href='/auth/google'>Login with Google</a><br /><a href='/auth/github'>Login with Github</a><br />")
});

app.get('/profile', isAuthenticated, (req, res, next) => {
  res.json({
     success: true,
     page: 'Profile',
     message: 'Successfully authenticated'
  });
});

// Facebook
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

// Google
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

// Github
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

/*
 * ---------------------------
 * /End Routes
 * ---------------------------
 */

// Misc Stuff
function isAuthenticated(req, res, next) {
    const isAuthenticated = false;

    if (isAuthenticated) {
        return next();
    } else {
        return res.json({
            success: false,
            page: 'Authentication',
            message: 'You are not authorized to access this'
        })
    }
}

// Set port & listen
app.set('port', (process.env.PORT || config.site.port));
app.listen(app.get('port'), () => {
	console.log(config.site.name + " running on port " + app.get('port'));
});
