import { UniqueConstraintError } from 'sequelize';
import UserInput from '../../models/userInputModel';
import UserCustom from '../../models/iconCustomModel';
import CustomError from '../../config/customError';
import IconModel from '../../models/iconModel';

// userテーブルの型定義
interface InputType {
    // カラム名:　型名；
    unique_user_id: string;
    custom_id: number;
    amount: number;
    year: number;
    month: number;
    day: number;
    memo: string;
    // 下記基本
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
}

interface OneGetType {
    money_id: number;
    unique_user_id: string;
}

interface ResultType {
    money_id: number;
    custom_id: number;
    amount: number;
    year: number;
    month: number;
    day: number;
    memo: string;
    icon_path: string;
}

interface CorrectionType {
    // カラム名:　型名；
    unique_user_id: string;
    money_id: number;
    amount: number;
    year: number;
    month: number;
    day: number;
    memo: string;
}

// Partial型の定義
export type PartialInputType = Partial<InputType>;
export type PartialOneGetType = Partial<OneGetType>;
export type PartialResultType = Partial<ResultType>;
export type PartialCorrectionType = Partial<CorrectionType>;

class inputRepository {
    static async create(
        data: PartialInputType,
        options?: any
    ): Promise<InputType> {
        try {
            const inputdata = await UserInput.create(data, options);

            if (!inputdata) {
                throw new Error('登録できませんでした');
            }

            const moneyOverwrite = await UserCustom.findOne({
                where: {
                    unique_user_id: data.unique_user_id,
                    custom_id: data.custom_id,
                },
                attributes: ['user_saving'],
            });

            if (!moneyOverwrite || !data.amount) {
                throw new Error('登録できませんでした');
            }

            const difference =
                moneyOverwrite.dataValues.user_saving - data.amount;
            if (difference == null) {
                throw new Error('登録できませんでした');
            }
            const overwrite = await UserCustom.update(
                { user_saving: difference },
                {
                    where: {
                        unique_user_id: data.unique_user_id,
                        custom_id: data.custom_id,
                    },
                    returning: true,
                    ...options,
                }
            );
            if (!overwrite) {
                throw new Error('登録できませんでした');
            }

            return inputdata.get() as InputType; // get()を使用してデータを取得
        } catch (error) {
            console.error('入力内容に問題があります。(Repository)', error);
            throw new CustomError({
                name: '作成エラー',
                message: 'エラーメッセージ:入力内容に問題があります。',
                status: 400,
            });
        }
    }

    // 編集Get
    static async oneGet(data: PartialOneGetType): Promise<ResultType> {
        try {
            const inputdata = await UserInput.findOne({
                where: {
                    unique_user_id: data.unique_user_id,
                    money_id: data.money_id,
                },
                attributes: [
                    'money_id',
                    'custom_id',
                    'amount',
                    'year',
                    'month',
                    'day',
                    'memo',
                ],
            });

            if (!inputdata) {
                throw new CustomError({
                    name: '取得エラー',
                    message: 'エラーメッセージ:取得に問題が発生しました。',
                    status: 400,
                });
            }
            // console.log('確認', inputdata.dataValues);

            const path = await UserCustom.findOne({
                where: {
                    unique_user_id: data.unique_user_id,
                    custom_id: inputdata.dataValues.custom_id,
                },
                attributes: ['icon_id', 'icon_naming'],
                include: [
                    {
                        model: IconModel,
                        as: 'iconId',
                        attributes: ['icon_path'],
                        required: true,
                    },
                ],
            });

            if (!path) {
                console.log('icon_path取得失敗');
                throw new CustomError({
                    name: '取得エラー',
                    message: 'エラーメッセージ:取得に問題が発生しました。',
                    status: 400,
                });
            }

            const result = {
                ...inputdata.dataValues,
                ...path.dataValues.iconId.dataValues,
                icon_naming: path.dataValues.icon_naming,
            };
            // console.log(result);

            return result;
            // return inputdata.get() as InputType; // get()を使用してデータを取得
        } catch (error) {
            console.error('入力内容に問題があります。(Repository)', error);
            throw new CustomError({
                name: '作成エラー',
                message: 'エラーメッセージ:入力内容に問題があります。',
                status: 400,
            });
        }
    }

    // 編集

    static async correction(
        data: PartialCorrectionType,
        options?: any
    ): Promise<PartialCorrectionType> {
        try {
            const [affectedCount] = await UserInput.update(
                {
                    amount: data.amount,
                    year: data.year,
                    month: data.month,
                    day: data.day,
                    memo: data.memo,
                },
                {
                    where: {
                        unique_user_id: data.unique_user_id,
                        money_id: data.money_id,
                    },
                    ...options,
                }
            );

            if (affectedCount === 0) {
                throw new Error('更新できませんでした');
            }

            // 更新後のレコードを取得して返す
            const updated = await UserInput.findOne({
                where: {
                    unique_user_id: data.unique_user_id,
                    money_id: data.money_id,
                },
            });

            if (!updated) {
                throw new Error('更新後のレコードが見つかりません');
            }

            return updated as PartialCorrectionType;
        } catch (error) {
            console.error('入力内容に問題があります。(Repository)', error);
            throw new CustomError({
                name: '作成エラー',
                message: 'エラーメッセージ:入力内容に問題があります。',
                status: 400,
            });
        }
    }
}

export default inputRepository;
