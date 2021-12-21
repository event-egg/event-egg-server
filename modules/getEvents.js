'use strict';
const mockdata = require('./mockdata.js');
// const verifyUser = require('../auth');

class Event {
  constructor(eventDataFull) {
    this.name = eventDataFull.name;
    this.id = eventDataFull.id; // TicketMaster event id, not mongodb id
    this.link = eventDataFull.url;
    this.image = eventDataFull.images[0]; // there are others available
    this.description = eventDataFull.info;
    this.address = {
      venueName: eventDataFull._embedded.venues[0].name,
      street: eventDataFull._embedded.venues[0].address.line1,
      city: eventDataFull._embedded.venues[0].city.name,
      state: eventDataFull._embedded.venues[0].state.stateCode, // 'name' is also available instead
      zip: eventDataFull._embedded.venues[0].postalCode
    }
    this.startTime = eventDataFull._embedded.venues.dates.start; // is an object of this form:
    /*
            "localDate": "2021-12-25",
            "localTime": "15:00:00",
            "dateTime": "2021-12-25T22:00:00Z",
            "dateTBD": false,
            "dateTBA": false,
            "timeTBA": false,
            "noSpecificTime": false
    */
  }
}

function handleGetEvents(req, res) {
  
  const returnedEvents = mockdata._embedded.events;
  const eventsArray = returnedEvents.map(eventObj => new Event(eventObj));
  console.log(eventsArray);
}

module.exports = handleGetEvents;