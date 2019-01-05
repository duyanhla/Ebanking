var express = require('express');
var transRepo = require('../repos/transactionRepo');
var otpRepo = require('../repos/otpRepo');
var otps = require('../db/opts');
var moment = require('moment');
var router = express.Router();
 
router.post('/', (req, res) => {
    var transId = req.body.transId;
    var otp = req.body.otp;
    var now = moment();
    otpRepo.load(transId).then(data => {
        if (data[0].otp != otp) {
            res.statusCode = 422;
            res.end('Wrong otp');
        } else {
            var expiration = moment(data[0].createdTime).add(otps.OTP.expried, 's');
            if (expiration >= now) {
                res.json({msg: 'success'});
            } else {
                res.statusCode = 401;
                res.json({msg: 'expired otp'})
            }
        }
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    })
});
 
module.exports = router;