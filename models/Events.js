var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  sT: String,
  eT: String,
  address: String,
  info: String,
  admis: String,
  cost: String,
  fee: String,
  pic: {type: mongoose.Schema.Types.Mixed},
  
});

mongoose.model('Event', EventSchema);