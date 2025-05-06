import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import iconCustomService from './iconCustomSevice';
import Icon from '../../models/iconModel';
import idAcquisition from '../certification/idAcquisition';
import CustomIcon from '../../models/iconCustomModel';

dotenv.config();
export class iconCustomController {
    // 単発追加
    public static async conRegistration(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const { iconPath, naming, amount, saving } = req.body;
            const userId = await idAcquisition(req);
            if (!userId) {
                console.log('ID未取得');
                return;
            }

            const BiconId = await Icon.findOne({
                where: { icon_path: iconPath },
                attributes: ['icon_id'],
            });

            if (!BiconId) {
                res.status(202).json({
                    message: 'iconが取得できませんでした',
                });
                return;
            }

            const iconId = BiconId.dataValues.icon_id;

            const result = await iconCustomService.iconRegistration({
                userId,
                iconId,
                naming,
                amount,
                saving,
            });

            res.status(200).json({
                message: '項目設定が完了しました',
                data: result,
            });
        } catch (error) {
            console.log('項目設定に失敗しました');
            res.status(400).json({
                message: '項目設定に失敗しました',
            });
            return;
        }
    }

    // ユーザの現状の取得
    public static async currentSituation(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const userId = await idAcquisition(req);
            if (!userId) {
                console.log('ID未取得');
                return;
            }
            const result = await iconCustomService.currentSituation({
                userId,
            });

            res.status(200).json({
                message: '情報の取得に成功しました',
                data: result,
            });
        } catch (error) {
            console.log('情報の取得に失敗しました');
            res.status(400).json({
                message: '情報の取得に失敗しました',
            });
            // return;
        }
    }

    public static async itemDelete(req: Request, res: Response): Promise<void> {
        try {
            const userId = await idAcquisition(req);
            if (!userId) {
                console.log('ID未取得');
                return;
            }
            const remainingNumber = await CustomIcon.count({
                where: { unique_user_id: userId },
            });
            // console.log('件数確認', remainingNumber);
            if (remainingNumber == 1) {
                res.status(400).json({
                    message: '全て削除することはできません',
                });
                return;
            }
            const deletenumber = req.body.deleteList;
            const result = await iconCustomService.itemDelete({
                // serviceに送信する情報
                userId,
                deletenumber,
            });

            res.status(200).json({
                message: '削除に成功しました',
                data: result,
            });
        } catch (error) {
            console.log('削除に失敗しました');
            res.status(400).json({
                message: '削除に失敗しました',
            });
            return;
        }
    }
}

export default iconCustomController;
