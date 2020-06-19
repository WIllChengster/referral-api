const express = require('express');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config({ path: './.env' });
const db = require('./database')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()); // for parsing application/json

app.post('/create_link', (req, res) => {
    const { user_id, redirect_url } = req.body;
    var select_sql = `
        SELECT * FROM links where USER_ID = ?
    `


    const query = async () => {
        let queryPromise = new Promise((resolve, reject) => {
            db.query(select_sql, [user_id], (error, results) => {
                if (error) {
                    console.error(error);
                    reject(false);
                }
                if (results[0]) {
                    resolve(results[0].redirect_url)
                } else {
                    resolve(false);
                }
            })
        })
        let result = await queryPromise;

        var insert_sql = `
                INSERT INTO links (user_id, redirect_url, referral_url)
                VALUES( ${db.escape(user_id)}, ${db.escape(redirect_url)}, 
                        ${db.escape(process.env.DOMAIN + '/referral/' + user_id)} )
            `
        if (!result) {
            db.query(insert_sql, (error, results, fields) => {
                if (error) {
                    res.status(400).send(error)
                    console.error(error);
                }
                console.log(results);
                res.send(redirect_url);
            })
        } else {
            res.send(query)
        }

    }
    query();

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
            if (!selectResults[0]) {
                res.send('Link not found!')
            }
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