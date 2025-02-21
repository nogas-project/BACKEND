import { Request, Response, NextFunction } from 'express';
const verifyRole = (req: Request, res: Response, next: NextFunction) : any => {
    const isAdmin = req.body.admin;
    return isAdmin ? next() : res.status(401).send("Not authorized");
}
export default verifyRole;