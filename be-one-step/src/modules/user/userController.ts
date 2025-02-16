import { Request, Response } from 'express';
import CustomError from '../../../config/customError';
import userService from './userService';

export class userController {
    public static async UserAdd(req: Request, res: Response) {
        try {
            const { email, name } = req.body;

            const result = await userService.registerUser({
                email,
                name,
            });
            return res.status(200).json({
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
