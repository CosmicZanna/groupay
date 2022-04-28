const mongoose = require('mongoose');

// connect to mongoDb
mongoose.connect('mongodb://localhost/groupay_test');

mongoose.connection.once('open', function () {
  console.log('Connection to test databse');

}).on('error', function (error) {
  console.log('TestDB connection error', error);
});