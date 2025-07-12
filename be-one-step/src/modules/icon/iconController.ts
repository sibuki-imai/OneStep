import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import iconModel from '../../models/iconModel';

dotenv.config();
export class iconController {
    public static async allIcon(req: Request, res: Response): Promise<void> {
        try {
            const result = await iconModel.findAll({
                attributes: ['icon_id', 'icon_image_name', 'icon_path'],
            });

            const arrange = result.map((item) => item.get({ plain: true }));
            // console.log('確認', arrange);

            res.status(200).json({
                message: '情報の取得に成功しました',
                data: arrange,
            });
        } catch (error) {
            console.log('情報の取得に失敗しました');
            res.status(400).json({
                message: '情報の取得に失敗しました',
            });
            return;
        }
    }
}

export default iconController;
