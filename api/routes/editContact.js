// Import NPM modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const url = "mongodb+srv://ManuSE:Admin1@cluster0.mbbyj.mongodb.net/usersDB?retryWrites=true&w=majority";
const user = require('../models/user_model');

router.use(express.urlencoded({ extended: true }));

// Handling POST requests
router.post('/:name/:contactName/:contactNumber/:contactEmail/:position', (req, res, next) => {    

    // Define the information of the user and the contact whose going to be edited
    let userName = req.params.name;
    let position = 'contacts.' + req.params.position;

    let contactInfo = { 
        name: req.params.contactName,
        number: req.params.contactNumber,
        email: req.params.contactEmail
    }     

    try {
        async function run () {

            // Stablish connection with Mongo via mongoose
            mongoose.connect(url, {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            });
            
            // defining the user schema and model from:
            const User = user; // models/user_model.js
    
            // Find the user
            await User.updateOne({
                name: userName
            }, 
            
            // Edit the contact whose information fulfill the inputed
            {
                $set: { [position]: { contactInfo: contactInfo } }
            },
            
            (err, result) => {
                if (err) throw err;
                console.log(result.nModified)
    
                switch (result.nModified) {
    
                    // Send '500' error message and status if there was no change
                    case 0: {                    
                        res.status(500).json({
                            message: 'Nothing was updated'
                        });
                        break;
                    }
    
                    // Send '202' status and a 'succes' message if the contact was correctly edited
                    case 1: {
                        res.status(202).json({
                            message: 'Contact updated succesfuly'
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
