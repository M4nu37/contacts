const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const url = "mongodb+srv://ManuSE:Admin1@cluster0.mbbyj.mongodb.net/usersDB?retryWrites=true&w=majority";
const user = require('../models/user_model');


// Hande GET requests for /main
router.get('/:name', (req, res) => {
    
    // Get the ULR parameters
    let userName = req.params.name;

    try {
        // MongoDB connection to get the user info
        async function run() {

            // Stablish connection with Mongo via mongoose
            mongoose.connect(url, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            });

            // defining the user schema and model from:
            const User = user;  // models/user_model.js


            // Find the user
            await User.find({ 
                name: userName,
            }, 
            
            (err, data) => {
                if (err) throw err;

                // Send a message with the user info
                res.status(200).json({
                    message: data
                });
            });
               
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