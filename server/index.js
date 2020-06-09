require('dotenv').config();
const express = require('express');
const compression = require('compression');
const passport = require('./controller/github-auth');


const app = express();
app.set('port', 3030);

// The Middle
// app.use(require('morgan')('combined'));
app.use((req, resp, next) => {
  console.log(`${req.method}:${req.originalUrl}`);
  next();
});
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));

app.use(compression());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// Static
app.use('/', express.static('dist'));

// Routes
app.get('/auth/github',
  passport.authenticate('github', { failureRedirect: '/' }));

app.get('/return',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log(req.user);
    res.redirect(`/?user=${req.user.id}`);
  });

app.get('/api/user/:id',
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => {
    console.log('API HIT:', req.user);
    res.send(req.user);
  });

// LetLive.
app.listen(app.set('port'), () => {
  console.log(`Rubber Duck Server running: ${app.set('port')}`);
});
