const mysql = require('mysql');
const dotenv = require('dotenv').config({path: './.env'});
const fs = require('fs');
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_DATABASE,
    ssl  : {
        ca : fs.readFileSync(__dirname + '/mysql-ca.crt')
      }
});


module.exports = pool