const express = require('express');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config({ path: './.env' });
const app = express();

const mongoose = require('mongoose');
const links = require('./models/links');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then( () => {
    console.log('Connected to MongoDB')
});

app.post('/create_link', (req, res) => {
    const { user_id, redirect_url } = req.body;
    links.findOne({user_id}, (err, link) => {
        if(link){
            res.send(link.referral_url)
        } else {
            links.create({
                user_id,
                redirect_url,
                referral_url: `${process.env.DOMAIN}/referral/l/${user_id}`
            }, (err, link) => {
                if(err){
                    console.error(err);
                    return err;
                }
                res.send(link.referral_url);
            })
        }
    })

})


app.get('/referral/l/:user_id', (req, res) => {
    const { user_id } = req.params;

    links.findOne({user_id}, (err, link) => {
        link.clicks += 1;
        link.save( () => {
            res.redirect(link.redirect_url);
        } )
    })

});


app.get('/referral/conversion/:user_id', (req, res) => {
    const { user_id } = req.params;

    links.findOne({user_id}, (err, link) => {
        link.conversions += 1;
        links.save( () => {
            res.send(link.conversions);
        })
    })

})


app.listen(PORT, () => {
    console.log('Referral API server is running on PORT:', PORT);
})