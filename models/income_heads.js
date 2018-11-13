const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AcademicYear = require('./academic_year');
const FinancialYear = require('./financial_year');
const College = require('./college');

const incomeHeadSchema = mongoose.Schema({
    college_name: { type: Schema.Types.ObjectId, ref: 'College'},
    college_registration_fee: { type: String, required: true },
    student_membership_fee: { type: String, required: true},
    academic_year: { type: Schema.Types.ObjectId, ref: 'AcademicYear'},
    financial_year: { type: Schema.Types.ObjectId, ref: 'FinancialYear'}
});

module.exports = mongoose.model('IncomeHead', incomeHeadSchema);