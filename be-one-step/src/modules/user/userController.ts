import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import CustomError from '../../../config/customError';
import userService from './userService';
import User from '../../models/userModel';
import Invitation from '../../models/invitationModel';
import idAcquisition from '../certification/idAcquisition';

dotenv.config();
export class userController {
    public static async Registration(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const { userId, userName, userEmail, invitationCode } = req.body;
            const passcheck = await Invitation.findOne({
                where: { invitation_code: invitationCode },
            });

            if (!passcheck) {
                console.log('招待コードが異なります');
                res.status(400).json({
                    message: '招待コードが異なります',
                });
                return;
            }

            const judgmentId = await User.findOne({
                where: { unique_user_id: userId },
            });

            if (judgmentId) {
                console.log('こちらのアカウントは作成済みです');
                res.status(400).json({
                    message: 'こちらのアカウントは作成済みです',
                });
                return;
            }
            const judgmentEmail = await User.findOne({
                where: { email: userEmail },
            });
            if (judgmentEmail) {
                console.log('こちらのアカウントは作成済みです');
                res.status(400).json({
                    message: 'こちらのアカウントは作成済みです',
                });
                return;
            }

            const usecheck = await Invitation.findOne({
                where: { invitation_code: invitationCode, unused_flag: true },
                attributes: ['invitation_id', 'invitation_code', 'unused_flag'],
            });

            if (!usecheck) {
                console.log('入力された招待コードは使用済みです');
                res.status(400).json({
                    message: '入力された招待コードは使用済みです',
                });
                return;
            }
            const invitationNumber = usecheck?.dataValues.invitation_id;

            const result = await userService.registerUser({
                userId,
                userName,
                userEmail,
                invitationNumber,
                invitationCode,
            });
            res.status(200).json({
                message: 'ユーザー登録が成功しました',
                data: result,
            });
        } catch (error) {
            console.error('エラーの内容:', error);
            throw new CustomError({
                name: '作成エラー',
                message:
                    'エラーが発生しました。時間をおいてもう一度お試しください。',
                status: 400,
            });
        }
    }

    public static async Promotion(req: Request, res: Response): Promise<void> {
        try {
            const userId = await idAcquisition(req);

            const result = await userService.Promotion({
                // serviceに送信する情報
                userId,
            });

            res.status(200).json({
                message: '本登録が成功しました',
                data: result,
            });
        } catch (error) {
            console.log('設定に失敗しました', error);
            res.status(400).json({
                message: '設定に失敗しました',
            });
            return;
        }
    }
}

export default userController;
