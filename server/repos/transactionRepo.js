var db = require('../db/db');

exports.newTransaction =transaction =>
{
    var sql = `insert into transactions(Money, SrcCardId, DesCardId, Message, Status) values('${transaction.Money}', '${transaction.SrcCardId}', '${transaction.DesCardId}', '${transaction.Message}', 'Processing')`;
    return db.insert(sql);
}
