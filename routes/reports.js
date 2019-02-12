const express = require('express');

const Receipt = require('../models/receipt');

const auth = require('../middleware/auth-check');

const router = express.Router();

router.get("", auth, (req,res, next) => {
    const collegeId = req.query.collegeId;
    const acYearId = req.query.acYearId;
    const fYearId = req.query.fYearId;
    Receipt.find({'college_name': collegeId, 'academic_year': acYearId, 'financial_year': fYearId})
        .then((documents) => {
            res.status(200).json({
                message: 'Reports fetched successfully',
                reports: documents
            });
        });
});

module.exports = router;