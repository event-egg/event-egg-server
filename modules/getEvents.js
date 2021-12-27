'use strict';

const axios = require('axios');
const mockdata = require('./mockdata.js');
const verifyUser = require('../auth');

// Ternary to check if property exists in API response, if not set to undefined
class Event {
  constructor(eventDataFull) {
    this.name = eventDataFull.name ? eventDataFull.name : "Undefined";
    this.id = eventDataFull.id ? eventDataFull.id : "Undefined"; // TicketMaster event id, not mongodb id
    this.link = eventDataFull.url ? eventDataFull.url : "Undefined";
    this.image = eventDataFull.images[0] ? eventDataFull.images[0] : "Undefined"; // there are others available
    this.description = eventDataFull.info ? eventDataFull.info : "Undefined";
    this.address = eventDataFull._embedded ? eventDataFull._embedded.venues ? 
      {
      venueName: eventDataFull._embedded.venues[0].name  ? eventDataFull._embedded.venues[0].name : "Undefined",
      street: eventDataFull._embedded.venues[0].address ? eventDataFull._embedded.venues[0].address : "Undefined",
      city: eventDataFull._embedded.venues[0].city.name ? eventDataFull._embedded.venues[0].city.name : "Undefined",
      state: eventDataFull._embedded.venues[0].state ? eventDataFull._embedded.venues[0].state : "Undefined", // 'name' is also available instead
      zip: eventDataFull._embedded.venues[0].postalCode ? eventDataFull._embedded.venues[0].postalCode : "Undefined"
      } : {
        venueName:  "Undefined",
        street: "Undefined",
        city: "Undefined",
        state: "Undefined", // 'name' is also available instead
        zip: "Undefined"
      } : {
        venueName:  "Undefined",
        street: "Undefined",
        city: "Undefined",
        state: "Undefined", // 'name' is also available instead
        zip: "Undefined"
      };
    this.startTime = eventDataFull.dates.start.dateTime || "Undefined"; // is an object of this form:
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
//TODO: construct this URL using variables from user's search, preferences, and search parameters
/*
Client side:
conditional query assembly
From client signin: 
  location: String,
  keywords: String, //for the API
From client search:
  date: String optional,
  keywords: 
*/

//TODO: parse getEvents query from client (parse through user event preferences array), then query TM API

async function handleGetEvents(req, res) {
  console.log('get hit')
  verifyUser(req, async (err, user) => {
    if (err) {
        res.send('invalid token');
    } else {
      // const keyword = req.query.keyword;
      // const { city } = req.query;
      console.log('req.body: ', req.body);
      const { city } = req.body;
      try {
        console.log('req whole', req.body);
        // console.log('keyword:', keyword);
        const apiResponse = await axios(`${process.env.TM_API_URL}/events.json?keyword=${city}&apikey=${process.env.TM_API_KEY}`);
        // console.log(apiResponse.data);
        const returnedEvents = apiResponse.data._embedded.events;
        const eventsArray = returnedEvents.map(eventObj => new Event(eventObj));
        res.status(200).send(eventsArray);

      } catch (err) {
        console.log(err);
        res.status(500).send('server error');
      }
    }
  })
}

module.exports = handleGetEvents;
