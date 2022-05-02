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
const users_1 = __importDefault(require("../models/users"));
const groups_1 = __importDefault(require("../models/groups"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield users_1.default.createUser(req.body.uid, req.body.name);
            res.send(user);
        }
        catch (err) {
            console.log(err);
        }
    });
}
function getGroups(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groups = yield users_1.default.getGroups(req.headers.uid);
            res.send(groups);
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err._message);
        }
    });
}
function joinGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let group = yield groups_1.default.getGroup(req.body.password);
            if (group) {
                if (group.users.includes(req.body.uid)) {
                    res.status(401);
                    res.send("already in group");
                }
                else {
                    group = yield groups_1.default.addUser(group._id, req.body.uid);
                    yield users_1.default.addGroup(req.body.uid, {
                        _id: group._id,
                        groupName: group.groupName,
                        password: group.password,
                    });
                    return res.send(group);
                }
            }
            else {
                res.status(400);
                res.send("can't find group");
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send(err._message);
        }
    });
}
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield users_1.default.findUser(req.headers.uid);
            res.send(user);
        }
        catch (err) {
            console.log(err);
            res.send("400");
        }
    });
}
exports.default = { createUser, getGroups, joinGroup, getUser };
