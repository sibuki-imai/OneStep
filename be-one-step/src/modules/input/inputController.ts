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

    // 編集Get
    public static async oneGet(req: Request, res: Response): Promise<void> {
        try {
            const moneyId = Number(req.params.moneyid);
            const userId = await idAcquisition(req);
            if (!userId) {
                res.redirect(`${process.env.FE_DOMAIN}/errorpage`);
                return;
            }

            if (!moneyId) {
                console.log('ID取得失敗');
                res.redirect(`${process.env.FE_DOMAIN}/errorpage`);
                return;
            }

            const result = await inputService.oneGet({
                // serviceに送信する情報
                userId,
                moneyId,
            });

            res.status(200).json({
                message: '取得に成功しました',
                data: result,
            });
        } catch (error) {
            console.log('取得に失敗しました');
            res.status(400).json({
                message: '取得に失敗しました',
            });
            return;
        }
    }

    // 編集
    public static async correction(req: Request, res: Response): Promise<void> {
        try {
            const { amount, year, month, day, memo } = req.body;

            const moneyId = Number(req.params.moneyId);

            const userId = await idAcquisition(req);
            if (!userId) {
                res.redirect(`${process.env.FE_DOMAIN}/errorpage`);
                return;
            }

            if (!amount) {
                res.status(400).json({
                    message: '金額を入力してください',
                });
                return;
            }

            if (!year || !month || !day) {
                res.status(400).json({
                    message: '日付を入力してください',
                });
                return;
            }
            console.log('確認1:', moneyId);
            console.log('確認2:', amount);
            console.log('確認3:', memo);
            console.log('確認4:', year);
            console.log('確認5:', month);
            console.log('確認6:', day);

            const result = await inputService.correction({
                // serviceに送信する情報
                userId,
                moneyId,
                year,
                month,
                day,
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
