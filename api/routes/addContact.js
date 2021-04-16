// Import NPM modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const url = "mongodb+srv://ManuSE:Admin1@cluster0.mbbyj.mongodb.net/usersDB?retryWrites=true&w=majority";
const user = require('../models/user_model');

router.use(express.urlencoded({ extended: true }));

// Handling GET requests
router.post('/:name/:contactName/:contactNumber/:contactEmail', (req, res, next) => {    

    let userName = req.params.name;
    
    let contactInfo = { 
        name: req.params.contactName,
        number: req.params.contactNumber,
        email: req.params.contactEmail
    }     

    try {
        async function run () {

            mongoose.connect(url, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            });
    
            const User = user;
    
            await User.updateOne({
                name: userName
            }, 
            
            // Add the contact to the contact list in the database
            {
                $addToSet: { contacts: { contactInfo } }
            },
            
            (err, result) => {
                if (err) throw err;
                console.log(result.nModified)
    
                switch (result.nModified) {
    
                    // Send '500' error message and status if the contact already exists
                    case 0: {                    
                        res.status(500).json({
                            message: 'Contact already registered'
                        });
                        break;
                    }
    
                    // Send '202' status and a 'succes' message if the contact was correctly added
                    case 1: {
                        res.status(202).json({
                            message: 'Contact added succesfuly'
                        });
                        break;
                    }
                }            
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
