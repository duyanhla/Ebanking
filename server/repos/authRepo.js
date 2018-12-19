var randtoken = require('rand-token'),
    jwt = require('jsonwebtoken'),
    moment = require('moment');

var db = require('../db/db'),
    opts = require('../db/opts');

//
// acccess-token

exports.generateAccessToken = userObj => {
    var payload = {
        user: userObj,
        info: 'more info for you'
    };
    var token = jwt.sign(payload, opts.ACCESS_TOKEN.SECRET_KEY, {
        expiresIn: opts.ACCESS_TOKEN.LIFETIME
    });
    return token;
};

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, opts.ACCESS_TOKEN.SECRET_KEY, (err, payload) => {
            if (err) {
                res.statusCode = 401;
                res.json({
                    msg: 'unauthorized',
                    error: err
                });
            } else {
                req.token_payload = payload;
                next();
            }
        });
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'token not found'
        });
    }
};

//
// refresh-token

exports.generateRefreshToken = () => {
    return randtoken.generate(opts.REFRESH_TOKEN.SIZE);
};

exports.updateRefreshToken = (id, refreshToken) => {
    return new Promise((resolve, reject) => {
        var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
        var sql = `delete from userRefreshTokenExt where userID = ${id}`;
        db.delete(sql)
            .then(affectedRows => {
                sql = `insert into userRefreshTokenExt values(${id}, '${refreshToken}', '${rdt}')`;
                return db.insert(sql);
            })
            .then(insert_id => {
                resolve(true);
            })
            .catch(err => reject(err));
    });
}

exports.verifyRefreshToken = refreshToken => {
    var sql = `select * from userRefreshTokenExt where refreshToken = '${refreshToken}'`;
    return db.load(sql);
}

exports.deleteRefreshToken = id => {
    var sql = `delete from userRefreshTokenExt where userID = ${id}`;
    return db.delete(sql);
}