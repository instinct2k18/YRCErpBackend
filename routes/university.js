const express = require('express');

const University = require('../models/university');
const auth = require('../middleware/auth-check');

const router = express.Router();

router.post("", (req, res, next) => {
    const university = new University({
        university: req.body.university,
        address: req.body.address,
        nodal_officer: req.body.nodal_officer,
        contact_no: req.body.contact_no,
        email: req.body.email
    });
    university.save();
    res.status(201).json({
        message: "University added successfully"
    });
});

router.get("", auth, (req, res, next) => {
    University.find()
        .then(documents => {
            res.status(200).json({
                message: 'University fetched successfully',
                university: documents
            });
        });
});

router.delete("/delete", (req, res, next) => {
    University.findOneAndDelete(req.query.id)
    .then(documents => {
        res.status(200).json({
            message: 'University deleted successfully'
        });
    });
});

module.exports = router;