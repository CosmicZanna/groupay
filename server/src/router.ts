import { Router } from 'express';
import groupscontroller from './controllers/groups.controller';
import userscontroller from './controllers/users.controller';

const router = Router();

// groups
router.get('/expenses', groupscontroller.getExpenses);
router.post('/expenses', groupscontroller.createExpense);
router.post('/groups', groupscontroller.createGroup);
router.get('/group', groupscontroller.getGroup);
router.delete('/expenses', groupscontroller.deleteExpense);
router.delete('/groups/:id', groupscontroller.deleteGroup);

// users
router.get('/groups', userscontroller.getGroups);
router.get('/user', userscontroller.getUser);
router.post('/register', userscontroller.createUser);
router.put('/join', userscontroller.joinGroup);

export default router;