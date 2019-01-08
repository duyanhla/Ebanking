var db = require('../db/db');
 
exports.newNoti = (title, content) => {
    var sql = `insert into notifications(title, content) values('${title}', '${content}')`;
    return db.insert(sql);
}
 
exports.load = id => {
    var sql = `select * from notifications where id = '${id}'`;
    return db.load(sql);
};

exports.all = () => {
    var sql = `select * from notifications`;
    return db.load(sql);
}