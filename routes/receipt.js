const express = require('express');

const Receipt = require('../models/receipt');
const College = require('../models/college');
const Voucher = require('../models/voucher');
const auth = require('../middleware/auth-check');

const router = express.Router();

router.get("", auth, (req,res, next) => {
    const clgId = req.query.clgId;
    const acYearId = req.query.acYearId;
    const fnYearId = req.query.fnYearId;
    const incHdId = req.query.incHdId;
    const recptNo = req.query.recptNo;
    const recptEncDate = req.query.recptEncDate;
    const notFirst = req.query.notFirst;
    Voucher.findOne({'college_name': clgId, 'academic_year': acYearId, 'financial_year': fnYearId, 'income_head': incHdId})
        .then(documents => {
            if(documents)
            {
                College.findOne({_id: documents.college_name})
                    .then(docs => {
                        if (!notFirst) {
                            const receipt = new Receipt({
                                receipt_no : recptNo,
                                receipt_enclosed_date : recptEncDate,
                                voucher_no: documents.voucher_no,
                                college_name: documents.college_name,
                                fee : documents.fee,
                                income_head : documents.income_head,
                                financial_year: documents.financial_year,
                                academic_year: documents.academic_year,
                                received_date : documents.received_date,
                                bank_details : documents.bank_details,
                                student_count : documents.student_count
                            });
                            //receipt.save();
                        }
                        res.status(201).json({
                            message: "Receipt generated successfully",
                            data: [{
                                c_name: docs.college_name,
                                addr: docs.address,
                                fees : documents.fee,
                                income_head : documents.income_head,
                                received_date : documents.received_date,
                                bank_details : documents.bank_details,
                                student_count : documents.student_count
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