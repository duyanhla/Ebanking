var express = require('express');
var transRepo = require('../repos/transactionRepo');
var otpRepo = require('../repos/otpRepo');
var transfer = require('../db/opts').TRANSFER;
var nodemailer = require('nodemailer');
var router = express.Router();
 
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "minhanpro123@gmail.com",
        pass: "anhyeuem1997?"
    }
});
 
 
router.post('/', (req, res) => {
    transRepo.newTransaction(req.body) .then(affectedRows => {
        var otp = (""+Math.random()).substring(2,8);
        var user = req.token_payload.user;
        const mailOptions = {
            to: user.Email, // list of receivers
            subject: 'Xác nhận chuyển khoản', // Subject line
            html: `<p>Your OTP here: ${otp}</p>`// plain text body
        };
        smtpTransport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
                otpRepo.newOTP(otp, affectedRows).then(otpIdRow => {
                    res.json({
                        transId: affectedRows,
                        msg: 'success'
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });
});

router.get('/history', (req, res) => {
    var cardId= req.query.cardId;
    transRepo.getTransactionByCardId(cardId).then(data => {
        res.statusCode = 200;
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    })
});

router.get('/me', (req, res) => {
    var userId= req.token_payload.user.Id;
    transRepo.allTransactionsByUserId(userId).then(data => {
        res.statusCode = 200;
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    })
});


module.exports = router;