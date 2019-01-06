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
    var sql = `select * from transactions where (SrcCardId = '${cardId}' or DesCardId = '${cardId}') and Status = 'Confirmed' and CreatedTime BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW()`;
    return db.load(sql);
};


exports.allTransactionsByUserId = userId => {
    var sql = `select distinct t.* from transactions t join cards c on (c.Id = t.SrcCardId  or c.Id = t.DesCardId) join  users u on u.Id = c.UserId where u.Id = '${userId}' and t.Status = 'Confirmed' and t.CreatedTime BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW()`;
    return db.load(sql);
};

exports.confirmTrans = transId => {
    var sql = `update transactions set Status = 'Confirmed' where Id = '${transId}'`;
    return db.insert(sql);
}

exports.single = transId => {
    var sql = `select * from transactions where Id = '${transId}'`;
    return db.load(sql);
}