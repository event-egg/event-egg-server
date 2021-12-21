'use strict';

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const axios = require('axios');
const User = require('./models/userModel.js');
const Event = require('./models/eventModel.js');
const getEventData = require('./modules/getEventData.js');
const postEvent = require('./modules/postEvent.js');
const createUser = require('./modules/createUser.js');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection
db.on('error', console.error.bind(console.Console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
})

app.get('/test', (req, res) => res.send('test works!'))
app.get('/events', getEventData); // retrieves data
// app.post('/user', createUser);
// // app.get('/user', getUserData); // retrieves user data    
// app.post('/events', postEvent); // creates data, when a user 'likes' an event, it will create an Event saved to their profile here in the DB
// app.delete(); // deletes data
// app.put(); // updates data


app.listen(PORT, () => console.log('listening on port: ' + PORT))