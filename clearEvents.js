const mongoose = require('mongoose');
require('dotenv').config();
const Event = require('./models/eventModel.js');
const User = require('./models/userModel.js');

async function clear() {
  mongoose.connect(process.env.DB_URL);
  try {
    await Event.deleteMany({});
    await User.deleteMany({});
    console.log('events cleared');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();

// to clear the db make sure server is NOT running
// in terminal go to project root
// type 'node clear.js'