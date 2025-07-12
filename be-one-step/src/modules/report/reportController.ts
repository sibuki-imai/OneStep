import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import inputService from './reportService';
import idAcquisition from '../certification/idAcquisition';

dotenv.config();
export class reportController {
    public static async allGet(req: Request, res: Response): Promise<void> {
        try {
            const userId = await idAcquisition(req);
            const year = Number(req.query.year) ?? null;
            const month = Number(req.query.month) ?? null;
            const customIdRaw = Number(req.query.customId);
            const customId = isNaN(customIdRaw) ? null : customIdRaw;
            const result = await inputService.allGet({
                // serviceに送信する情報
                userId,
                year,
                month,
                ...(customId !== null && { customId }),
            });

            res.status(200).json({
                message: '取得に成功しました',
                data: result,
            });
        } catch (error) {
            console.log('データの取得に失敗しました');
            res.status(400).json({
                message: 'データの取得にに失敗しました',
            });
            return;
        }
    }
}
export default reportController;
