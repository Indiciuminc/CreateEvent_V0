var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  date: { type: Date, default: Date.now },
  s_Time: String,
  e_Time: String,
  regist: Boolean,
  addmis: String,
  event_I: String,
  event_Key: String,
  street_Nu: String,
  street_Na: String,
  city: String,
  prosta: String,
  postzip: String,
  web: String,
  faceb: String,
  insta: String,
  tweet: String,
  google: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

mongoose.model('Event', EventSchema);