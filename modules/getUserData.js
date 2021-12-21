'use strict';

const User = require('../models/userModel.js');

async function getUserData(request, response) {
  // verifyUser(request, async (err, user) => {
  //   if (err) {
  //     response.send('invalid token');
  //   } else {
  const { email } = request.query;
  try {
    let retrievedEvents = await User.find({ email });
    response.status(200).send(retrievedEvents);
  } catch (err) {
    response.status(500).send('server error');
  }
  //   }
  // })
}

module.exports = getUserData;