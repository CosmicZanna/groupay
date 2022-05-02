import { Expense, Group, User } from '../@types/types';
import { Groups } from './index';

async function getExpenses(id: string){
  const gotGroup = await Groups.findOne({_id : id});
  return gotGroup.expenses;
}

async function getGroup(password: string){
  return await Groups.findOne({password :password});
}

async function addUser(id: number, user: User){
  return await Groups.findOneAndUpdate(
    { _id: id }, 
    { $push: { users: user } }, 
    { new: true }
  );
}

async function createExpense(id: number, expense: Expense){
  return await Groups.findOneAndUpdate(
    { _id: id }, 
    { $push: { expenses: expense } }, 
    { new: true }
  );
}

async function deleteExpense(id: number){
  return await Groups.findOneAndUpdate(
    { _id: id }, 
    { expenses: [] }, 
    { new: true }
  );
}

async function createGroup(group: Group){
  return await Groups.create(group);
}

export default { addUser, getExpenses, createExpense, deleteExpense, createGroup, getGroup };
