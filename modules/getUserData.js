'use strict';

const User = require('../models/userModel.js');
const verifyUser = require('../auth');

async function getUserData(req, res) {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      const { email } = req.query;
      try {
        let retrievedUser = await User.findOne({ email: email });
        retrievedUser === null ? res.status(200).send({}) : res.status(200).send(retrievedUser);
      } catch (err) {
        console.log(err);
        res.status(500).send('server error');
      }
    }
  })
}

module.exports = getUserData;