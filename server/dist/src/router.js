"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groups_controller_1 = __importDefault(require("./controllers/groups.controller"));
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const router = (0, express_1.Router)();
// groups
router.get('/expenses', groups_controller_1.default.getExpenses);
router.post('/expenses', groups_controller_1.default.createExpense);
router.post('/groups', groups_controller_1.default.createGroup);
router.get('/group', groups_controller_1.default.getGroup);
router.delete('/expenses', groups_controller_1.default.deleteExpense);
router.delete('/groups/:id', groups_controller_1.default.deleteGroup);
// users
router.get('/groups', users_controller_1.default.getGroups);
router.get('/user', users_controller_1.default.getUser);
router.post('/register', users_controller_1.default.createUser);
router.put('/join', users_controller_1.default.joinGroup);
exports.default = router;
