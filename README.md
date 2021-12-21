# event-egg-server
Server side application

## Changelog
<!--
01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource. -->
12.20.2021 4:00PM - Connected to MongoDB with seed.js
12.20.2021 4:30PM - Deployed on Heroku


## Data Structure
Data coming back from the TicketMaster API query will be structured like this:

response = {
  "_embedded": {
    "events": [
      {
        name:
        type
        id
        test
        url
        "locale": "en-us",
        images: []
        sales: {}
        dates: {
          start: {
            "localDate": "2021-12-25",
            "localTime": "15:00:00",
            "dateTime": "2021-12-25T22:00:00Z",
            "dateTBD": false,
            "dateTBA": false,
            "timeTBA": false,
            "noSpecificTime": false
          }
        "timezone": "America/Phoenix",
        "spanMultipleDays": false  
        }
        _embedded: {
          venues: [
            {
             name,
             id,
             url,
             images: [],
             postalCode,
             timeZone,
             city,
             state,
             country,
             address,
             
            }
          ]
        }

      },
      {},
      {}
    ]
  }
}