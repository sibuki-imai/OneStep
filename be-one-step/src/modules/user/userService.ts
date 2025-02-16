// import { v4 as uuidv4 } from 'uuid';
import sequelize from '../../../config/database';
import CustomError from '../../../config/customError';
import User from '../../models/userModel';
import userRepository from './userRepository';

export class userService {
    // FEから受信する型宣言
    static async registerUser(userData: { email: string; name: string }) {
        const transaction = await sequelize.transaction();
        try {
            const user = await userRepository.createUser(
                {
                    email: userData.email,
                    name: userData.name,
                },
                { transaction }
            );

            // トランザクションをコミット
            await transaction.commit();

            return { user };
        } catch (error) {
            // エラーが発生した場合、トランザクションをロールバック
            await transaction.rollback();
            console.error('情報の保存に失敗しました(Service)', error);

            if (error instanceof CustomError) {
                throw error; // CustomErrorのステータスとメッセージをそのまま投げる
            }

            throw new CustomError({
                name: '作成エラー',
                message: 'データベースへの保存で問題が発生しました',
                status: 500, // 予期しないエラーの場合は500を投げる
            });
        }
    }
}

export default userService;
