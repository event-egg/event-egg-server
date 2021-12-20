const mongoose = require('mongoose');
require('dotenv').config();
const Event = require('./modules/eventModel.js');
const User = require('./modules/userModel.js');

async function seed() {
  mongoose.connect(process.env.DB_URL);
  await Event.create({
    name: 'coffee with friends',
    startTime: '12/20/2021 1400', // TODO: possibly not a String, required
    endTime: '12/20/2022 1500', // not required
    address: '1234 This st', // TODO: is this better as location? URLs for virtual events?
    description: 'drinking coffee', // not required 
    link: 'https://www.google.com/search?q=coffee+with+friends&rlz=1C1VDKB_enUS935US935&sxsrf=AOaemvLpuxDRcIF6tGktgAIsA8nrFunn2g:1640032414304&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj-3-HrnPP0AhWKmWoFHTS0BEgQ_AUoAXoECBAQAw&biw=1858&bih=977&dpr=1#imgrc=yBDjU-BgawGhIM',
    image: 'thisidontcare.com'
  });
  console.log('coffee with friends');
  // new book
  await Event.create({
    name: 'coffee with enemies',
    startTime: '12/20/2023 1400', // TODO: possibly not a String, required
    endTime: '12/20/2022 1500', // not required
    address: '1234 This st', // TODO: is this better as location? URLs for virtual events?
    description: 'drinking coffee, and hating one another', // not required 
    link: 'https://www.google.com/search?q=coffee+with+friends&rlz=1C1VDKB_enUS935US935&sxsrf=AOaemvLpuxDRcIF6tGktgAIsA8nrFunn2g:1640032414304&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj-3-HrnPP0AhWKmWoFHTS0BEgQ_AUoAXoECBAQAw&biw=1858&bih=977&dpr=1#imgrc=yBDjU-BgawGhIM',
    image: 'thisidontcare.com'
  });
  console.log('coffee with enemies');
  mongoose.disconnect();
}

async function seedUser() {
  mongoose.connect(process.env.DB_URL_USER);
  await User.create({
    name: 'Daniel',
    email: 'daniel@gmail.com',
    defaultCity: 'Oceanside, CA',
    defaultInterests: ['videogames', 'cats', 'coffee'],
    savedEvents: ['coffee with friends', 'coffee with enemies']
  });
  console.log('"Daniel, created" - God');
  mongoose.disconnect();
}
seed();
seedUser();
// make sure server is NOT running
// in terminal go to project root
// type 'node seed.js'