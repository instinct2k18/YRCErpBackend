const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FinancialYear = require('./financial_year');
const University = require('./university');
const District = require('./district');

const collegeSchema = mongoose.Schema({
    yrc_reg_no: { type: String, required: true },
    college_name: { type: String, required: true},
    address: { type: String, required: true},
    program_officer: { type: String, required: true},
    contact_no: { type: Number, required: true},
    email: { type: String, required: true},
    registered_financial_year: { type: Schema.Types.ObjectId, ref: 'FinancialYear'},
    affiliation: { type: Schema.Types.ObjectId, ref: 'University'},
    district:  { type: Schema.Types.ObjectId, ref: 'District'}
});

module.exports = mongoose.model('College', collegeSchema);