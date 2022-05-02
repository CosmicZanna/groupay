const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
const app = firebase.initializeApp({
  apiKey: "AIzaSyCxak__yXewAHfGGR7u6c7vGXGc9n8tYwc",
  authDomain: "groupay-test-8d668.firebaseapp.com",
  projectId: "groupay-test-8d668",
  storageBucket: "groupay-test-8d668.appspot.com",
  messagingSenderId: "675903858710",
  appId: "1:675903858710:web:558a8deb6c3b66e5b2ad37"
})
module.exports = app;