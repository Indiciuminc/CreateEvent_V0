var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },
  sT: String,
  eT: String,
  address: String,
  info: String,
  admis: String,
  cost: String,
  fee: String,
  faceb: String,
  insta: String,
  tweet: String,
  google: String,
  web: String,
});

mongoose.model('Event', EventSchema);