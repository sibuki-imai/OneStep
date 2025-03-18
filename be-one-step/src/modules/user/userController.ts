import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import CustomError from '../../../config/customError';
import userService from './userService';
import User from '../../models/userModel';
import Invitation from '../../models/invitationModel';
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
            // if (!passcheck) {
            // throw new CustomError({
            //     name: '招待コードエラー',
            //     message: '招待コードが異なります。',
            //     status: 400,
            // });
            // }
            if (!passcheck) {
                console.log('招待コードが異なります');
                res.status(400).json({
                    message: '招待コードが異なります',
                });
                return;
            }

            const judgment = await User.findOne({
                where: { unique_user_id: userId },
            });

            // if (judgment) {
            // throw new CustomError({
            //     name: '作成エラー',
            //     message: '既に作成済みです',
            //     status: 400,
            // });
            // }
            if (judgment) {
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
            // if (!usecheck) {
            // throw new CustomError({
            //     name: '招待コードエラー',
            //     message: '招待コードは使用済みです。',
            //     status: 400,
            // });
            // }
            // console.log('usercheck：', usecheck?.dataValues);

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
}

export default userController;
