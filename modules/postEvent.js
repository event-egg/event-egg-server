'use strict';

const Event = require('../models/eventModel.js');
const User = require('../models/userModel.js');

async function postEvent(request, response) {
  // verifyUser(request, (err, user) => {
  //   if (err) {
  //     response.send('invalid token');
  //   } else {
  try {
    const madeEvent = await Event.create({ ...request.body }); // email: user.email, add this later after verification
    await User.findByIdAndUpdate("61c1ecd9f2b3369e5fe618b8", { savedEvents: madeEvent })
    response.status(200).send(madeEvent);
  } catch (err) {
    response.status(500).send('server error');
  }
  //   }
  // })
}

module.exports = postEvent;