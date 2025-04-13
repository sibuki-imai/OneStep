import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import demoService from './demoService';

dotenv.config();
export class demoController {
    public static async functionName(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const demoData = req.body;

            const result = await demoService.functionName({
                // serviceに送信する情報
                demoData,
            });

            res.status(200).json({
                message: 'ユーザー登録が成功しました',
                data: result,
            });
        } catch (error) {}
    }
}

export default demoController;
