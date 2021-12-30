# event-egg-server
Server side application, which handles the API requests, takes that returned data and fits it into a certain shape to send back to the front end. This server also handles all the conversing with MongoDB, to include Create, Read, Update, and Delete functionality. This serves as our mediary between our persistent MongoDB as well as the client application.

# EventEgg
Hatch Some Plans!

### Members:
- Andrew Enyeart
- Daniel Jackson
- Kellen Linse
- Spencer Tower

### Project Description:
EventEgg is an app that helps you hatch plans! There are many events happening all the time, but it’s hard to know where to start when looking for something to do, especially when moving to a new area. **EventEgg users are able to easily create an account via Auth0, add their areas of interest, and quickly view a list of local events relevant to those interests.** Users can add events to their Favorites, which will persist in EventEgg’s database so they can access them later. For users on the road or wanting to find a specific type of event, EventEgg’s search feature allows them to find events based on different locations or interests other than their profile settings. For users who want to break out of their shell, there are shortcuts for Events Happening Today and a random event generator that finds events outside of the user’s usual preferences.

### Getting Started:
To use our app go [here](https://eventegg.netlify.app/).
In order to work on this app, you will need to create a .env file modeled after the .env.sample file, adding in the necessary keys and URLs. Additionally, this app works in conjunction with the EventEgg server which can be found [here](https://github.com/event-egg/event-egg-server). Please note that the server makes use of the Ticketmaster Discovery API, so you will also need to obtain a key for that API if you wish to work on the server.

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

Event{
 name: String,
 time: String,
 address: String,
 description: String,
 link: String,
 image: String
}

User{
 name: String,
 email: String,
 defaultCity: String,
 DefaultInterests: Array,
 savedEvents: Array
}

```

### Technologies:

- Javascript
- React
- Node.js
- MongoDB
- Express
- Axios
- GitHub
- Git
- HTML5
- CSS3
- Sass
- Ticketmaster Discovery API


### Scope of Functionalities:

#### Login:
- uses Auth0 to authenticate user

#### Welcome Page:
- asks user to enter their city
- user has the option to choose their interests

#### Dashboard:
- search events - allows users to search upcoming events based on date
- displays events
- save events to My Events

#### My Events:
- view saved events
- remove saved events

#### Profile:
- update user city
- update user interests
- permanently delete account

#### Server:
- uses Express and Axios to query Ticketmaster API for event data

#### Storage:
- utilizes MongoDB to store and retrieve user's profiles and saved events

### Additional Resources:
 - [GitHub Projects - EventEgg](https://github.com/orgs/event-egg/projects/1/views/1)
 - [Google Drive](https://drive.google.com/drive/u/0/folders/1L4QnZSzpJ9s5IHEqV8AD_FYqf1GK2sW-)
 - [Pitch/MVP](https://docs.google.com/document/d/1iqsxiGMhLdw3a4_HnTSPEnKoYriUPq7eaVtdK9F8gB0/edit)


### License:
MIT License

Copyright (c) 2021 EventEgg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
