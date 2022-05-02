import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true
  },
  users: {
    type: [String],
    default: [],
  },
  password: String, //this is cool btw
  expenses: {
    type: [{ //create expenses Schema
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

}, {timestamps: false})

const UsersSchema = new mongoose.Schema({
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
  },{timestamps: false});
  

let Groups =  mongoose.model('groups', GroupSchema);
let Users =  mongoose.model('users', UsersSchema);

export {Groups, Users}