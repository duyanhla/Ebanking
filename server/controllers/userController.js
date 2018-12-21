var express = require('express'),
    axios = require('axios');

var userRepo = require('../repos/userRepo'),
    authRepo = require('../repos/authRepo');

var router = express.Router();

// add user
router.post('/', (req, res) => {
    userRepo.allUser().then(usernames => {
        if (usernames.some(u => u.Username === req.body.Username)) {
            res.statusCode = 422;
            res.json({
                'msg': 'Username is already exist'
            });
        } else {
            userRepo.addUser(req.body)
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
    });
});

// verify captcha
router.post('/captcha', (req, res) => {
    var secret = '6LcBUoEUAAAAAOVVcSWWgnclx3SOd15iWcoj2-Yd';
    var captcha_response = req.body['g_recaptcha_response'];
    var url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha_response}`;
    axios.post(url, {
            // secret: _secret,
            // response: captcha_response
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
            }
        })
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            res.end('fail');
        });
});

// login
router.post('/login', (req, res) => {
    userRepo.login(req.body)
        .then(userObj => {
            if (userObj) {
                var token = authRepo.generateAccessToken(userObj);
                var refreshToken = authRepo.generateRefreshToken();
                authRepo.updateRefreshToken(userObj.Id, refreshToken)
                    .then(rs => {
                        res.setHeader('x-access-token', token);
                        res.json({
                            auth: true,
                            user: userObj,
                            access_token: token,
                            refresh_token: refreshToken
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.statusCode = 500;
                        res.end('View error log on console.');
                    });
            } else {
                res.statusCode = 401;
                res.json({
                    auth: false
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('View error log on console.');
        });
});

// refresh token
router.post('/renew-token', (req, res) => {
    var rToken = req.body.refreshToken;
    authRepo.verifyRefreshToken(rToken)
        .then(rows => {
            if (rows.length === 0) {
                res.statusCode = 400;
                res.json({
                    msg: 'invalid refresh-token'
                });

                throw new Error('abort-chain'); // break promise chain

            } else {
                return rows[0].userId;
            }
        })
        .then(id => userRepo.load(id))
        .then(rows => {
            var userObj = rows[0];
            var token = authRepo.generateAccessToken(userObj);
            res.json({
                access_token: token
            });
        })
        .catch(err => {
            if (err.message !== 'abort-chain') {
                console.log(err);
                res.statusCode = 500;
                res.end('View error log on console.');
            }
        });
});

// logout
router.post('/logout', authRepo.verifyAccessToken, (req, res) => {
    var user = req.token_payload.user;
    authRepo.deleteRefreshToken(user.Id)
        .then(affectedRows => {
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