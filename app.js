const express = require('express');
const app = express();

// Import routes
const registerRoute = require('./api/routes/register');
const loginRoute = require('./api/routes/login');
const contactRoute = require('./api/routes/contact');
const mainRoute = require('./api/routes/main');
const addContactRoute = require('./api/routes/addContact');
const deleteContactRoute = require('./api/routes/deleteContact');


// Use the routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/sendMail', contactRoute);
app.use('/main', mainRoute);
app.use('/addContact', addContactRoute);
app.use('/deleteContact', deleteContactRoute);

module.exports = app;
