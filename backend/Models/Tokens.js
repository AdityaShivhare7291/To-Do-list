const mongoose = require('mongoose');
const { Schema } = mongoose;

const Token = new Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  // Field to store expiration time
  expirationTime: { type: Date, required: true }, // Store expiration time
});

// Create a TTL index on the expirationTime field
Token.index({ expirationTime: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 15 });

module.exports = mongoose.model('token', Token);
