
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
  accessToken: { type: String },
  provider: { type: String },
  providerUserId: { type: String },
  login: { type: String, required: true },
  node_id: { type: String },
  avatar_url: { type: String },
  url: { type: String },
  html_url: { type: String },
  organizations_url: { type: String },
  repos_url: { type: String },
  name: { type: String },
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
  db,
};
