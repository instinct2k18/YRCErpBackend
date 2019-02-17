const express = require('express');

const Receipt = require('../models/receipt');
const College = require('../models/college');

const auth = require('../middleware/auth-check');

const router = express.Router();

router.get("", auth, (req,res, next) => {
    const fromAcId = req.query.fromAcId;
    const toAcId = req.query.toAcId;
    const fromFnId = req.query.fromFnId;
    const toFnId = req.query.toFnId;
    if(req.query.collegeId) {
        const collegeId = req.query.collegeId;
        Receipt.find({'college_name': collegeId, 'academic_year': {$gte: fromAcId, $lte: toAcId}, 'financial_year': {$gte: fromFnId, $lte: toFnId}})
        .then((documents) => {
            res.status(200).json({
                message: 'College Collection fetched successfully',
                collections: documents
            });
        });
    }
    
    if(req.query.distId) {
        const distId = req.query.distId;
        let data = [];

        function getClgIdsCollege(distId) {
            return College.find({'district': distId})
        }
        
        function getReceiptsCollege(dist, fromAc, toAc, fromFn, toFn) {
            return Receipt.find({'college_name': dist, 'academic_year': {$gte: fromAc, $lte: toAc}, 'financial_year': {$gte: fromFn, $lte: toFn}})
        }
        
        async function districtCollect() {
            const clgIds = await getClgIdsCollege(distId);
            const rec = await clgIds.map(c => {
                return getReceiptsCollege(c._id, fromAcId, toAcId, fromFnId, toFnId)
                    .then(i => { return i.map(c=>c)})
                });
            
            const out = Promise.all(rec).then((results) => {
                return results.map((r) => r.map(q => data.push(q)))
            })
            out.then((colls) => {
                res.status(200).json({
                    message: 'College Collection fetched successfully',
                    collections: data
                });
            })
        }
        districtCollect();
    }

    if(req.query.univId) {
        const univId = req.query.univId;
        let data = [];

        function getClgIdsUniversity(univId) {
            return College.find( 
                {$or :[ {"affiliation": {$exists: true, $ne: null, $in: [univId]}}, 
                        {"old_affiliation": {$exists: true, $ne:null, $in: [univId]}} ] })
        }
        
        function getReceiptsUniversity(dist, fromAc, toAc, fromFn, toFn) {
            return Receipt.find({'college_name': dist, 'academic_year': {$gte: fromAc, $lte: toAc}, 'financial_year': {$gte: fromFn, $lte: toFn}})
        }
        
        async function universityCollect() {
            const clgIds = await getClgIdsUniversity(univId);
            const rec = await clgIds.map(c => {
                return getReceiptsUniversity(c._id, fromAcId, toAcId, fromFnId, toFnId)
                    .then(i => { return i.map(c=>c)})
                });
            
            const out = Promise.all(rec).then((results) => {
                return results.map((r) => r.map(q => data.push(q)))
            })
            out.then((colls) => {
                res.status(200).json({
                    message: 'University Collection fetched successfully',
                    collections: data
                });
            })
        }
        universityCollect();
    }
});
    
module.exports = router;