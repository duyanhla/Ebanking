var db = require('../db/db');
var md5 = require('crypto-js/md5');

exports.addUser = user => {
    var md5_pwd = md5(user.Password);
    var sql = `insert into users(Username, Password, Name, Email, Phone, DOB, Permission) values('${user.Username}', '${md5_pwd}', '${user.Name}', '${user.Email}', '${user.Phone}', '${user.DOB}', '${user.Permission}')`;
    return db.insert(sql);
};

exports.login = user => {
    return new Promise((resolve, reject) => {
        var md5_pwd = md5(user.Password);
        var sql = `select * from users where Username = '${user.Username}' and Password = '${md5_pwd}' and Permission = '${user.Permission}'`;
        db.load(sql)
            .then(rows => {
                if (rows.length === 0) {
                    resolve(null);
                } else {
                    var user = rows[0];
                    resolve(user);
                }
            })
            .catch(err => reject(err));
    });
};

exports.load = id => {
    var sql = `select * from users where Id = '${id}'`;
    return db.load(sql);
};

exports.update = user => {
    var sql = `update users set Password='${user.Password}', Name='${user.Name}', Email='${user.Email}', Phone='${user.Phone}' , DOB='${user.DOB}' where Id = ${user.Id}`;
    return db.insert(sql);
};

exports.allUser = () => {
    var sql = `select Username from users`;
    return db.load(sql);
};