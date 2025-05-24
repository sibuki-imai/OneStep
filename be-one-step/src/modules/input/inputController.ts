import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import inputService from './inputService';
import idAcquisition from '../certification/idAcquisition';

dotenv.config();
export class inputController {
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const { date, customId, amount, memo } = req.body;
            const userId = await idAcquisition(req);
            if (!userId) {
                res.redirect(`${process.env.FE_DOMAIN}/errorpage`);
                return;
            }
            if (!customId) {
                res.status(400).json({
                    message: 'アイコンを選択してください',
                });
                return;
            }
            if (!amount) {
                res.status(400).json({
                    message: '金額を入力してください',
                });
                return;
            }
            // console.log('確認1:', customId);
            // console.log('確認2:', amount);
            // console.log('確認3:', memo);
            const result = await inputService.create({
                // serviceに送信する情報
                userId,
                customId,
                date,
                amount,
                memo,
            });

            res.status(200).json({
                message: '登録が成功しました',
                data: result,
            });
        } catch (error) {
            console.log('登録に失敗しました');
            res.status(400).json({
                message: '登録に失敗しました',
            });
            return;
        }
    }
}

export default inputController;
