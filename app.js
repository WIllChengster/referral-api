const express = require('express');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config({path: './.env'});
const db = require('./database')
const app = express();

app.use(bodyParser.urlencoded({extended: false}))

app.post('/create_link', (req, res) => {
    const { user_id } = req.body;
    var sql = `
        INSERT INTO links (user_id)
        VALUES( ${db.escape(user_id)} )
    `
    db.query(sql, (error, results, fields) => {
        console.log (error, results, fields);
    })
})

app.listen(PORT, () => {
    console.log('Referral API server is running on PORT:', PORT);
})