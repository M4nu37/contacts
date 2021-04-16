const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const url = "mongodb+srv://ManuSE:Admin1@cluster0.mbbyj.mongodb.net/usersDB?retryWrites=true&w=majority";
const user = require('../models/user_model');


router.use(express.urlencoded({ extended: true }));

// Handling POST requests
router.post('/:name/:pass', (req, res) => {
    
    // Get the ULR parameters 
    let userName = req.params.name;
    let userPass = req.params.pass;

    try {
        // MongoDB connection to insert the new user into the database
        async function run() {

            // Stablish connection with Mongo via mongoose
            mongoose.connect(url, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            });
            
            // Defining the user schema and model from:
            const User = user;  // models/user_model.js 
            

            // Check if the user already exists in the collection
            await User.find({ 
                name: userName,
                password: userPass
            }, 
            
            (err, data) => {
                if (err) throw err;

                console.log(data)

                // Insert the new user to the collection and send a 'created' message
                if (data.length === 0) {
                    User.create({ 
                        name: userName,
                        password: userPass,
                        contacts: []
                    });   
                    res.status(201).json({
                        message: 'User was created'
                    });
                    res.end();
                }
                
                // Send '500' error message and status if the user exists
                else {
                    res.status(500).json({
                        message: 'The user already exists'
                    });
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
