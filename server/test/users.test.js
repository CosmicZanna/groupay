const { expect } = require('chai');
const Users = require('../models/users');
const { group } = require('./mock');

describe('--------User Model---------', function () {
  describe('createUser', function () {
    it('create a new user in the database', async function () {
      const user = await Users.createUser("testuid", "ciccio");
      user.isNew.should.be.false;
    });

    it("shouldn't create an user without the name", async function () {
      Users.createUser("testuid")
        .then((user) => { })
        .catch(err => {
          expect(err._message).to.eql('users validaton failed');
        });
    });

    it("shouldn't create an user without the uid", async function () {
      Users.createUser(undefined, "name")
        .then((user) => { })
        .catch(err => {
          expect(err._message).to.eql('users validaton failed');
        });
    });

  });

  describe('addGroup', function () {
    beforeEach(async () => {
      await Users.createUser("testuid", "foo")
    })

    it("should create a group for a user", async function () {
      const user = await Users.addGroup("testuid", group);
      expect(user.groups.map(g => g._id)).to.deep.include(group._id);
    });

  });

  describe('findUser', function () {
    beforeEach(async () => {
      await Users.createUser("testuid", "foo")
    })

    it("should return the user", async function () {
      const user = await Users.findUser("testuid")
      expect(user.uid).to.eql("testuid");
    });

  });

  describe('getGroups', function () {

    beforeEach(async () => {
      await Users.createUser("testuid", "foo")
      await Users.addGroup("testuid", group);
    })

    it("should return the group array ", async function () {
      const user = await Users.findUser("testuid")
      const groups = await Users.getGroups("testuid");
      expect(user.groups).to.eql(groups);
    });

  });
});

