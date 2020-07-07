"use strict";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRouter = require('./backend_modules/api_router.js');

// globals
const port = 8000;
const app = express();
const static_directory = path.join(__dirname, 'public');

// middlewares: always active
app.use(express.static(static_directory))
app.use(bodyParser.json());
// router must always be the last middleware !!!
app.use('/api/', apiRouter);


// start the server
function serverNotify() {
	console.log('Starting server on Port ', port);
}
const server = app.listen(port, serverNotify);