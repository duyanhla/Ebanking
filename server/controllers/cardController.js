var express = require('express');
var cardRepo = require('../repos/cardRepo');
var transfer = require('../db/opts').TRANSFER;
var nodemailer = require('nodemailer');
var moment = require('moment');
var genOtp = require('otp-generator');
var authRepo = require('../repos/authRepo');
var userRepo = require('../repos/userRepo');

var router = express.Router();

// add card
router.post('/', (req, res) => {
    var user = req.token_payload.user;
    cardRepo.addCard(user.Id)
        .then(insertId => {
            res.statusCode = 201;
            res.json(req.body);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
});

// add card by admin
router.post('/add', (req, res) => {
    var per = req.token_payload.user.Permission;
    if (per !== 0) {
        var userName = req.body.userName;
        userRepo.getUserId(userName)
        .then(user => {
            cardRepo.addCard(user[0].Id)
            .then(insertId => {
                res.statusCode = 201;
                res.json(req.body);
            })
            .catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end();
            });
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        })
    }
    else {
        console.log("Not admin");
        res.statusCode = 500;
        res.end();
    }
});

// update card by admin
router.post('/update', (req, res) => {
    var per = req.token_payload.user.Permission;
    if (per !== 0) {
        var cardId = req.body.cardId;
        var money = req.body.money;
        cardRepo.updateMoney(cardId, money)
        .then(insertId => {
            res.statusCode = 201;
            res.json(req.body);
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
    }
    else {
        console.log("Not admin");
        res.statusCode = 500;
        res.end();
    }
});

// get card 
router.get('/', (req, res) => {
    var per = req.token_payload.user.Permission;
    if (per !== 0) {
        var cardId = req.query.cardId;
        cardRepo.loadUser(cardId).then(rows => {
            res.statusCode = 200;
            res.json(rows);
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
    }
    else {
        console.log("Not admin");
        res.statusCode = 500;
        res.end();
    }
});

// get all card
router.get('/me', (req, res) => {
    var uid = req.token_payload.user.Id;
    cardRepo.cardByUser(uid).then(cards => {
        res.statusCode = 200;
        res.json(cards);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end();
    });
});

// get all open card
router.get('/me/open', (req, res) => {
    var uid = req.token_payload.user.Id;
    cardRepo.openCardByUser(uid).then(cards => {
        res.statusCode = 200;
        res.json(cards);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end();
    });
});

// get all card, user
router.get('/all', (req, res) => {
    var per = req.token_payload.user.Permission;
    if (per !== 0) {
        cardRepo.loadAllUser().then(cards => {
            res.statusCode = 200;
            res.json(cards);
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
    }
    else {
        console.log("Not admin");
        res.statusCode = 500;
        res.end();
    }
});

// close card
router.post('/close', (req, res) => {
    var cardId = req.body.cardId;
    cardRepo.closeCard(cardId).then(cards => {
        res.statusCode = 200;
        res.json(cards);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end();
    });
});

router.post('/otp', (req, res) => {
    
});

router.post('/transfer', (req, res) => {
    var srcId = req.body.srcId;
    var desId = req.body.desId;

    var money = +req.body.money;

    var sCard = cardRepo.load(srcId);
    var dCard = cardRepo.load(desId);

    var feeForSrc = req.body.feeForSrc;

    Promise.all([sCard, dCard]).then(([srcCard, desCard]) => {
        var realFee = parseInt(transfer.fee*money / 100);
        if (realFee > transfer.max) {
            realFee = transfer.max;
        } 
        if (realFee < transfer.min) {
            realFee = transfer.min;
        }

        var recieverMoney = feeForSrc ? money : money - realFee;
        var senderMoney = feeForSrc ? money + realFee : money;
        var updateDesCard = cardRepo.updateMoney(desCard[0].Id, desCard[0].Money + recieverMoney);
        var updateSrcCard = cardRepo.updateMoney(srcCard[0].Id, srcCard[0].Money - senderMoney);
        Promise.all([updateSrcCard, updateDesCard]).then(([idSrc, idDes]) => {
            res.statusCode = 200;
            res.json({
                'src': idSrc,
                'des': idDes
            });
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end();
    });
});

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "minhanpro123@gmail.com",
        pass: "anhyeuem1997?"
    }
});

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {
//     // setup email data with unicode symbols
//     let mailOptions = {
//         to: 'anleminh97@gmail.com', // list of receivers
//         subject: 'Hello ✔', // Subject line
//         text: 'Hello world?', // plain text body
//         html: '<b>Hello world?</b>' // html body
//     };

//     // send mail with defined transport object
//     smtpTransport.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//     });
// });

module.exports = router;