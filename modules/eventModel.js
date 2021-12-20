const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  name: String,
  startTime: String, // TODO: possibly not a String, required
  endTime: String, // not required
  address: String, // TODO: is this better as location? URLs for virtual events?
  description: String, // not required 
  link: String,
  image: String
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;