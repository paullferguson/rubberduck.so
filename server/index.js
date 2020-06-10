require('dotenv').config();
const express = require('express');
const compression = require('compression');
const passport = require('./controller/github-auth');
const getRepos = require('./model/github-repo');
const getPackageJson = require('./model/github-file');
const { User, Repo } = require('../database/index');

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
    getRepos(req.user, (err) => {
      if (err) throw err;
      console.log('Repos saves');
    });
    res.redirect(`/?user=${req.user.id}`);
  });

app.get('/api/user/:id',
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => {
    User.find({ id: req.user.id })
      .then((repos) => {
        res.send(repos);
      })
      .catch((err) => res.status(500).send(err));
    // res.send(req.user);
  });

app.get('/api/users/repos/:id',
  // require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => {
    // owner_id: req.params.id
    Repo.find({}).sort({ updated_at: -1 })
      .then((repos) => {
        res.send(repos);
      })
      .catch((err) => res.status(500).send(err));
  });

app.get('/api/repo/:repoName',
  // require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => {
    Repo.findOne({ name: req.params.repoName })
      .then((repo) => {
        res.send(repo);
      })
      .catch((err) => res.status(500).send(err));
  });


app.get('/api/file/:repoName',
  // require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => {
    // owner_id: req.params.id
    getPackageJson(req.user, req.params.repoName, (err, file) => {
      if (err) throw err;
      console.log('File saved', file);
      res.send({ file });
    });
  });


app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


// LetLive.
app.listen(app.set('port'), () => {
  console.log(`Rubber Duck Server running: ${app.set('port')}`);
});
