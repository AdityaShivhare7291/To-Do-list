const mongoose = require('mongoose');
const { Schema } = mongoose;

const Tasks = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: {
    type: Date,
    required: true,
  },
  starttime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('tasks', Tasks);
