const { signup } = require('./auth.test');
const { getAuth, deleteUser } = require("firebase/auth");
const { expect } = require('chai');
const should = require('chai').should();
const request = require('supertest');
const app = require('../index');
const Group = require('../models/groups');
const User = require('../models/users');


describe('-------Groups Controller-------', function () {

  let userAuth;
  describe('createGroup', function () {

    before(async function () {
      userAuth = await signup('test@email.com', '123456');
    });

    it('should create a group and insert it in the user', async function () {
      const dbUser = await User.createUser(userAuth.user.uid, "testName");

      const authToken = await userAuth.user.getIdToken();

      const addingGroup = {
        uid: userAuth.user.uid,
        groupName: "testGroupName",
      };

      request(app)
        .post('/groups')
        .set('Authorization', 'Bearer ' + authToken)
        .send(addingGroup)
        .then(response => {
          expect(response.body.groupName).to.eql(addingGroup.groupName);
        })
        .catch(err => console.log(err))
    });

    

    after(function () {
      deleteUser(userAuth.user)
        .then(() => {
          console.log('Successfully deleted user');
        })
        .catch((error) => {
          console.log('Error deleting user:', error);
        });
    })

  });

});
