'use strict';

// const Event = require('../models/eventModel.js');
const User = require('../models/userModel.js');

async function postEvent(request, response) {
  // verifyUser(request, (err, user) => {
  //   if (err) {
  //     response.send('invalid token');
  //   } else {
  const { id } = request.params;
  try {
    const worked = await User.findByIdAndUpdate(id, {
      $push: {
        savedEvents: { ...request.body }
      }
    })
    console.log('worked');
    response.status(200).send('worked');
  } catch (err) {
    response.status(500).send('server error');
  }
  //   }
  // })
}

module.exports = postEvent;
