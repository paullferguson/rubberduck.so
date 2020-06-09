/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const { User } = require('../../database/index');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/return',
  scope: 'read:user,repo',
},
((accessToken, refreshToken, profile, done) => {
  // console.log(profile.username);

  User.findOne({
    id: profile.id,
  }, (err, user) => {
    if (err) return done(err);

    // console.log(user);
    console.log('ACCESSTOKEN---', accessToken);
    console.log('refreshToken---', refreshToken);

    if (!user) {
      // console.log('write user', profile.id);
      const newUser = new User({
        id: profile.id,
        accessToken,
        username: profile.username,
        provider: profile.provider,
        providerUserId: profile._json.providerUserId,
        login: profile._json.login,
        node_id: profile._json.node_id,
        avatar_url: profile._json.avatar_url,
        url: profile._json.url,
        html_url: profile._json.html_url,
        organizations_url: profile._json.organizations_url,
        repos_url: profile._json.repos_url,
        name: profile._json.name,
      });
      newUser.save((errSave) => {
        if (errSave) console.log(errSave);
        console.log('user saved');
        return done(errSave, user);
      });
    } else {
      console.log('user exists');
      return done(err, user);
    }
  });
})));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
