import sequelize from '../../../config/database';
import CustomError from '../../../config/customError';
import iconCustomRepository from './iconCustomRepository';
// import CustomIcon from '../../models/iconCustomModel';
import nextIconNumber from './userIconNumberGet';

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
            const userIconNumber = await nextIconNumber(
                iconRegistration.userId
            );

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
                    custom_id: userData.deletenumber,
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
    static async oneGet(getitem: {
        // 受け取る変数名：型;
        userId: string;
        customId: number;
    }) {
        const transaction = await sequelize.transaction();

        try {
            const result = await iconCustomRepository.oneGet({
                // DBカラム名： 受け取ったJSON名.中身名
                unique_user_id: getitem.userId,
                custom_id: getitem.customId,
            });

            // トランザクションをコミット
            await transaction.commit();

            return {
                //返す変数名
                result,
            };
        } catch (error) {
            // エラーが発生した場合、トランザクションをロールバック
            await transaction.rollback();
            console.error('情報の取得取得に失敗しました(Service)', error);

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
    // 修正
    static async itemChange(changeitem: {
        // 受け取る変数名：型;
        userId: string;
        iconId: number;
        customId: number;
        iconNaming: string;
        fixedAmount: number;
        userSaving: number;
    }) {
        const transaction = await sequelize.transaction();

        try {
            const itemChange = await iconCustomRepository.itemChange(
                {
                    // DBカラム名： 受け取ったJSON名.中身名
                    unique_user_id: changeitem.userId,
                    custom_id: changeitem.customId,
                    icon_id: changeitem.iconId,
                    icon_naming: changeitem.iconNaming,
                    fixed_amount: changeitem.fixedAmount,
                    user_saving: changeitem.userSaving,
                },
                { transaction }
            );

            // トランザクションをコミット
            await transaction.commit();

            return {
                //返す変数名
                itemChange,
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

    static async registration(registration: {
        userId: string;
        registrationDete: any[];
    }) {
        const transaction = await sequelize.transaction();
        try {
            const list = registration.registrationDete;
            const Updata = list.map((item) => ({
                ...item,
                unique_user_id: registration.userId,
            }));

            // 新規作成リスト
            const newList = Updata.filter((item) => item.tentative === true);
            const judgmentNewList = newList.length;

            if (judgmentNewList > 0) {
                const userId = registration.userId;
                const nextCustomNumber = await nextIconNumber(userId);

                const numberList = Array.from(
                    { length: judgmentNewList },
                    (_, i) => nextCustomNumber + i
                );

                const NewNumberList = newList.map((item, index) => ({
                    unique_user_id: item.unique_user_id,
                    icon_id: item.icon_id,
                    user_icon_number: numberList[index],
                    icon_naming: item.icon_naming,
                    fixed_amount: item.fixed_amount,
                    user_saving: item.user_saving,
                    tentative: false,
                }));

                // console.log('新規', NewNumberList);

                await iconCustomRepository.newIconCustomList(NewNumberList, {
                    transaction,
                });
            }

            //上書きリスト
            const upDataList = Updata.filter(
                (item) => item.tentative === false
            );

            const judgmentUpDataList = upDataList.length;
            if (judgmentUpDataList > 0) {
                // console.log('上書き', upDataList);

                await iconCustomRepository.upDataIconCustomList(upDataList, {
                    transaction,
                });
            }
            //-------

            // トランザクションをコミット
            await transaction.commit();
            const result = true;
            return {
                //返す変数名
                result,
            };
        } catch (error) {
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
