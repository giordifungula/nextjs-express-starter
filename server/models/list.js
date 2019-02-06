const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ListSchema = new Schema({
    user_id    : String,
    name       : String,
    updated_at : Date
});

module.exports = mongoose.model( 'List', ListSchema );
