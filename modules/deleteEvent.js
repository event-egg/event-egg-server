'use strict';
const User = require('../models/userModel.js');
const verifyUser = require('../auth');

async function deleteEvent(request, response) {

  verifyUser(request, async (err, user) => {
    if (err) {
      response.send('Invalid Token');
    } else {
      const { id } = request.params;
      try {
        const updatedUserAndEvents = await User.findByIdAndUpdate(id, {
          $pull: {
            savedEvents: { ...request.body }
          }
        })
        console.log('deleted');
        response.status(200).send(updatedUserAndEvents);
      } catch (e) {
        response.status(500).send('Server Error');
      }
    }
  })
}

module.exports = createEvent;
