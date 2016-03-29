var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Event = mongoose.model('Event');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/events', function(req, res, next) {
  Event.find(function(err, events){
    if(err){ return next(err); }

    res.json(events);
  });
});

router.post('/events', function(req, res, next) {
  var event = new event(req.body);

  event.save(function(err, event){
    if(err){ return next(err); }

    res.json(event);
  });
});


router.param('event', function(req, res, next, id) {
  var query = Event.findById(id);

  query.exec(function (err, event){
    if (err) { return next(err); }
    if (!event) { return next(new Error('can\'t find Event')); }

    req.event = event;
    return next();
  });
});