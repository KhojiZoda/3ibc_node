const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blockSchema = new Schema({
  hash: {
    type: String,
    required: 'Hash du block requis'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  miner: {
    type: String,
    default: "Unknown"
  }
});

module.exports = mongoose.model('Blocks', blockSchema);
