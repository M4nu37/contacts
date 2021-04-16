const express = require('express');
const app = express();

// Import routes
const registerRoute = require('./api/routes/register');
const loginRoute = require('./api/routes/login');
const emailRoute = require('./api/routes/email');
const mainRoute = require('./api/routes/main');
const addContactRoute = require('./api/routes/addContact');
const deleteContactRoute = require('./api/routes/deleteContact');
const editContactRoute = require('./api/routes/editContact');


// Use the routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/sendMail', emailRoute);
app.use('/main', mainRoute);
app.use('/addContact', addContactRoute);
app.use('/deleteContact', deleteContactRoute);
app.use('/editContact', editContactRoute);

module.exports = app;
