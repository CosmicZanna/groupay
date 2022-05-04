const { signup } = require('./auth.test');
const { deleteUser } = require("firebase/auth");
const { expect } = require('chai');
const request = require('supertest');
const app = require('../dist/index').default;
const Group = require('../dist/src/models/groups').default;
const Users = require('../dist/src/models/users').default;
const { group, mockGroup } = require('./mock');

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
        .send({ uid: userAuth.user.uid, name: "testName" })
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

      await Users.createUser(userAuth.user.uid, "ciccio");

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

      await Users.createUser(userAuth.user.uid, "ciccio");
      await Group.createGroup(mockGroup)

      request(app)
        .put('/join')
        .set('Authorization', 'Bearer ' + authToken)
        .send({ uid: userAuth.user.uid, password: mockGroup.password })
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