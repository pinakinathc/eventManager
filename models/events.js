"use strict"
var mongoose = require('mongoose');

var eventsSchema = mongoose.Schema({
 event_name: String,
 date: String,
 time: String,
 description: String,
 speaker: [{
    speaker_name: String,
    speaker_role: String,
    speaker_company: String,
    speaker_history: String,
 }],
 no_of_people: String,
})

var Events = mongoose.model('Events', eventsSchema);
module.exports = Events;