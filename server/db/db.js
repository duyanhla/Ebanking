var mysql = require('mysql');

//connection
var createConnection = () => {
    return mysql.createConnection({
        host: '35.197.150.36',
        port: 3306,
        user: 'root',
        password: 'dbrealtime',
        database: 'dbrealtime'
    });
};

exports.load = function(sql) {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, rows, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }

            cn.end();
        });
    });
};

exports.insert = function(sql) {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value.insertId);
            }

            cn.end();
        });
    });
};

exports.delete = function(sql) {
    return new Promise((resolve, reject) => {
        var cn = createConnection();
        cn.connect();
        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value.affectedRows);
            }

            cn.end();
        });
    });
};