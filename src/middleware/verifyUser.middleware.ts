import { Request, Response, NextFunction } from 'express';
const verifyUser = (req: Request, res: Response, next: NextFunction) : any => {
    if (req.body.jwtId == req.params.id) next();
    else return res.status(409).send("Forbidden: NOT ALLOWED");
}
export default verifyUser;