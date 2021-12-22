'use strict';
const User = require('../models/userModel.js');
  
  
  
async function updateUser(req, res) {
  // verifyUser(req, async (err, user) => {
  //   if (err) {
  //     res.send('Invalid Token');
  //   } else { 
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true, overwrite: false });
    res.status(200).send(updatedUser);
  } catch (e) {
    res.status(500).send('Server Error');
  }
    //}
  //})
}

module.exports = updateUser;