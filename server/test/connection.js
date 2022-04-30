const mongoose = require('mongoose');

before(function (done) {
  // connect to mongoDb
  mongoose.connect('mongodb://localhost/groupay_test');
  
  mongoose.connection.once('open', function () {
    console.log('Connection to test database');
    done();
  }).on('error', function (error) {
    console.log('TestDB connection error', error);
  });
});

// Drop the users collection before each test
beforeEach(function (done) {
  mongoose.connection.collections.users.drop(() => {
    mongoose.connection.collections.groups.drop(() => {
      done();
    });
  });
});

