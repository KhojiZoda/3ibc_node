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
  },
  size: {
    type: Number
  },
  prev_block: {
    type: String
  },
  next_block: {
    type: String
  }
});

module.exports = mongoose.model('Blocks', blockSchema);
