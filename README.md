# event-egg-server
Server side application, which handles the API requests, takes that returned data and fits it into a certain shape to send back to the front end. This server also handles all the conversing with MongoDB, to include Create, Read, Update, and Delete functionality. This serves as our mediary between our persistent MongoDB as well as the client application.

## Changelog
Please check out the [GitHub](https://github.com/event-egg/event-egg-server/pulls?q=is%3Apr+is%3Aclosed) for this project to check out the various changes!

## Tools Used 
- Mongoose
- MongoDB
- Auth0
- Cors
- Express

For this back end we used Mongoose as well as MongoDB for altering data in MongoDB and data persistence, respectively. This backend application takes advantage of Auth0 to ensure that requests to the database/TicketMaster API cannot be done unless the user is authenticated. 

## Data Structure
Data coming back from the TicketMaster API query will be structured like this:


```
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
```
