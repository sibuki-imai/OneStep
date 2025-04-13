import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import iconService from './iconCustomSevice';

dotenv.config();
export class iconController {
    public static async conRegistration(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const { icon, naming, amount, saving } = req.body;
            const result = await iconService.iconRegistration({
                icon,
                naming,
                amount,
                saving,
            });

            res.status(200).json({
                message: 'ユーザー登録が成功しました',
                data: result,
            });
        } catch (error) {}
    }
}

export default iconController;
