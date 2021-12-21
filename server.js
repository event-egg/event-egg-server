'use strict';

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/userModel.js');
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
app.patch('/user/:id', updateUserPreferences); // updates data

async function updateUserPreferences(request, response) {
  // verifyUser(request, (err, user) => {
  //   if (err) {
  //     response.send('invalid token');
  //   } else {
  const { id } = request.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, request.body, { new: true, overwrite: false });
    response.status(200).send(updatedUser);
  } catch (err) {
    response.status(500).send('server error');
  }
  //   }
  // })
}

app.listen(PORT, () => console.log('listening on port: ' + PORT))