var opts = {
    ACCESS_TOKEN: {
        SECRET_KEY: 'secret',
        LIFETIME: 600 // in seconds
    },

    REFRESH_TOKEN: {
        SIZE: 80
    },

    OTP : {
        expried: 30 // second
    },

    TRANSFER: {
        fee: 0.05, // %
        max: 1000000,
        min: 10000
    },

    DB: {
        host: '35.197.150.36',
        port: 3306,
        user: 'root',
        password: 'dbrealtime',
        database: 'dbrealtime'
    }
};

module.exports = opts;