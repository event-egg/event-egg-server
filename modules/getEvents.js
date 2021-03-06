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
        venueName: eventDataFull._embedded.venues[0].name ? eventDataFull._embedded.venues[0].name : "Undefined",
        street: eventDataFull._embedded.venues[0].address ? eventDataFull._embedded.venues[0].address : "Undefined",
        city: eventDataFull._embedded.venues[0].city.name ? eventDataFull._embedded.venues[0].city.name : "Undefined",
        state: eventDataFull._embedded.venues[0].state ? eventDataFull._embedded.venues[0].state : "Undefined", // 'name' is also available instead
        zip: eventDataFull._embedded.venues[0].postalCode ? eventDataFull._embedded.venues[0].postalCode : "Undefined"
      } : {
        venueName: "Undefined",
        street: "Undefined",
        city: "Undefined",
        state: "Undefined", // 'name' is also available instead
        zip: "Undefined"
      } : {
      venueName: "Undefined",
      street: "Undefined",
      city: "Undefined",
      state: "Undefined", // 'name' is also available instead
      zip: "Undefined"
    };
    this.startTime = eventDataFull.dates.start.dateTime || "Undefined"; // this is Greenwich, England time @ prime meridian, 8hrs ahead of the time in Los Angeles
    this.localTime = eventDataFull.dates.start.localTime || "Undefined"; 
    this.localDate = eventDataFull.dates.start.localDate || "Undefined";

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


// Makes the API call for each interest, formats the returned data
const requestTMInfo = async (url) => {
  try {
    console.log(`Requesting ${url}`);
    const eventInfo = await axios(url);
    const returnedEvents = eventInfo.data._embedded.events
    const formattedEventsArray = returnedEvents.map(eventObj => new Event(eventObj));
    return formattedEventsArray
  } catch (e) {
    return [] // Returns an empty array if no events are returned/error occurs
  }
}

const requestInterestInfo = async (interests, city, date) => {
  // Maps through our interests, formats the URL for the request and calls requestTMInfo which makes an API call for each interest
  const requests = interests.map((interest) => {
    const url = `${process.env.TM_API_URL}/events.json?keyword=${city} ${interest}&localStartDateTime=${date},*&sort=date,asc&apikey=${process.env.TM_API_KEY}`;
    return requestTMInfo(url) // Async function that gets the TM info from API
      .then((a) => {
        return a // Returns the info.
      }).catch(() => console.log("An error occured when requesting interest info..."))
  })
  return Promise.all(requests) // Waiting for all the requests to get resolved.
}


async function handleGetEvents(req, res) {
  console.log('get hit')
  verifyUser(req, async (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      console.log('req.body: ', req.body);
      const { city } = req.body;                // Gets user's city, interests, and date
      const { interests } = req.body;
      const { date } = req.body;
      let returnedEvents = [];                  // Makes an empty array to house our gotten and formatted events
      try {
        requestInterestInfo(interests, city, date)    // Passes user's city and interests into the requestInterestInfo funct
          .then(returned => {
            returned.forEach(returnedEventArray => returnedEvents = [...returnedEventArray, ...returnedEvents]) // Takes each returned event array and adds it to returnedEvents
          })
          .then(() => returnedEvents.sort((a, b) => { // Sorts the 'returnedEvents' array by start time
            var c = new Date(a.startTime);
            var d = new Date(b.startTime);
            return c - d;
          }))
          .then(() => returnedEvents.length > 0 ? // Checks to make sure that the 'returnedEvents' array is not empty before sending
            res.status(200).send(returnedEvents) :
            res.status(500).send('server error'))
      } catch (err) {
        console.log(err);
        res.status(500).send('server error');
      }
    }
  })
}

module.exports = handleGetEvents;
