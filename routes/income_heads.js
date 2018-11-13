const express = require('express');

const IncomeHead = require('../models/income_heads');
const auth = require('../middleware/auth-check');

const router = express.Router();

router.post("", (req, res, next) => {
    const incomeHeads = new IncomeHead({
        college_name: req.body.college_name,
        college_registration_fee: req.body.college_registration_fee,
        student_membership_fee: req.body.student_membership_fee,
        academic_year: req.body.academic_year,
        financial_year: req.body.financial_year
    });
    incomeHeads.save();
    res.status(201).json({
        message: "Income Head added successfully"
    });
});

router.get("", auth, (req,res, next) => {
    IncomeHead.find()
        .then(documents => {
            res.status(200).json({
                message: 'Income Heads fetched successfully',
                incomeHead: documents
            });
        })
});

module.exports = router;