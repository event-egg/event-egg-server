'use strict';

// const Event = require('../models/eventModel.js');
const User = require('../models/userModel.js');

async function postEvent(request, response) {
  // verifyUser(request, (err, user) => {
  //   if (err) {
  //     response.send('invalid token');
  //   } else {
  try {
    // const madeEvent = await Event.create({ ...request.body }); // email: user.email, add this later after verification
    const worked = await User.findByIdAndUpdate("61c203d438ce64efd20c215b", {
      $push: {
        savedEvents: { ...request.body }
      }
    })
    console.log(worked);
    response.status(200).send(worked);
  } catch (err) {
    response.status(500).send('server error');
  }
  //   }
  // })
}

module.exports = postEvent;
