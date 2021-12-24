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

## TO DO ITEMS FOR PROJECT BOARD
client logs in-->
Create new user preferences 
Update preferences
Removing un-favorited events from user object using DELETE method (find by event id and delete)
Stretch: Delete user
Auth0 implementation across all
API
  build query string based on user search/preferences/parameters
  cache (or return?) next page of search results upon search to 

## DONE:
create new user with post
get user from DB (using email address to search collection)

## STRETCH:
save queries to user profile and render these past queries when search bar is used
