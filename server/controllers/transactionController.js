var express = require('express'),
    axios = require('axios');
var transRepo = require('../repos/transactionRepo');

var router = express.Router();


router.post('/', (req, res) => {
    transRepo.newTransaction(req.body) .then(affectedRows => {
        res.json({
            msg: 'success'
        });
    })
    .catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });
});

module.exports = router;