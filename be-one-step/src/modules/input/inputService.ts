import sequelize from '../../../config/database';
import CustomError from '../../../config/customError';
import inputRepository from './inputRepository';

export class inputService {
    // FEから受信する型宣言
    static async create(Data: {
        // 受け取る変数名：型;
        userId: string;
        customId: number;
        date: string;
        amount: number;
        memo: string;
    }) {
        const transaction = await sequelize.transaction();

        try {
            const [year, month, day] = Data.date.split('-').map(Number);
            // console.log('確認1', year);
            // console.log('確認2', month);
            // console.log('確認3', day);
            const resilt = await inputRepository.create(
                {
                    // DBカラム名： 受け取ったJSON名.中身名
                    unique_user_id: Data.userId,
                    custom_id: Data.customId,
                    amount: Data.amount,
                    year: year,
                    month: month,
                    day: day,
                    memo: Data.memo,
                },
                { transaction }
            );

            // トランザクションをコミット
            await transaction.commit();

            return {
                //返す変数名
                resilt,
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

export default inputService;
