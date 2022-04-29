const {Groups} = require('./index')

async function getExpenses(id){
  const gotGroup = await Groups.findOne({_id : id});
  return gotGroup.expenses;
}

async function getGroup(password){
  const gotGroup = await Groups.findOne({password :password});
  return gotGroup;
}

async function addUser(id, user){
  return await Groups.findOneAndUpdate(
    { _id: id }, 
    { $push: { users: user } }, 
    {
      new: true
    }
);
}

async function createExpense(id, expense){
  return await Groups.findOneAndUpdate(
    { _id: id }, 
    { $push: { expenses: expense } }, 
    {
      new: true
    }
);
}

async function deleteExpense(id){
  return await Groups.findOneAndUpdate(
    { _id: id }, 
    { expenses: [] }, 
    {
      new: true
    }
);
  }

  async function createGroup(group){

      return await Groups.create(group);

  }
  



module.exports = {addUser, getExpenses, createExpense, deleteExpense, createGroup, getGroup}