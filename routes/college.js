const express = require('express');

const College = require('../models/college');
const auth = require('../middleware/auth-check');

const router = express.Router();

router.post("", (req, res, next) => {
    const college = new College({
        yrc_reg_no: req.body.yrc_reg_no,
        college_name: req.body.college_name,
        address: req.body.address,
        program_officer: req.body.program_officer,
        contact_no: req.body.contact_no,
        email: req.body.email,
        registered_financial_year: req.body.registered_financial_year,
        affiliation: req.body.affiliation,
        district: req.body.district
    });
    college.save();
    res.status(201).json({
        message: "College added successfully"
    });
});

router.get("", auth, (req,res, next) => {
    College.find()
        .then(documents => {
            res.status(200).json({
                message: 'College fetched successfully',
                college: documents
            });
        });
});

router.put("/edit", auth, (req, res, next) => {
    console.log(req.body);
    College.findByIdAndUpdate(req.body.id, {
        yrc_reg_no: req.body.yrc_reg_no,
        college_name: req.body.college_name,
        address: req.body.address,
        program_officer: req.body.program_officer,
        contact_no: req.body.contact_no,
        email: req.body.email,
        registered_financial_year: req.body.registered_financial_year,
        affiliation: req.body.affiliation,
        district: req.body.district 
    }, {new: true})
    .then(documents => {
        res.status(200).json({
            message: 'College updated successfully'
        });
    });;
});

router.delete("/delete", (req, res, next) => {
    College.findOneAndDelete(req.query.id)
    .then(documents => {
        res.status(200).json({
            message: 'College deleted successfully'
        });
    });
});

module.exports = router;