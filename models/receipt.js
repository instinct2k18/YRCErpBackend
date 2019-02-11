const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const receiptSchema = mongoose.Schema({ 
    receipt_no : { type: String, required: true},
    receipt_enclosed_date : { type: String, required: true},
    voucher_no: { type: String, required: true},
    college_name: { type: Schema.Types.ObjectId, ref: 'College'},
    fee: { type: String, required: true},
    income_head : { type: Schema.Types.ObjectId, ref: 'IncomeHead'},
    financial_year: { type: Schema.Types.ObjectId, ref: 'FinancialYear'},
    academic_year: { type: Schema.Types.ObjectId, ref: 'AcademicYear'},
    received_date: { type: String, required: true },
    bank_details: { type: String, required: true },
    student_count: { type: String }
});

module.exports = mongoose.model('Receipt', receiptSchema);