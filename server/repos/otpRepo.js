var db = require('../db/db');
 
exports.newOTP = (otp, transId) => {
    var sql = `insert into otp(otp, transactionId) values('${otp}', '${transId}')`;
    return db.insert(sql);
}
 
exports.load = id => {
    var sql = `select * from otp where transactionId = '${id}'`;
    return db.load(sql);
};