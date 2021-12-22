'use strict';

const verifyUser = require('./auth');

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const getUserData = require('./modules/getUserData.js');
const createEvent = require('./modules/createEvent.js');
const createUser = require('./modules/createUser.js');
const deleteUser = require('./modules/deleteUser.js');
const updateUser = require('./modules/updateUser.js');
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

// app.get('/test', (req, res) => res.send('test works!'))
app.get('/test', handleTest);
app.get('/events', handleGetEvents); // retrieves data from API
app.get('/user', getUserData); // retrieves data for just one user from DB
app.post('/user', createUser); // creates user on DB
app.post('/events/:id', createEvent); // creates data, when a user 'likes' an event, it will create an Event saved to their profile here in the DB
app.delete('/user/:id', deleteUser); // deletes data
app.put('/user/:id', updateUser); // updates data

async function handleTest(req, res){
  verifyUser(req, async (err, user) => {
    if (err) {
      console.log('test error!')
      res.send('Invalid Token');
    } else { 
      try {
      console.log('test works!');
      res.send(res.send('test works!'));
      } catch (e) {
        res.status(500).send('Server Error');
      }
    }
  })
}

app.listen(PORT, () => console.log('listening on port: ' + PORT))