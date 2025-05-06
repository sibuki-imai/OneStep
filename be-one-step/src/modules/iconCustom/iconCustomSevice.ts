import sequelize from '../../../config/database';
import CustomError from '../../../config/customError';
import iconCustomRepository from './iconCustomRepository';
import CustomIcon from '../../models/iconCustomModel';

export class iconCustomService {
    // FEから受信する型宣言
    static async iconRegistration(iconRegistration: {
        // 受け取る変数名：型;
        userId: string;
        iconId: number;
        naming: string;
        amount: number;
        saving: number;
    }) {
        const transaction = await sequelize.transaction();

        try {
            const judgment = await CustomIcon.findOne({
                where: { unique_user_id: iconRegistration.userId },
                attributes: ['user_icon_number'],
                order: [['user_icon_number', 'DESC']],
            });
            // console.log('テスト', judgment?.dataValues.user_icon_number);
            const userIconNumber = judgment?.dataValues.user_icon_number + 1;
            const customIconRegistration =
                await iconCustomRepository.iconRegistration(
                    {
                        // DBカラム名： 受け取ったJSON名.中身名
                        unique_user_id: iconRegistration.userId,
                        icon_id: iconRegistration.iconId,
                        user_icon_number: userIconNumber,
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
                customIconRegistration,
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

    static async currentSituation(userData: {
        // 受け取る変数名：型;
        userId: string;
    }) {
        try {
            const currentSituation =
                await iconCustomRepository.currentSituation({
                    // DBカラム名： 受け取ったJSON名.中身名
                    unique_user_id: userData.userId,
                });

            return {
                //返す変数名
                currentSituation,
            };
        } catch (error) {
            // エラーが発生した場合、トランザクションをロールバック
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

    //　削除
    static async itemDelete(userData: {
        // 受け取る変数名：型;
        userId: string;
        deletenumber: number;
    }) {
        const transaction = await sequelize.transaction();

        try {
            const itemDelete = await iconCustomRepository.itemDelete(
                {
                    // DBカラム名： 受け取ったJSON名.中身名
                    unique_user_id: userData.userId,
                    user_icon_number: userData.deletenumber,
                },
                { transaction }
            );

            // トランザクションをコミット
            await transaction.commit();

            return {
                //返す変数名
                itemDelete,
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

export default iconCustomService;
