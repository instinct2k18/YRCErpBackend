const express = require('express');

const District = require('../models/district');
const auth = require('../middleware/auth-check');

const router = express.Router();

router.post("", (req, res, next) => {
    const district = new District({
        district_name: req.body.district_name 
    });
    district.save();
    res.status(201).json({
        message: "District added successfully"
    });
});

router.get("", auth, (req,res, next) => {
    District.find()
        .then(documents => {
            res.status(200).json({
                message: 'District fetched successfully',
                district: documents
            });
        });
});

module.exports = router;