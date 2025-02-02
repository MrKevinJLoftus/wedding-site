const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true }
});

// mongoose schema validator "unique" does not actually prevent duplicates.
// it only does some optimization for mongodb
// for this, use node package 'mongoose-unique-validator'
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
