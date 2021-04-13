const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const url = "mongodb+srv://ManuSE:Admin1@cluster0.mbbyj.mongodb.net/usersDB?retryWrites=true&w=majority";
const user = require('../models/user_model');


router.use(express.urlencoded({ extended: true }));

// Handling the GET requests
router.get('/:name/:pass', (req, res) => {
    
    // Get the ULR parameters 
    let userName = req.params.name;
    let userPass = req.params.pass;

    try {
        // MongoDB connection to check if the user exists and log him in
        async function run() {

            // Stablish connection with Mongo via mongoose
            mongoose.connect(url, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            });
            
            // defining the user schema and model from:        
            const User = user;  // models/user_model.js
            

            // Check if the user already exists in the collection
            await User.find({ 
                name: userName,
                password: userPass
            }, 
            
            (err, data) => {
                if (err) throw err;

                // Send '404 not found' error message if the user is not registered
                if (data.length === 0) {
                    res.status(404).json({
                        message: '404 not found'
                    });
                    res.end();
                }

                // If the user is in the DB, then send an 'accepted' message
                else {
                    res.status(202).json({
                        message: 'Accepted'
                    });
                    console.log(userName + ' loged in');
                    res.end();
                }
            }); 
            

            
            // Check if either the user is a Student or a Professor and register it
        }
        // Run the connection
        run();
    }
        
    // In case that's any error, throw it
    catch (e) {
        console.log(e);
    }
});

module.exports = router;