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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
function createUser(uid, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = new index_1.Users({ uid: uid, name: name, groups: [] });
        yield newUser.save();
        return newUser;
    });
}
function getGroups(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield index_1.Users.findOne({ uid: uid });
        return user.groups;
    });
}
function addGroup(uid, group) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield index_1.Users.findOneAndUpdate({ uid: uid }, { $push: { groups: group } }, { new: true });
    });
}
function findUser(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield index_1.Users.findOne({ uid: uid });
    });
}
function deleteGroup(uid, groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield index_1.Users.findOne({ uid: uid });
        user.groups = user.groups.filter((g) => g._id !== groupId);
        yield user.save();
        return user;
    });
}
exports.default = { createUser, getGroups, findUser, addGroup, deleteGroup };
