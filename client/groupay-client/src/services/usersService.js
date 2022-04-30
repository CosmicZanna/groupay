import axios from "axios";
const url = "http://localhost:3001/";

export const usersServiceRegister = async (authId, userId, userName) => {
  const body = { uid: userId, name: userName };
  const headers = { headers: { Authorization: "Bearer " + authId } };
  const registered = await axios.post(url + "register", body, headers);
  return registered;
};

export const usersServiceGetGroups = async (authId, userId,) => {
  const headers = { headers: { Authorization: "Bearer " + authId, uid: userId } };
  const groups = await axios.get(url + "groups", headers);
  return groups.data;
};

export const usersServiceGetUser = async (authId, userId) => {
  const headers = { headers: { Authorization: "Bearer " + authId, uid: userId } };
  const user = await axios.get(url + "user", headers);
  return user.data;
}

export const usersServiceJoinGroup = async (authId, userId, password) => { //TOBECHANGED with a full expense
  const body = { uid: userId, password: password };
  const headers = { headers: { Authorization: "Bearer " + authId } };
  const joinedGroup = await axios.put(url + "join", body, headers);
  return joinedGroup;
}