const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const incomeHeadSchema = mongoose.Schema({
    income_head: { type: String, required: true}
});

module.exports = mongoose.model('IncomeHead', incomeHeadSchema);