'use strict';

require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const handleGetEvents = require ('./modules/getEvents');

app.get('/events', handleGetEvents); // retrieves data
// app.post(); // creates data
// app.delete(); // deletes data
// app.put(); // updates data


app.listen(PORT, () => console.log('listening on port: ' + PORT))