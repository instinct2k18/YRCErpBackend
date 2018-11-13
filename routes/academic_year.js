const express = require('express');

const AcademicYear = require('../models/academic_year');
const auth = require('../middleware/auth-check');

const router = express.Router();

router.post("", (req, res, next) => {
    const ac_year = new AcademicYear({
        year: req.body.year
    });
    ac_year.save().then(result => {
        res.status(201).json({
            message: "Year added successfully",
            id : result._id
        });
    });
});

router.get("", auth, (req, res, next) => {
    AcademicYear.find()
        .then(documents => {
            res.status(200).json({
                message: 'Academic Year fetched successfully',
                academicYear: documents
            });
        });
});

module.exports = router;