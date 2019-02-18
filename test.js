var backup = require('mongodb-backup');

// backup({
//     uri: 'mongodb://swarup:swarup@127.0.0.1:27017/yrcdb',
//     root: '../backup/',
//     metadata: true
// });

var restore = require('mongodb-restore');

restore({
    uri: 'mongodb://swarup:swarup@127.0.0.1:27017/yrcdb',
    root: '../backup/' + 'yrcdb'
});