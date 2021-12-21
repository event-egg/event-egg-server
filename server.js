'use strict';

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const getUserData = require('./modules/getUserData.js');
const createEvent = require('./modules/createEvent.js');
const createUser = require('./modules/createUser.js');
const handleGetEvents = require('./modules/getEvents');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
})

app.get('/test', (req, res) => res.send('test works!'))
app.get('/events', handleGetEvents); // retrieves data from API
app.get('/user', getUserData); // retrieves data for just one user from DB
app.post('/user', createUser); // creates user on DB
app.post('/events/:id', createEvent); // creates data, when a user 'likes' an event, it will create an Event saved to their profile here in the DB
// app.delete(); // deletes data
// app.put('/user/:id', updateUserPreferences); // updates data

app.listen(PORT, () => console.log('listening on port: ' + PORT))