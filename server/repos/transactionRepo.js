var db = require('../db/db');

exports.newTransaction =transaction =>
{
    var sql = `insert into transactions(Money, SrcCardId, DesCardId, Message, Status) values('${transaction.Money}', '${transaction.SrcCardId}', '${transaction.DesCardId}', '${transaction.Message}', 'Processing')`;
    return db.insert(sql);
}

exports.allTransactions =() =>
{
    var sql=`select * from transactions`;
    return db.load(sql);
}

exports.getTransactionByCardId = cardId => {
    var sql = `select * from transactions where SrcCardId = '${cardId}' or DesCardId = '${cardId}'`;
    return db.load(sql);
};


exports.allTransactionsByUserId = userId => {
    var sql = `select t.* from transactions t join cards c on c.Id = t.SrcCardId  join  users u on u.Id = c.UserId where u.Id = '${userId}'`;
    return db.load(sql);
};