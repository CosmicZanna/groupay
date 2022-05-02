import admin from "../firebase.config";
import { Request, Response, NextFunction } from 'express';

class MiddleWare{
    async decodeToken(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.headers.authorization!.split(" ")[1];
            const decodeValue = await admin.auth().verifyIdToken(token)
            if(decodeValue){
            return next();
            }
            return res.send('unauthorized')}
        catch(err){
            console.log(err);
            res.send('unknown error');
            
            return;
        }
    }
}

export default new MiddleWare();