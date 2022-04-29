const { signup } = require('./auth.test');
const { getAuth, deleteUser } = require("firebase/auth");
const { expect } = require('chai');
const should = require('chai').should();
const request = require('supertest');
const app = require('../index');
const Group = require('../models/groups');
const User = require('../models/users');
const ADLER32 = require("adler-32");

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
      return deleteUser(userAuth.user)
        .then(() => {
          console.log('Successfully deleted user');
        })
        .catch((error) => {
          console.log('Error deleting user:', error);
        });
    })
  });

  describe('getGroup', function () {
    before(async function () {
      userAuth = await signup('test@email.com', '123456');
    });

    it('should return a group by password', async function () {
      const mockGroup = {
        groupName: "testgroup",
        users: [],
        expenses: [],
        password: ADLER32.str(Date.now().toString()),
      };

      const group = await Group.createGroup(mockGroup)
      const authToken = await userAuth.user.getIdToken();

      request(app)
        .get('/group')
        .set('Authorization', 'Bearer ' + authToken)
        .set('password', group.password)
        .then(res => {
          expect(res.body.groupName).to.eql(mockGroup.groupName);
        }).catch(err => { console.log(err) })
    });

    after(function () {
      return deleteUser(userAuth.user)
        .then(() => {
          console.log('Successfully deleted user');
        })
        .catch((error) => {
          console.log('Error deleting user:', error);
        });
    });
  });

  describe('createExpense', function () {
    before(async function () {
      userAuth = await signup('test@email.com', '123456');
    });

    it('should create an expense', async function () {
      const mockGroup = {
        groupName: "testgroup",
        users: [],
        expenses: [],
        password: ADLER32.str(Date.now().toString()),
      };
      const authToken = await userAuth.user.getIdToken();
      const dbUser = await User.createUser(userAuth.user.uid, "testName");
      const group = await Group.createGroup(mockGroup);
      await User.addGroup(dbUser.uid, group);
      const mockExpense = { 
        title: "newexpense", 
        value: 300, 
        currency: "USD", 
        tag: "casa", 
        payer: "testUID", 
        payerName: "gabriele" 
      }

      request(app)
        .post('/expenses')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + authToken)
        .send({ uid: dbUser.uid, group: group._id, expense: mockExpense })
        .then(res => {

          expect(res.body.expenses.map(e => e.title)).to.include(mockExpense.title)
        }).catch(err => { console.log(err) })
    });

    after(function () {
      return deleteUser(userAuth.user)
        .then(() => {
          console.log('Successfully deleted user');
        })
        .catch((error) => {
          console.log('Error deleting user:', error);
        });
    });
  });

  describe('getExpenses', function () {
    before(async function () {
      userAuth = await signup('test@email.com', '123456');
    });

    it('should get all the expenses of a group', async function () {
      const mockGroup = {
        groupName: "testgroup",
        users: [],
        expenses: [],
        password: ADLER32.str(Date.now().toString()),
      }; 
      const mockExpense = {
        title: "newexpense",
        value: 300,
        currency: "USD",
        tag: "casa",
        payer: "testUID",
        payerName: "gabriele"
      }

      const authToken = await userAuth.user.getIdToken();
      const dbUser = await User.createUser(userAuth.user.uid, "testName");
      const group = await Group.createGroup(mockGroup);
      await Group.createExpense(group._id, mockExpense);

      request(app)
        .get('/expenses')
        .set('Authorization', 'Bearer ' + authToken)
        .set('uid', dbUser.uid)
        .set('groupid', group._id)
        .then(res => {
          expect(res.body.map(e => e.title)).to.include(mockExpense.title);
        })

    });

    after(function () {
      return deleteUser(userAuth.user)
        .then(() => {
          console.log('Successfully deleted user');
        })
        .catch((error) => {
          console.log('Error deleting user:', error);
        });
    });
  });

  describe('deleteExpense', function () {
    before(async function () {
      userAuth = await signup('test@email.com', '123456');
    });

    it('should delete an expense in a group', async function () {
      const authToken = await userAuth.user.getIdToken();
      const mockGroup = {
        groupName: "testgroup",
        users: [],
        expenses: [],
        password: ADLER32.str(Date.now().toString())
      };
      await Group.createGroup(mockGroup)
      const group = await Group.getGroup(mockGroup.password);

      request(app)
        .delete('/expenses')
        .send({ group: group })
        .set('Authorization', 'Bearer ' + authToken)
        .then(res => {
          expect(res.body.expenses).to.be.empty;
        }).catch(err => console.log(err))
    });

    after(function () {
      return deleteUser(userAuth.user)
        .then(() => {
          console.log('Successfully deleted user');
        })
        .catch((error) => {
          console.log('Error deleting user:', error);
        });
    });
  });

});
