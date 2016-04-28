var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true},
  sT: {type: String, required: true},
  eT: {type: String, required: true},
  address: {type: String, required: true},
  info: {type: String, required: true},
  admis: {type: String, required: true},
  cost: String,
  fee: String,
  pic: {type: mongoose.Schema.Types.Mixed},
  
});

mongoose.model('Event', EventSchema);