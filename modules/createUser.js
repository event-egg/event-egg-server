'use strict';

const User = require('../models/userModel.js');
const verifyUser = require('../auth');

async function createUser(request, response) {
  verifyUser(request, async (err, user) => {
    if (err) {
      response.status(500).send(err);
      response.send('invalid token');
    } else {
  try {
    const madeUser = await User.create({ ...request.body });
    response.status(200).send(madeUser);
  } catch (err) {
    response.status(500).send('server error');
  }
    }
  })
}

module.exports = createUser;
