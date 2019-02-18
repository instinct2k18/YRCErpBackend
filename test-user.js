const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const User = require('./models/user');

mongoose.connect("mongodb://localhost:27017/yrcdb", { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

    bcrypt.hash('clerk', 10)
    .then(hash =>{
        const user = new User({
            username: 'clerk',
            password: hash,
            roles: 'clerk'
        });
        user.save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(error);
            });
    });