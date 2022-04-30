//test authentication
const { expect } = require('chai');
const should = require('chai').should();
const { getAuth, deleteUser } = require("firebase/auth");

const app = require("../firebase_test");
const auth = app.auth();


function signup(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}
function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}
function logout() {
  return auth.signOut();
}


describe('Authentication', function () {

  describe('Sign up', function () {
    let user; 
 
    it("should return the user", async function () {
        user = await signup("test@test.com", "123456");
        expect(user.additionalUserInfo.isNewUser).to.be.true
    });

    
    this.afterEach(function() {
        deleteUser(user.user)
       .then(() => {
         console.log('Successfully deleted user');
        })
        .catch((error) => {
          console.log('Error deleting user:', error);
        });
  
    })
  });


});

module.exports = { signup };