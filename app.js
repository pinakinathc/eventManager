var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Not using these features
// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// Commented out since Not using view engine
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Not using these features
// app.use('/', index);
// app.use('/users', users);

// Defining API handling functions here
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:7000/eventManager', function(err, db){
  if (err) throw err;
  console.log("Database created!");
});

var Events = require('./models/events');
//------------->>> Post Events <<<--------
app.post('/events', function(req, res){
  let event = req.body;
  Events.insertMany(event, function(err, events){
    if (err){
      console.log('====error while entering data====');
      throw err;
    }
    res.json(events)
  })
});

//----------->>> Get Events <<<----------
app.get('/events', function(req, res){
  Events.find(function(err, events){
    if (err){
      throw err;
    }
    res.json(events);
  })
})

//-------------->>> Delete Events <<<-------
app.delete('/events/:_id', function(req, res){
  let query = {_id: req.params._id};
  Events.remove(query, function(err, events){
    if (err){
      throw err;
    }
    res.json(events);
  })
})

//--------------->>> Update Events <<<---------
app.put('/events/:_id', function(req, res){
  console.log('===see if this comes 1');
  let event = req.body;
  console.log('===see if this comes 2');
  let query = req.params._id;
  console.log('===see if this comes 3', query);
  console.log('====', event);
  let update = {
    '$set' : {
      event_name: event.event_name,
      date: event.date,
      time: event.time,
      description: event.description,
      speaker_name: event.speaker_name,
      speaker_role: event.speaker_role,
      speaker_company: event.speaker_company,
      speaker_history: event.speaker_history,
      no_of_people: event.no_of_people
    }
  }
  console.log('===see if this comes 4');
  console.log('===checking===',query, update)
  Events.updateOne({_id: query}, update, function(err, events){
    if (err) throw err;
    res.json(events);
  })
})
// End of API functions

app.use('*', function(req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
