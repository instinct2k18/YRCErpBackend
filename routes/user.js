const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/user');

const router = express.Router();

router.post("/create_user", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const user = new User({
                username: req.body.username,
                password: hash,
                roles: req.body.roles
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created!',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Autentication failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if(!result) {
                return res.status(401).json({
                    message: "Autentication failed"
                });
            }
            const token = jwt.sign({ username: fetchedUser.username, userId: fetchedUser._id}, 
                'youth-redcross-karnataka-erp-model',
                { expiresIn: "10h"}
            );
            res.status(200).json({
                roles: fetchedUser.roles,
                token: token,
                expiresIn: 36000
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Authentication failed"
            });
        });
});
module.exports = router;