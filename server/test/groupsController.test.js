const { signup } = require('./auth.test');
const { deleteUser } = require("firebase/auth");
const { expect } = require('chai');
const request = require('supertest');
const app = require('../dist/index').default;
const Group = require('../dist/src/models/groups').default;
const User = require('../dist/src/models/users').default;
const { mockGroup, mockExpense } = require('./mock');

describe.only('-------Groups Controller-------', function () {


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
      const authToken = await userAuth.user.getIdToken();
      const dbUser = await User.createUser(userAuth.user.uid, "testName");
      const group = await Group.createGroup(mockGroup);
      await User.addGroup(dbUser.uid, group);

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

  describe('deleteGroup', function () {
    before(async function () {
      userAuth = await signup('test@email.com', '123456');
    });

    it('should delete the group from the group and from the user groups', async function () {
      const authToken = await userAuth.user.getIdToken();
      const dbUser = await User.createUser(userAuth.user.uid, "testName");
      const group = await Group.createGroup(mockGroup)
      await User.addGroup(dbUser.uid, group);

      request(app)
        .delete(`/groups/${group._id}`)
        .set('Authorization', 'Bearer ' + authToken)
        .set('uid', dbUser.uid)
        .then(async (res) => {
          expect(await Group.getGroup(group.password) === null).to.be.true;
          expect(res.body.password).to.eql(group.password);
          const updatedUser = await User.findUser(dbUser.uid);
          expect(updatedUser.groups.map(g => g._id)).to.not.include(group._id);
        });
    })

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
