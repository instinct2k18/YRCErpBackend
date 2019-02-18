const express = require('express');

const FinancialYear = require('../models/financial_year');
const auth = require('../middleware/auth-check');

const router = express.Router();

router.post("", (req, res, next) => {
    const fn_year = new FinancialYear({
        year: req.body.year
    });
    fn_year.save();
    res.status(201).json({
        message: "Year added successfully"
    });
});

router.get("", auth, (req, res, next) => {
    FinancialYear.find()
        .then(documents => {
            res.status(200).json({
                message: 'Financial Year fetched successfully',
                finYear: documents
            });
        });
});

router.put("/edit", auth, (req, res, next) => {
    FinancialYear.findByIdAndUpdate(req.body.id, { "year": req.body.year}, {new: true})
    .then(documents => {
        res.status(200).json({
            message: 'Financial Year updated successfully'
        });
    });;
});

router.delete("/delete", (req, res, next) => {
    FinancialYear.findOneAndDelete(req.query.id)
    .then(documents => {
        res.status(200).json({
            message: 'Financial Year deleted successfully'
        });
    });
});

module.exports = router;