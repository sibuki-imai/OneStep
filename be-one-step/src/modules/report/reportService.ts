import sequelize from '../../config/database';
import CustomError from '../../config/customError';
import inputRepository from './reportRepository';

export class reportService {
    static async allGet(userData: {
        // 受け取る変数名：型;
        userId: string;
        year: number;
        month: number;
        customId?: number;
    }) {
        const transaction = await sequelize.transaction();

        try {
            const result = await inputRepository.allGet(
                {
                    // DBカラム名： 受け取ったJSON名.中身名
                    unique_user_id: userData.userId,
                    year: userData.year,
                    month: userData.month,
                    custom_id: userData.customId,
                },
                { transaction }
            );

            // トランザクションをコミット
            await transaction.commit();

            return {
                //返す変数名
                result,
            };
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

export default reportService;
