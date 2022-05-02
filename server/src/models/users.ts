import { Group } from '../@types/types';
import { Users } from './index';

async function createUser(uid: string, name: string){
  const newUser = new Users({uid: uid, name: name, groups: []});
  await newUser.save();
  return newUser;
}

async function getGroups(uid: string){
  const user = await Users.findOne({uid: uid});
  return user.groups;
}

async function addGroup(uid: string, group: Group){
  return await Users.findOneAndUpdate(
    { uid: uid }, 
    { $push: { groups: group}},
    { new: true }
  );
}

async function findUser(uid: string){
  return await Users.findOne({uid: uid})
}

async function deleteGroup(uid: string, groupId: string) {
  const user = await Users.findOne({ uid: uid });
  user.groups = user.groups.filter((g: Group) => g._id !== groupId);
  await user.save();
  return user;
}

export default { createUser, getGroups, findUser, addGroup, deleteGroup };
