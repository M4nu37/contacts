const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const url = "mongodb+srv://ManuSE:Admin1@cluster0.mbbyj.mongodb.net/usersDB?retryWrites=true&w=majority";
const user = require('../models/user_model');

router.use(express.urlencoded({ extended: true }));

// Handling DELETE requests
router.delete('/:name/:contactName/:contactNumber/:contactEmail', (req, res, next) => {
    
    // Get the ULR parameters
    let userName = req.params.name;
    
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
            
            // Remove the contact to the contact list in the database
            {
                $pull: { contacts: { contactInfo: contactInfo  } }
            },
            
            (err, result) => {
                if (err) throw err;
                console.log(result.nModified)
    
                switch (result.nModified) {
    
                    // Send '404' error message and status if the contact is not found in the DB
                    case 0: {                    
                        res.status(404).json({
                            message: 'No contact was found'
                        });
                        break;
                    }
    
                    // Send '200' status and a 'ok' message if the contact was correctly deleted
                    case 1: {
                        res.status(200).json({
                            message: 'Contact deleted succesfuly'
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
