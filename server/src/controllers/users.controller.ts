import users from "../models/users";
import groupsModel from "../models/groups";
import { Request, Response } from 'express';

async function createUser(req: Request, res: Response) {
  try {
    const user = await users.createUser(req.body.uid, req.body.name);
    res.send(user);
  } catch (err: any) {
    console.log(err);
  }
}
async function getGroups(req: Request, res: Response) {
  try {
    const groups = await users.getGroups(req.headers.uid as string);
    res.send(groups);
  } catch (err: any) {
    console.log(err);
    res.status(400).send(err._message);
  }
}
async function joinGroup(req: Request, res: Response) {
  try {
    let group = await groupsModel.getGroup(req.body.password);
    if (group) {
      if (group.users.includes(req.body.uid)) {
        res.status(401);
        res.send("already in group");
      } else {
        group = await groupsModel.addUser(group._id, req.body.uid);
        await users.addGroup(req.body.uid, {
          _id: group._id,
          groupName: group.groupName,
          password: group.password,
        });
        return res.send(group);
      }
    } else {
      res.status(400);
      res.send("can't find group");
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).send(err._message);
  }
}

async function getUser(req: Request, res: Response) {
  try {
    const user = await users.findUser(req.headers.uid as string);
    res.send(user);
  } catch (err: any) {
    console.log(err);
    res.send("400");
  }
}

export default { createUser, getGroups, joinGroup, getUser };
