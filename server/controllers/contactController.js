var express = require('express');
var contactRepo = require('../repos/contactRepo');
var cardRepo = require('../repos/cardRepo');
var router = express.Router();

// add new contact
router.post('/', (req, res) => {
    cardRepo.load(req.body.CardId).then(card => {
        if (card.length == 0) {
            res.statusCode = 404;
            res.json({'msg': 'Not Found Card'});   
        } else {
            var uid = req.token_payload.user.Id;
            contactRepo.checkContactExistInUser(uid, card[0].Id).then(contact => {
                if (contact.length == 0) {
                    if (req.body.Name == '') {
                        req.body.Name = req.token_payload.user.Name;
                    }
                    req.body.UserId = uid;
                    contactRepo.addContact(req.body).then(insertId => {
                        res.statusCode = 201;
                        res.json(req.body);
                    }).catch(err => {
                        console.log(err);
                        res.statusCode = 500;
                        res.end();
                    });
                } else {
                    res.statusCode = 422;
                    res.json({
                        'msg': `Contact with ${contact.CardId} is already exist`
                    });
                }
            }).catch(err => {
                console.log(err);
                res.statusCode = 500;
                res.end();
            })
        }
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end('View error log on console.');
    });
});

// get all contact by user id
router.get('/me', (req, res) => {
    var uid = req.token_payload.user.Id;
    contactRepo.getContactById(uid).then(contacts => {
        res.statusCode = 200;
        res.json(contacts);
    }).catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end();
    });
});

// delete contact
router.delete('/', (req, res) => {
    var uid = req.token_payload.user.Id;
    if (uid == req.body.UserId) {
        contactRepo.deleteContact(req.body.Id).then(contacts => {
            res.statusCode = 200;
            res.json(contacts);
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end();
        });
    } else {
        res.statusCode = 401;
        res.json({
            msg: 'Access denied'
        });
    }
});

module.exports = router;