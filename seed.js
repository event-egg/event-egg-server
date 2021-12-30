'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/eventModel.js');
const User = require('./models/userModel.js');

async function seed() {
  mongoose.connect(process.env.DB_URL);

  await User.create({
    name: 'Daniel',
    email: 'daniel@gmail.com',
    defaultCity: 'Oceanside, CA',
    defaultInterests: ['videogames', 'cats', 'coffee'],
    savedEvents: [
      {
        name: 'coffee with friends',
        startTime: '12/20/2021 1400',
        endTime: '12/20/2022 1500',
        address: '1234 This st',
        description: 'drinking coffee',
        link: 'https://www.google.com/search?q=coffee+with+friends&rlz=1C1VDKB_enUS935US935&sxsrf=AOaemvLpuxDRcIF6tGktgAIsA8nrFunn2g:1640032414304&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj-3-HrnPP0AhWKmWoFHTS0BEgQ_AUoAXoECBAQAw&biw=1858&bih=977&dpr=1#imgrc=yBDjU-BgawGhIM',
        image: 'thisidontcare.com'
      },
      {
        name: 'coffee with enemies',
        startTime: '12/20/2023 1400', // TODO: possibly not a String, required
        endTime: '12/20/2022 1500', // not required
        address: '1234 This st', // TODO: is this better as location? URLs for virtual events?
        description: 'drinking coffee, and hating one another', // not required
        link: 'https://www.google.com/search?q=coffee+with+friends&rlz=1C1VDKB_enUS935US935&sxsrf=AOaemvLpuxDRcIF6tGktgAIsA8nrFunn2g:1640032414304&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj-3-HrnPP0AhWKmWoFHTS0BEgQ_AUoAXoECBAQAw&biw=1858&bih=977&dpr=1#imgrc=yBDjU-BgawGhIM',
        image: 'thisidontcare.com'
      }
    ]
  });

  mongoose.disconnect();
}

seed();