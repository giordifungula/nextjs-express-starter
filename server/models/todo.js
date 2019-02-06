const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TodoSchema = new Schema({
    user_id    : String,
    name       : String,
    updated_at : Date,
}, {
  collection: 'todos'
});

module.exports = mongoose.model( 'Todo', TodoSchema );
