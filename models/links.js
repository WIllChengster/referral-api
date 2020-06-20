const mongoose = require('mongoose');

const links = new mongoose.Schema({
    user_id: {type: String, default: null},
    clicks: {type: Number, default: 0},
    conversions: {type: Number, default: 0},
    redirect_url: {type: String, default: null},
    referral_url: {type: String, default: null},
})

module.exports = mongoose.model('links', links);