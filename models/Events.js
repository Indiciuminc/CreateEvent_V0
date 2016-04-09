var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },
  sT: String,
  eT: String,
  address: String,
  info: String,
});

mongoose.model('Event', EventSchema);