const { Users } = require('./index')


async function createUser(uid, name){
  const newUser = new Users({uid: uid, name: name, groups: []});
  await newUser.save();
  return newUser;
}

async function getGroups(uid){
  const user = await Users.findOne({uid: uid})
  return user.groups;
}

async function addGroup(uid, group){
  return await Users.findOneAndUpdate(
    { uid: uid }, 
    { $push: { groups: group}},
    { new: true });
}

async function findUser(uid){
  return await Users.findOne({uid: uid})
}



module.exports = {createUser, getGroups, findUser, addGroup}