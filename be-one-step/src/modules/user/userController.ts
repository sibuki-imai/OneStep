import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import CustomError from '../../../config/customError';
import userService from './userService';
import User from '../../models/userModel';
dotenv.config();
export class userController {
    public static async Registration(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const { userId, userName, userEmail, invitationCode } = req.body;
            const judgment = await User.findOne({
                where: { unique_user_id: userId },
            });

            if (judgment) {
                throw new CustomError({
                    name: '作成エラー',
                    message: '既に作成済みです',
                    status: 400,
                });
            }

            const result = await userService.registerUser({
                userId,
                userName,
                userEmail,
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
                message: 'エラーメッセージ:入力内容に問題があります。',
                status: 400,
            });
        }
    }
}

export default userController;
