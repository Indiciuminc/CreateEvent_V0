var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
  
  ename: {
    type: String, 
    required: true
    
  },
  
  date: {
    type: Date, 
    required: true
    
  },
  
  sTime: {
    type: String, 
    required: true
    
  },
  
  eTime: {
    type: String, 
    required: true
    
  },
  
  address: {
    type: mongoose.Schema.Types.Mixed
    
  },
  
  info: {
    type: String, 
    required: true
    
  },
  
  admis: {
    type: String, 
    required: true
    
  },
  
  cost: String,
  
  fee: String,
  
  cat: {
    type: String,
    required: true
    
  },
  
  pic: {
    type: mongoose.Schema.Types.Mixed
    
  },
  
});

mongoose.model('Event', EventSchema);