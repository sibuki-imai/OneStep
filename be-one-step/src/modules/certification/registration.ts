import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import User from '../../models/userModel';

dotenv.config();
export class registration {
    public static async Registration(
        req: Request,
        res: Response
    ): Promise<void> {
        const situation = req.body.paylod;
        console.log(`取得チェック：`, situation);
    }
}
export default registration;
