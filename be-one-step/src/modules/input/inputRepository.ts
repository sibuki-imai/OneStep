import { UniqueConstraintError } from 'sequelize';
import UserInput from '../../models/userInputModel';
import UserCustom from '../../models/iconCustomModel';
import CustomError from '../../../config/customError';

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

// Partial型の定義
export type PartialInputType = Partial<InputType>;

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
}

export default inputRepository;
