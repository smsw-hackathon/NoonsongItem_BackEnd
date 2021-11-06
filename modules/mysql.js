const mysql = require('mysql2');
const config = require('../db.json');

const connection = mysql.createConnection({
    host: config.development.host,
    user: config.development.username,
    database: config.development.database,
    password: config.development.password,
    multipleStatements: true,
});

module.exports = connection;