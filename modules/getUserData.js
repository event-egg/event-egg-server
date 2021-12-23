'use strict';

const User = require('../models/userModel.js');

async function getUserData(request, response) {
  console.log('get hit')
  // verifyUser(request, async (err, user) => {
  //   if (err) {
  //     response.send('invalid token');
  //   } else {
  const { email } = request.query;
  try {
    let retrievedUser = await User.findOne({ email: email });
    retrievedUser === null ? response.status(200).send({}) : response.status(200).send(retrievedUser);
  } catch (err) {
    console.log(err);
    response.status(500).send('server error');
  }

  //   }
  // })
}

module.exports = getUserData;