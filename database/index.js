
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rubber_duck', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const { Schema } = mongoose;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('Connected to Mongo'); });

const UserSchema = new Schema({
  id: { type: String, required: true },
  accessToken: String,
  provider: String,
  providerUserId: String,
  login: { type: String, required: true },
  node_id: String,
  avatar_url: String,
  url: String,
  html_url: String,
  organizations_url: String,
  repos_url: String,
  name: String,
});

const User = mongoose.model('User', UserSchema);

const RepoSchema = new Schema({
  repo_id: Number,
  name: String,
  full_name: String,
  html_url: String,
  description: String,
  url: String,
});

const Repo = mongoose.model('Repo', RepoSchema);

module.exports = {
  User,
  Repo,
  db,
};
