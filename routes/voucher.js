const express = require('express');

const Voucher = require('../models/voucher');
const auth = require('../middleware/auth-check');

const router = express.Router();

router.post("", (req, res, next) => {
    const voucher = new Voucher({
        voucher_no: req.body.voucher_no,
        college_name: req.body.college_name,
        fee: req.body.fee,
        income_head: req.body.income_head,
        financial_year: req.body.financial_year,
        academic_year: req.body.academic_year,
        received_date: req.body.received_date,
        bank_details: req.body.bank_details,
        student_count: req.body.student_count
    });
    voucher.save();
    res.status(201).json({
        message: "Voucher added successfully"
    });
});

router.get("", auth, (req,res, next) => {
    Voucher.find()
        .then(documents => {
            res.status(200).json({
                message: 'Voucher fetched successfully',
                voucher: documents
            });
        });
});

module.exports = router;