'use strict';
const User = require('../models/userModel.js');


async function deleteUser(req, res) {   
  // verifyUser(req, async (err, user) => {
  //   if (err) {
  //     res.send('Invalid Token');
  //   } else {
      const { id } = req.params;
      console.log('deleteUser: ', id);

      try {
        const user = await User.findOne({ _id: id})
        if(!user){
          res.status(400).send('Unable to delete user');
        } else {
          await User.findByIdAndDelete(id);
          res.status(204).send('User successfully deleted')
        }      
    } catch (e) {
      res.status(500).send('Server Error');
    }
//   }
// })
}

module.exports = deleteUser;