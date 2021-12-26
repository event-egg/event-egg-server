'use strict';
const User = require('../models/userModel.js');
const verifyUser = require('../auth');

async function createEvent(req, res) {

  verifyUser(req, async (err, user) => {
    if (err) {
      res.send('Invalid Token');
    } else {
      const { id } = req.params;
      try {
        const updatedUserAndEvents = await User.findByIdAndUpdate(id, {
          $push: {
            savedEvents: { ...req.body }
          }
        }, {new: true})
        console.log('UpdatedUandE:', updatedUserAndEvents);
        res.status(200).send(updatedUserAndEvents);
      } catch (e) {
        res.status(500).send('Server Error');
      }
    }
  })
}

module.exports = createEvent;
