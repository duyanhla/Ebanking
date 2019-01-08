var db = require('../db/db');
var md5 = require('crypto-js/md5');

exports.addUser = user => {
    // var md5_pwd = md5(user.Password);
    // generate password by: 4 last-digits of phone numbers + '@' + year of DOB + '^'
    // ex: - phone: 0123456789
    //     - DOB: 1997-12-25 (YYYY-MM-DD)
    // => password: 6789@1997^
    var md5_pwd = md5(user.Phone.substring(6) + '@' + user.DOB.substring(0, 4) + '^');
    var sql = `insert into users(Username, Password, Name, Email, Phone, DOB, Permission) values('${user.Username}', '${md5_pwd}', '${user.Name}', '${user.Email}', '${user.Phone}', '${user.DOB}', '${user.Permission}')`;
    return db.insert(sql);
};

exports.login = user => {
    return new Promise((resolve, reject) => {
        var md5_pwd = md5(user.Password);
        var sql = `select * from users where Username = '${user.Username}' and Password = '${md5_pwd}'`;
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
    var sql = `select Id, Username, Name, Email, Phone, DOB from users where Permission = 0`;
    return db.load(sql);
};

exports.receiver = cardId => 
{
    var sql = `select Name,Phone,Email from users inner join cards on users.Id = cards.UserId where cards.Id = '${cardId}' and cards.IsClosed = 0`; 
    return db.load(sql);
};

exports.getUserId = userName => {
    var sql = `select * from users where Username = '${userName}'`;
    return db.load(sql);
}

exports.getEmailSubcriber = () => {
    var sql = `select Email from users where Permission = 0 and isSubcribe = 1`;
    return db.load(sql);
}

exports.subcribe = (uid) => {
    var sql = `update users set isSubcribe = 1 where Id = ${uid}`;
    return db.insert(sql);
}

exports.unsubcribe = (uid) => {
    var sql = `update users set isSubcribe = 0 where Id = ${uid}`;
    return db.insert(sql);
}