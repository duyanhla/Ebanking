var express = require('express'),
    axios = require('axios');
var cardRepo = require('../repos/cardRepo');

var router = express.Router();

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

module.exports = router;