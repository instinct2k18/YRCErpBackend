const express = require('express');

const College = require('../models/college');
const auth = require('../middleware/auth-check');

const router = express.Router();

router.get("", (req, res, next) => {
    const clgId = req.query.clgId;
    const old_affId = req.query.old_affId;
    const new_affId = req.query.new_affId;
    College.updateOne(
        {'_id': clgId}, 
        {$set: {'old_affiliation': old_affId, 'affiliation': new_affId}}
    ).then(res => res);
    res.status(201).json({
        message: "Affiliation updated successfully"
    });
});

module.exports = router;