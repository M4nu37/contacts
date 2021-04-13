const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.use(express.urlencoded({ extended: true }))

router.post('/', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'classworkbot@gmail.com',
            pass: 'CwB200337'
        }
    });

    let name = req.body.name;
    let email = req.body.email;
    let text = req.body.text;

    const mailOptions = {
        from: `ClassWorkBot@gmail.com`,
        to: 'manuelsamexposito@gmail.com',
        subject: 'Contact the developer - ' + name,
        text: 'Email: '+ email +'\n\n'+ text
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Email sent!');
            res.redirect('index.html');
        }
    });
});

module.exports = router;