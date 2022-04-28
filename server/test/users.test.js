const { expect } = require('chai');
const should = require('chai').should();
const Users = require('../models/users');

describe('createUser', function () {
  it('create a new user in the database', async function () {
    const user = await Users.createUser("testuid", "ciccio");
    user.isNew.should.be.false;
  });

  it("shouldn't create an user without the name", async function () {
    Users.createUser("testuid")
    .then((user) => {})
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
  beforeEach( async () => {
    await Users.createUser("testuid", "foo")
  })

  const group = {
    _id: "123456789",
    groupName: 'testGroup',
    password: "testPassword",
  }

  it("should create a group for a user", async function () {
    const user = await Users.addGroup("testuid", group);
    expect(user.groups.map(g => g._id)).to.deep.include(group._id);
  });

  

});

describe('getGroups', function () {

});


describe('findUser', function () {

});
