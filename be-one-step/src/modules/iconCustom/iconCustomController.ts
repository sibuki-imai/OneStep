import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import iconCustomService from './iconCustomSevice';
import Icon from '../../models/iconModel';
import idAcquisition from '../certification/idAcquisition';

dotenv.config();
export class iconCustomController {
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
        } catch (error) {}
    }
}

export default iconCustomController;
