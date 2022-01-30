const mysql = require('mysql2')
require('dotenv').config()
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port : '3306',
});

module.exports = db; 