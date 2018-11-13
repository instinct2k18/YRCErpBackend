const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const User = require('./models/user');

mongoose.connect("mongodb://swarup:swarup@127.0.0.1:27017/yrcdb", { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

    bcrypt.hash('admin', 10)
    .then(hash =>{
        const user = new User({
            username: 'admin',
            password: hash
        });
        user.save()
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(error);
            });
    });