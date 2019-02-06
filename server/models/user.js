const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: String,
    name: String,
    email: String,
    emailToken: String,
    provider: String,
    poviderToken: String
}, {
  collection: 'users'
});

module.exports = mongoose.model( 'User', UserSchema );
