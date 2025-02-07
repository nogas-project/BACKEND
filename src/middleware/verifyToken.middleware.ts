import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {config} from "../config/config";

// Middleware pour vérifier le JWT
// @ts-ignore
const verifyToken = (req: Request, res: Response, next: NextFunction) : express.Response<any, Record<string, any>> => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(403).send('Access denied or no token provided.');
        jwt.verify(token, config.JWT_SECRET, (err, payload) => {
            if (err) return res.status(403).send('Access denied or no token provided.');
            // @ts-ignore
            let id = payload.id;
            // @ts-ignore
            let admin = payload.admin;
            req.body.id = id;
            req.body.id = admin;
            if (id != req.params.id) return res.status(409).send("Forbidden: NOT ALLOWED");
            if (id == req.params.id) next();
        });
    } catch (error) {
        res.status(401).send('Bad Token');
    }
};
export default verifyToken;