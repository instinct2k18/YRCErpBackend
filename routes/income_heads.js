const express = require('express');

const IncomeHead = require('../models/income_heads');
const auth = require('../middleware/auth-check');

const router = express.Router();

router.post("", (req, res, next) => {
    const incomeHeads = new IncomeHead({
        income_head: req.body.income_head
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

router.delete("/delete", (req, res, next) => {
    IncomeHead.findOneAndDelete(req.query.id)
    .then(documents => {
        res.status(200).json({
            message: 'Income Head deleted successfully'
        });
    });
});

module.exports = router;