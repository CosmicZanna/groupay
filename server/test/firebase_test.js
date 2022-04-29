const firebase =  require('firebase/compat/app');
require('firebase/compat/auth');

const app = firebase.initializeApp({
  apiKey: "AIzaSyBnGwqckIgeyc9PvzlvMqzfnAMlJ9KSLE0",

  authDomain: "groupay-test.firebaseapp.com",

  projectId: "groupay-test",

  storageBucket: "groupay-test.appspot.com",

  messagingSenderId: "108262730437",

  appId: "1:108262730437:web:bbd48ac499529806cc5eac"

  })


module.exports = app