const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  btc_addr: {
    type: String
  }
})

module.exports = mongoose.model('Users', userSchema);
