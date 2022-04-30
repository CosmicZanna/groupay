const router = require('express').Router();
const groupscontroller = require('./controllers/groups.controller');
const userscontroller  = require('./controllers/users.controller');

// groups
router.get('/expenses', groupscontroller.getExpenses);
router.post('/expenses', groupscontroller.createExpense);
router.post('/groups', groupscontroller.createGroup);
router.get('/group', groupscontroller.getGroup);
router.delete('/expenses', groupscontroller.deleteExpense);

// users
router.get('/groups', userscontroller.getGroups);
router.get('/user', userscontroller.getUser);
router.post('/register', userscontroller.createUser);
router.put('/join', userscontroller.joinGroup);

module.exports = router;