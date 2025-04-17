import sequelize from '../../../config/database';
import CustomError from '../../../config/customError';
import iconRepository from './iconCustomRepository';

export class iconService {
    // FEから受信する型宣言
    static async iconRegistration(iconRegistration: {
        // 受け取る変数名：型;
        iconID: number;
        naming: string;
        amount: number;
        saving: number;
    }) {
        const transaction = await sequelize.transaction();

        try {
            const demo = await iconRepository.iconRegistration(
                {
                    // DBカラム名： 受け取ったJSON名.中身名
                    // icon_id: iconRegistration.iconId,
                    icon_naming: iconRegistration.naming,
                    fixed_amount: iconRegistration.amount,
                    user_saving: iconRegistration.saving,
                },
                { transaction }
            );

            // トランザクションをコミット
            await transaction.commit();

            return {
                //返す変数名
                demo,
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

export default iconService;
