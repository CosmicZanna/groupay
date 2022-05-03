import { 
  usersServiceRegister, 
  usersServiceGetGroups, 
  usersServiceGetUser,
  usersServiceJoinGroup
} from "./usersService";
import {
  groupsServiceCancelExpenses,
  groupsServiceCreateNewExpense,
  groupsServiceGetExpenses,
  groupsServiceGetGroup,
  groupsServiceCreateNewGroup,
  groupsServiceDeleteGroup
} from './groupsService';

// users services
const register = usersServiceRegister;
const getGroups = usersServiceGetGroups;
const getUser = usersServiceGetUser;
const joinGroup = usersServiceJoinGroup;

// groups services
const createNewGroup = groupsServiceCreateNewGroup;
const createNewExpense = groupsServiceCreateNewExpense;
const cancelExpenses = groupsServiceCancelExpenses;
const getGroup = groupsServiceGetGroup;
const getExpenses = groupsServiceGetExpenses;
const deleteGroup = groupsServiceDeleteGroup;

const apiService = {
  register, 
  getGroups, 
  getGroup, 
  getUser, 
  createNewExpense, 
  createNewGroup,
  getExpenses,
  joinGroup,
  cancelExpenses,
  deleteGroup
};

export default apiService;