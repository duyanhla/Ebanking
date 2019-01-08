var express = require('express');
var nodemailer = require('nodemailer');
var notiRepo = require('../repos/notiRepo');
var userRepo = require('../repos/userRepo');
var router = express.Router();
var authRepo = require('../repos/authRepo');

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "fastpay.org@gmail.com",
        pass: "fastpay123"
    }
});

router.post('/', [authRepo.verifyAccessToken, authRepo.verifyAdmin], (req, res) => {
    var title = req.body.title;
    var content = req.body.content;
    notiRepo.newNoti(title, content).then(idNoti => {
        userRepo.getEmailSubcriber().then(mailRows => {
            var maillist = mailRows.map(a => a.Email);
            var mailOptions = {
                to: maillist, // list of receivers
                subject: 'FastPay - Thông báo', 
                html: `
                <h4>Chào bạn,</h4>
                <h4>FastPay xin thông báo về việc ${title}:</h4>
                <h4>${content}</h4><br>
                <h3>Chúc bạn một ngày tốt lành,</h3>
                <h3>FastPay inc,</h3>`
            };
            smtpTransport.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(info);
                    res.statusCode = 200;
                    res.json({msg: info});
                }
            })
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        })
        
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    })
});

router.get('/', [authRepo.verifyAccessToken, authRepo.verifyAdmin], (req, res) => {
    notiRepo.all().then(notiList => {
        res.statusCode = 200;
        res.json(notiList);        
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    })
});
 
module.exports = router;