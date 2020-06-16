const express = require('express');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config({path: './.env'});
const db = require('./database')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()); // for parsing application/json

app.post('/create_link', (req, res) => {
    const { user_id, redirect_url } = req.body;
    var select_sql = `
        SELECT * FROM links where USER_ID = ?
    `
    db.query(select_sql, [user_id], (error, results) => {
        if(error){
            res.status(400).send(error);
            console.error(error);
        }
        if(results[0]) res.send(
            JSON.stringify(results[0].redirect_url)
        )
        
        else {
            var insert_sql = `
                INSERT INTO links (user_id, redirect_url)
                VALUES( ${db.escape(user_id)}, ${redirect_url} )
            `
            db.query(insert_sql, (error, results, fields) => {
                if(error){
                    res.status(400).send(error)
                    // console.error(error);
                }
                console.log(results);
                res.send(redirect_url);
            })
        }
    })

})

app.get('/referral/:user_id', (req, res) => {
    const { user_id } = req.params;
    
    var update_sql = `
        UPDATE links
        SET clicks = clicks + 1
        WHERE USER_ID = ?
    `
    var select_sql = `
        SELECT * FROM links
        WHERE USER_ID = ?
        LIMIT 1
    `
    db.query(update_sql, [user_id], (error, insertResults) => {
        db.query(select_sql, [user_id], (error, selectResults) => {
            res.redirect(selectResults[0].redirect_url);
        });
    });
});

app.get('/referral/conversion/:user_id', (req, res) => {
    const { user_id } = req.params;

    var update_sql = `
        UPDATE links
        SET conversions = conversions + 1
        WHERE USER_ID = ?
    `
    db.query(update_sql, [user_id], (error, insertResults) => {
        res.status(300).end();
    })

})

app.listen(PORT, () => {
    console.log('Referral API server is running on PORT:', PORT);
})