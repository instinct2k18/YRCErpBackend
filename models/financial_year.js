const mongoose = require('mongoose');

const financialYearSchema = mongoose.Schema({
    year: { type: String, required: true }
});

module.exports = mongoose.model('FinancialYear', financialYearSchema);