const { expect } = require('chai');
const Groups = require('../dist/src/models/groups').default;
const ADLER32 = require("adler-32");
const { mockGroup, mockExpense } = require('./mock');

describe('-------Group Model--------', function () {

  describe('createGroup', function () {

    const password_1 = ADLER32.str(Date.now().toString());
    const password_2 = ADLER32.str(Date.now().toString());
    
    it("should create the group", async function () {

      const group = await Groups.createGroup({ ...mockGroup, password: password_1 });
      group.isNew.should.be.false;
    });

    it("should create different passwords", async function () {
      const group1 = await Groups.createGroup({ ...mockGroup, password: password_1 });
      const group2 = await Groups.createGroup({ ...mockGroup, password: password_2 });
      expect(group1.password).to.equal(password_1 + '');
      expect(group2.password).to.equal(password_2 + '');

    });

    it("should not create a group with empty name", async function () {
      Groups.createGroup({ ...mockGroup, password: password_1, groupName: undefined })
        .then((user) => { })
        .catch(err => {
          expect(err._message).to.eql('groups validation failed');
        });
    });
  });

  describe('getGroup', function () {
    beforeEach(async () => {
      await Groups.createGroup(mockGroup)
    })

    it("should return a group", async function () {
      const group = await Groups.getGroup(mockGroup.password);
      expect(mockGroup.password + '').to.be.equal(group.password);
      expect(mockGroup.groupName).to.be.equal(group.groupName);

    });
    it("should return null when password does not exist", async function () {
      const group = await Groups.getGroup();
      expect(group).to.be.null

    });

  });

  describe('addUser', function () {
    beforeEach(async () => {
      await Groups.createGroup(mockGroup)
    })

    const user = "testuid"

    it("should add user to the group", async function () {
      const group = await Groups.getGroup(mockGroup.password);
      const newGroup = await Groups.addUser(group._id, user);
      expect(newGroup.users).to.deep.include(user);
    });
  });

  describe('createExpense', function () {
    beforeEach(async () => {
      await Groups.createGroup(mockGroup)
    });

    it("should create one expense in a group", async function () {
      const group = await Groups.getGroup(mockGroup.password);
      const newGroup = await Groups.createExpense(group._id, mockExpense);
      expect(newGroup.expenses.map(e => e.title)).to.include(mockExpense.title);
    });

  });

  describe('getExpenses', function () {
    beforeEach(async () => {
      await Groups.createGroup(mockGroup)
    });

    it("should return the expenses of a group", async function () {
      const group = await Groups.getGroup(mockGroup.password);
      const newGroup = await Groups.createExpense(group._id, mockExpense);
      const expenses = await Groups.getExpenses(newGroup._id);
      expect(expenses.map(e => e.title)).to.include(mockExpense.title)
    });

  });


  describe('deleteExpense', function () {
    beforeEach(async () => {
      await Groups.createGroup(mockGroup);
    });

    it("should delete all the expenses", async function () {
      const group = await Groups.getGroup(mockGroup.password);
      const newGroup = await Groups.createExpense(group._id, mockExpense);
      const expenses = await Groups.deleteExpense(newGroup._id);
      expect(expenses.expenses).to.be.empty;
    });
  });

  describe('getByIdAndDelete', function () {

    it('should delete the group', async function () {
      const group = await Groups.createGroup(mockGroup);
      expect(await Groups.getGroup(group.password) !== null).to.be.true
      await Groups.getByIdAndDelete(group._id);
      expect(await Groups.getGroup(group.password) === null).to.be.true
    });
  });

});

