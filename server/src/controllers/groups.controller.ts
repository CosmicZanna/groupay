import groups from "../models/groups";
import users from "../models/users";
import ADLER32 from "adler-32";
import { Request, Response } from 'express';
import { Group } from '../@types/types';

async function createExpense(req: Request, res: Response) {
  try {
    const user = await users.findUser(req.body.uid);
    for (let userGroup of user.groups) {
      if (userGroup._id === req.body.group) {
        const expense = req.body.expense;
        expense.payer = req.body.uid;
        expense.payerName = user.name;
        const newExpenses = await groups.createExpense(
          req.body.group,
          expense
        );
        return res.send(newExpenses);
      }
    }
    res.status(400);
    res.send("not found");
    console.log("group not in user");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err._message);
  }
}
async function deleteExpense(req: Request, res: Response) {
  try {
    const expense = await groups.deleteExpense(req.body.group);
    res.send(expense);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err._message);
  }
}

async function getExpenses(req: Request, res: Response) {
  try {
    const user = await users.findUser(req.headers.uid as string);
    for (let group of user.groups) {
      if (group._id === req.headers.groupid) {
        const groupExpenses = await groups.getExpenses(req.headers.groupid as string);
        return res.send(groupExpenses);
      }
    }
    res.send("group not found in user");
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err._message);
  }
}
async function createGroup(req: Request, res: Response) {
  try {
    const newGroup: Group = {
      groupName: req.body.groupName,
      users: [req.body.uid],
      password: ADLER32.str(Date.now().toString()),
    };
    const group = await groups.createGroup(newGroup);
    if (group) {
      await users.addGroup(req.body.uid, {
        _id: group._id,
        groupName: group.groupName,
        password: group.password,
      });
      res.send(group);
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err._message);
  }
}
async function getGroup(req: Request, res: Response) {
  try {
    const group = await groups.getGroup(req.headers.password as string);
    res.send(group);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err._message);
  }
}

async function deleteGroup(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const uid = req.headers.uid;
    const group = await groups.getByIdAndDelete(id); 
    await users.deleteGroup(uid as string, id);
    res.send(group);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err._message);
  }
}

export default { createExpense, getExpenses, deleteExpense, createGroup, getGroup, deleteGroup };
