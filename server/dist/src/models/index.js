"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.Groups = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GroupSchema = new mongoose_1.default.Schema({
    groupName: {
        type: String,
        required: true
    },
    users: {
        type: [String],
        default: [],
    },
    password: String,
    expenses: {
        type: [{
                title: {
                    type: String,
                    required: true
                },
                pictureUrl: String,
                value: {
                    type: Number,
                    required: true
                },
                currency: {
                    type: String,
                    required: true
                },
                tag: {
                    type: String,
                    required: true
                },
                payer: {
                    type: String,
                    required: true
                },
                payerName: {
                    type: String,
                    required: true
                }
            }],
        default: []
    }
}, { timestamps: false });
const UsersSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    groups: [{
            groupName: String,
            _id: String,
            password: String
        }],
}, { timestamps: false });
let Groups = mongoose_1.default.model('groups', GroupSchema);
exports.Groups = Groups;
let Users = mongoose_1.default.model('users', UsersSchema);
exports.Users = Users;
