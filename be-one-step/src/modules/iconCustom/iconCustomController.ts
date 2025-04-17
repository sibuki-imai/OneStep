import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import iconService from './iconCustomSevice';
import Icon from '../../models/iconModel';

dotenv.config();
export class iconController {
    public static async conRegistration(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const { iconName, naming, amount, saving } = req.body;

            const iconId = await Icon.findOne({
                where: { icon_image_name: iconName },
                attributes: ['icon_id'],
            });

            if (!iconId) {
                res.status(202).json({
                    message: 'iconが取得できませんでした',
                });
                return;
            }
            console.log('出力', iconId.dataValues.icon_id);
            const iconID = iconId.dataValues.icon_id;

            const result = await iconService.iconRegistration({
                iconID,
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
