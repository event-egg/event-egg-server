'use strict';

const User = require('../models/userModel.js');
const verifyUser = require('../auth');

async function createUser(req, res) {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.status(500).send(err);
      res.send('invalid token');
    } else {
  try {
    const madeUser = await User.create({ ...req.body });
    res.status(200).send(madeUser);
  } catch (err) {
    res.status(500).send('server error');
  }
    }
  })
}

module.exports = createUser;
