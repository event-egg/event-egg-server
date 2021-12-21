'use strict';

const Event = require('../models/eventModel.js');
const User = require('../models/userModel.js');

async function getEventData(request, response) {
  // verifyUser(request, async (err, user) => {
  //   if (err) {
  //     response.send('invalid token');
  //   } else {
  try {
    let retrievedEvents = await User.find({});
    response.status(200).send(retrievedEvents);
  } catch (err) {
    response.status(500).send('server error');
  }
  //   }
  // })
}

module.exports = getEventData;