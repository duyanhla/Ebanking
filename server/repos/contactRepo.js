var db = require('../db/db');

exports.addContact = contact => {
    var sql = `insert into listReceived(CardId, Name, UserId) values('${contact.CardId}', '${contact.Name}', '${contact.UserId}')`;
    return db.insert(sql);
};

exports.getContactById = userId => {
    var sql = `select * from listReceived where UserId = '${userId}'`;
    return db.load(sql);
};

exports.load = id => {
    var sql = `select * from listReceived where Id = '${id}'`;
    return db.load(sql);
};

exports.allContact = () => {
    var sql = `select * from listReceived`;
    return db.load(sql);
};

exports.deleteContact = (contactId) => {
    var sql = `delete from listReceived where Id = '${contactId}'`;
    return db.delete(sql);
};

exports.checkContactExistInUser = (userId, cardId) => {
    var sql = `select * from listReceived where UserId = '${userId}' and CardId = '${cardId}'`;
    return db.load(sql);
}