var db = require('../db/db');
var cardGenerator = require('creditcard-generator');

exports.addCard = userId => {
    var cc = cardGenerator.GenCC("VISA");
    var sql = `insert into cards(Id, Money, UserId) values('${cc[0]}', '0', '${userId}')`;
    return db.insert(sql);
};

exports.updateMoney = (cardId, money) => {
    var sql = `update cards set Money = '${money}' where Id = '${cardId}'`;
    return db.insert(sql);
};

exports.closeCard = cardId => {
    var sql = `update cards set isClosed = 1 where Id = '${cardId}'`;
    return db.insert(sql);
};

exports.load = id => {
    var sql = `select * from cards where Id = '${id}'`;
    return db.load(sql);
};

exports.cardByUser = userId => {
    var sql = `select * from cards where UserId = '${userId}'`;
    return db.load(sql);
};