var express = require('express');
var transRepo = require('../repos/transactionRepo');
var otpRepo = require('../repos/otpRepo');
var transfer = require('../db/opts').TRANSFER;
var nodemailer = require('nodemailer');
var cardRepo = require('../repos/cardRepo');
var contactRepo = require('../repos/contactRepo');


var router = express.Router();
 
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "minhanpro123@gmail.com",
        pass: "anhyeuem1997?214097#"
    }
});
 
router.post('/confirm', (req, res) => {
    var fee = +req.body.fee;
    var feeReceiver = req.body.feeReceiver;
    var transId = req.body.transId;
    var addContact = req.body.addContact;
    transRepo.single(transId).then(trans => {
        var srcCardId = trans[0].SrcCardId;
        var desCardId = trans[0].DesCardId;
        var srcCard = cardRepo.load(srcCardId);
        var desCard = cardRepo.loadCardUser(desCardId);
        Promise.all([srcCard, desCard]).then(([src, des]) => {
            src[0].Money = src[0].Money - trans[0].Money;
            des[0].Money = des[0].Money + trans[0].Money;
            if (feeReceiver == 'false') {
                src[0].Money = src[0].Money - fee;
            } else {
                des[0].Money = des[0].Money - fee;
            }
            var addcontact = {
                CardId: desCardId,
                Name: des[0].Name,
                UserId: req.token_payload.user.Id
            }; 
            var updateSrc = cardRepo.updateMoney(src[0].Id, src[0].Money);
            var updateDes = cardRepo.updateMoney(des[0].Id, des[0].Money);
            var updateTrans = transRepo.confirmTrans(trans[0].Id);
            var checkExContact =contactRepo.checkContactExistInUser(addcontact.UserId,desCardId);
            Promise.all([updateSrc, updateDes, updateTrans,checkExContact]).then(([idSrc, idDes, idTrans, idExContact]) => {
                if(idExContact.length === 0){
                    contactRepo.addContact(addcontact).then(idContact => { 
                    }).catch(err => {
                        console.log(err);
                    });
                }
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
            subject: 'FastPay - Mã xác nhận giao dịch', 
            html: `<h1>Xác nhận chuyển tiền</h1>
            <h4>Chào ${user.Username},</h4>
            <h4>Bạn đang thực hiện việc chuyển tiền, vui lòng nhập mã OTP sau để xác nhận:</h4>
            <h2>${otp}</h2>
            <h4>Mã xác nhận sẽ hết hạn sau 3 phút</h4><br>
            <h3>Nếu bạn không thực hiện giao dịch này, vui lòng kiểm tra lại tài khoản FastPay của mình</h3><br>
            <h3>Chúc bạn một ngày tốt lành,</h3>
            <h3>FastPay inc,</h3>
            `// plain text body
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