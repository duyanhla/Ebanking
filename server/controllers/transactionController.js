var express = require('express');
var transRepo = require('../repos/transactionRepo');
var otpRepo = require('../repos/otpRepo');
var transfer = require('../db/opts').TRANSFER;
var nodemailer = require('nodemailer');
var cardRepo = require('../repos/cardRepo');

var router = express.Router();
 
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "minhanpro123@gmail.com",
        pass: "anhyeuem1997?"
    }
});
 
router.post('/confirm', (req, res) => {
    var fee = +req.body.fee;
    var feeReceiver = req.body.feeReceiver;
    console.log(feeReceiver);
    console.log(typeof(feeReceiver));
    var transId = req.body.transId;
    transRepo.single(transId).then(trans => {
        var srcCardId = trans[0].SrcCardId;
        var desCardId = trans[0].DesCardId;
        var srcCard = cardRepo.load(srcCardId);
        var desCard = cardRepo.load(desCardId);
        Promise.all([srcCard, desCard]).then(([src, des]) => {
            src[0].Money = src[0].Money - trans[0].Money;
            des[0].Money = des[0].Money + trans[0].Money;
            if (feeReceiver) {
                des[0].Money = des[0].Money - fee;
            } else {
                src[0].Money = src[0].Money - fee;
            }
            var updateSrc = cardRepo.updateMoney(src[0].Id, src[0].Money);
            var updateDes = cardRepo.updateMoney(des[0].Id, des[0].Money);
            Promise.all([updateSrc, updateDes]).then(([idSrc, idDes]) => {
                res.json({
                    msg: 'success'
                });
            }).catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end('View error log on console.');
            })
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });
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