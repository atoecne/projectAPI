const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const account = new Schema({
    username: String,
    password: String,
    role: String
}, {
    collection: 'Account'
});

const AccountModel = mongoose.model('account', account);

module.exports = AccountModel   