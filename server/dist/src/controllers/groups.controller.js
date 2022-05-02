"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groups_1 = __importDefault(require("../models/groups"));
const users_1 = __importDefault(require("../models/users"));
const adler_32_1 = __importDefault(require("adler-32"));
function createExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield users_1.default.findUser(req.body.uid);
            for (let userGroup of user.groups) {
                if (userGroup._id === req.body.group) {
                    const expense = req.body.expense;
                    expense.payer = req.body.uid;
                    expense.payerName = user.name;
                    const newExpenses = yield groups_1.default.createExpense(req.body.group, expense);
                    return res.send(newExpenses);
                }
            }
            res.status(400);
            res.send("not found");
            console.log("group not in user");
        }
        catch (err) {
            console.log(err);
            res.send("error");
        }
    });
}
function deleteExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const expense = yield groups_1.default.deleteExpense(req.body.group);
            res.send(expense);
        }
        catch (err) {
            console.log(err);
            res.send("error");
        }
    });
}
function getExpenses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield users_1.default.findUser(req.headers.uid);
            for (let group of user.groups) {
                if (group._id === req.headers.groupid) {
                    const groupExpenses = yield groups_1.default.getExpenses(req.headers.groupid);
                    return res.send(groupExpenses);
                }
            }
            res.send("group not found in user");
        }
        catch (err) {
            console.log(err);
            res.send("error");
        }
    });
}
function createGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newGroup = {
                groupName: req.body.groupName,
                users: [req.body.uid],
                password: adler_32_1.default.str(Date.now().toString()),
            };
            const group = yield groups_1.default.createGroup(newGroup);
            if (group) {
                yield users_1.default.addGroup(req.body.uid, {
                    _id: group._id,
                    groupName: group.groupName,
                    password: group.password,
                });
                res.send(group);
            }
        }
        catch (err) {
            console.log(err);
            res.status(501);
            res.send("501");
        }
    });
}
function getGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const group = yield groups_1.default.getGroup(req.headers.password);
            res.send(group);
        }
        catch (err) {
            console.log(err);
            res.send("501");
        }
    });
}
exports.default = { createExpense, getExpenses, deleteExpense, createGroup, getGroup };
