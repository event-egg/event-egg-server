'use strict';
const User = require('../models/userModel.js');
const verifyUser = require('../auth');

async function createEvent(request, response) {

  verifyUser(request, async (err, user) => {
    if (err) {
      response.send('Invalid Token');
    } else {
      const { id } = request.params;
      try {
        const updatedUserAndEvents = await User.findByIdAndUpdate(id, {
          $push: {
            savedEvents: { ...request.body }
          }
        }, {new: true})
        console.log('UpdatedUandE:', updatedUserAndEvents);
        response.status(200).send(updatedUserAndEvents);
      } catch (e) {
        response.status(500).send('Server Error');
      }
    }
  })
}

module.exports = createEvent;
