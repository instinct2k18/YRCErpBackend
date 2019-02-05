const express = require('express');

const College = require('../models/college');
const Voucher = require('../models/voucher');
const auth = require('../middleware/auth-check');

const router = express.Router();

router.get("", auth, (req,res, next) => {
    const clgId = req.query.clgId;
    const acYearId = req.query.acYearId;
    const fnYearId = req.query.fnYearId;
    Voucher.findOne({'college_name': clgId, 'academic_year': acYearId, 'financial_year': fnYearId})
        .then(documents => {
            if(documents)
            {
                College.findOne({_id: documents.college_name})
                    .then(docs => {
                        res.status(201).json({
                            message: "Receipt generated successfully",
                            data: [{
                                c_name: docs.college_name,
                                addr: docs.address,
                                fees : documents.fee
                            }]
                        });
                });
            }
            else
            {
                res.status(500).json({
                    message: "Receipt could not be generated"     
                });
            }

        });

});

module.exports = router;