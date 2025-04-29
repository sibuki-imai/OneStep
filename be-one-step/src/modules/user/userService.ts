import sequelize from '../../../config/database';
import CustomError from '../../../config/customError';
import userRepository from './userRepository';
import iconCustomRepository from '../iconCustom/iconCustomRepository';

export class userService {
    // FEから受信する型宣言
    static async registerUser(userData: {
        userId: string;
        userName: string;
        userEmail: string;
        invitationCode: string;
        invitationNumber: number;
    }) {
        const transaction = await sequelize.transaction();

        try {
            const user = await userRepository.createUser(
                {
                    unique_user_id: userData.userId,
                    name: userData.userName,
                    email: userData.userEmail,
                    invitation_id: userData.invitationNumber,
                    authority_flag: false,
                    registration_flag: false,
                },
                { transaction }
            );
            const unusedFlagUpdate = await userRepository.unusedFlagUpdate(
                {
                    invitation_id: userData.invitationNumber,
                    invitation_code: userData.invitationCode,
                    unused_flag: false,
                },
                { transaction }
            );

            const beginning = await iconCustomRepository.userBeginning(
                { unique_user_id: userData.userId },
                { transaction }
            );

            // トランザクションをコミット
            await transaction.commit();

            return { user, unusedFlagUpdate, beginning };
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
