const { signup } = require('./auth.test');
const { getAuth, deleteUser } = require("firebase/auth");
const { expect } = require('chai');
const should = require('chai').should();
const request = require('supertest');
const app = require('../index');
const Group = require('../models/groups');
const Users = require('../models/users');


describe('-------Users Controller-------', function () {
  
  let userAuth;
  
  
  describe('createUser', function () {
    
    before(async function () {
      userAuth = await signup('test@email.com', '123456');
    });
    
    it('should create a user', async function () {
      const authToken = await userAuth.user.getIdToken();

      request(app)
        .post('/register')
        .set('Authorization', 'Bearer ' + authToken)
        .send({uid: userAuth.user.uid, name: "testName"})
        .then(response => {
          expect(response.body.uid).to.eql(userAuth.user.uid);
        })
        .catch(err => console.log(err))
    });

      after(function () {
        return deleteUser(userAuth.user)
          .then(() => {
            console.log('Successfully deleted user');
          })
          .catch((error) => {
            console.log('Error deleting user:', error);
          });
      })
    
  });

  describe('getGroups', function () {

    before(async function () {
      userAuth = await signup('test@email.com', '123456');
    });

    it('should get a users groups ', async function () {
      const authToken = await userAuth.user.getIdToken();
      const group = {
        _id: "123456789",
        groupName: 'testGroup',
        password: "testPassword",
      }

      let user = await Users.createUser(userAuth.user.uid, "ciccio");
      user = await Users.addGroup(userAuth.user.uid, group);

      request(app)
        .get('/groups')
        .set('Authorization', 'Bearer ' + authToken)
        .set('uid', userAuth.user.uid)
       .then(response => {
          expect(response.body).to.be.an('array');
          expect(response.body.map(group => group._id)).to.include("123456789")
        })
       .catch(err => console.log(err))
    
    });


    after(function () {

      return deleteUser(userAuth.user)
      .then(() => {
        console.log('Successfully deleted user');

      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
    })
  });

  describe('getUser', function () {

    before(async function () {
      userAuth = await signup('test@email.com', '123456');
    });

    it('should get a user', async function () {
      const authToken = await userAuth.user.getIdToken();

      let user = await Users.createUser(userAuth.user.uid, "ciccio");

      request(app)
        .get('/user')
        .set('Authorization', 'Bearer ' + authToken)
        .set('uid', userAuth.user.uid)
       .then(response => {
          expect(response.body.uid).to.equal(userAuth.user.uid)
          expect(response.body.name).to.equal("ciccio")
        })
       .catch(err => console.log(err))
    
    });


    after(function () {

      return deleteUser(userAuth.user)
      .then(() => {
        console.log('Successfully deleted user');

      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
    })
  });

  describe('joinGroup', function () {

    before(async function () {
      userAuth = await signup('test@email.com', '123456');
    });

    it('should get a users groups ', async function () {
      const authToken = await userAuth.user.getIdToken();
      const mockGroup = {
        groupName: 'testGroup',
        password: "testPassword",
        expenses: [],
        users: []
      }

      let user = await Users.createUser(userAuth.user.uid, "ciccio");
      let group = await Group.createGroup(mockGroup)
    /*   user = await Users.addGroup(userAuth.user.uid, group); */

      request(app)
        .put('/join')
        .set('Authorization', 'Bearer ' + authToken)
        .send({uid: userAuth.user.uid, password: mockGroup.password })
       .then(response => {
          expect(response.body.users).to.include(userAuth.user.uid)
        })
       .catch(err => console.log(err))
    
    });


    after(function () {

      return deleteUser(userAuth.user)
      .then(() => {
        console.log('Successfully deleted user');

      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
    })
  });

});