import axios from "axios";
const url = "http://localhost:3001/";

export const groupsServiceCreateNewGroup = async (authId, userId, groupName) => {
  const body = { uid: userId, groupName: groupName };
  const headers = { headers: { Authorization: "Bearer " + authId } };
  const createdGroup = await axios.post(url + "groups", body, headers);
  return createdGroup;
};

export const groupsServiceCreateNewExpense = async (authId, userId, group, expense) => {
  const body = { uid: userId, group: group, expense: expense };
  const headers = { headers: { Authorization: "Bearer " + authId } };
  const createdExpense = await axios.post(url + "expenses", body, headers);
  return createdExpense;
};

export const groupsServiceCancelExpenses = async (authId, userId, group) => {
  const headers = { headers: { Authorization: "Bearer " + authId }, data: { uid: userId, group: group } }
  const cancelled = await axios.delete(url + "expenses", headers);
  return cancelled;
};

export const groupsServiceGetGroup = async (authId, userId, password) => {
  const headers = { headers: { Authorization: "Bearer " + authId, uid: userId, password: password } };
  const group = await axios.get(url + "group", headers);
  return group.data;
};

export const groupsServiceGetExpenses = async (authId, userId, groupId) => {
  const headers = { headers: { Authorization: "Bearer " + authId, uid: userId, groupId: groupId } };
  const groups = await axios.get(url + "expenses", headers);
  return groups.data;
};

export const groupsServiceDeleteGroup = async (authId, userId, groupId ) => {
  const headers = { headers: { Authorization: "Bearer " + authId, uid: userId } };
  const group = await axios.delete(url+ `groups/${groupId}`, headers);
  return group;
}
