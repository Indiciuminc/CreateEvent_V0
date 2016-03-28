var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  event_T: String,
  event_S: String,
  date: { type: Date, default: Date.now },
  start_T: String,
  end_T: String,
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

EventSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

EventSchema.methods.downvote = function(cb) {
  this.upvotes -= 1;
  this.save(cb);
};

mongoose.model('Event', EventSchema);