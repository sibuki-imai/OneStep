import Icon from '../../models/iconModel';
import IconCustomModel from '../../models/iconCustomModel';
import CustomError from '../../../config/customError';

interface iconType {
    // カラム名:　型名；
    icon_image_name: string;
    icon_path: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null; // ソフトデリートされた場合の削除日時、nullの場合は削除されていない
}

interface RegistrationType {
    // カラム名:　型名；
    unique_user_id: string;
    icon_id: number;
    user_icon_number: number;
    icon_naming: string;
    fixed_amount: number;
    user_saving: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null; // ソフトデリートされた場合の削除日時、nullの場合は削除されていない
}
interface SettingsType {
    unique_user_id: string;
}
interface pathType {
    icon_id: number;
    user_icon_number: number;
    icon_naming: string;
    fixed_amount: number;
    user_saving: number;
    iconId?: {
        icon_path: string;
    };
}
// Partial型の定義

export type PartialiconType = Partial<iconType>;
export type PartialRegistrationType = Partial<RegistrationType>;
export type PartialSettingsType = Partial<SettingsType>;
export type PartialpathType = Partial<pathType>;

class iconCustomRepository {
    // 単発追加
    static async iconRegistration(
        data: PartialRegistrationType,
        options?: any
    ): Promise<RegistrationType> {
        try {
            const customIcondata = await IconCustomModel.create(data, options);

            if (!customIcondata) {
                throw new Error('customIcon作成できませんでした');
            }

            return customIcondata.get() as RegistrationType; // get()を使用してデータを取得
        } catch (error) {
            console.error('入力内容に問題があります。(Repository)', error);
            throw new CustomError({
                name: '作成エラー',
                message: 'エラーメッセージ:入力内容に問題があります。',
                status: 400,
            });
        }
    }
    // 初期登録時の一括追加
    static async userBeginning(
        data: PartialSettingsType,
        options?: any
    ): Promise<RegistrationType[]> {
        try {
            const customIcondata = await IconCustomModel.bulkCreate(
                [
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 1,
                        user_icon_number: 1,
                        icon_naming: '食費',
                        fixed_amount: 30000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 2,
                        user_icon_number: 2,
                        icon_naming: '日用品',
                        fixed_amount: 3000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 3,
                        user_icon_number: 3,
                        icon_naming: '衣服費',
                        fixed_amount: 3000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 4,
                        user_icon_number: 4,
                        icon_naming: '美容費',
                        fixed_amount: 3000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 5,
                        user_icon_number: 5,
                        icon_naming: '学習費',
                        fixed_amount: 5000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 6,
                        user_icon_number: 6,
                        icon_naming: '家賃',
                        fixed_amount: 80000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 7,
                        user_icon_number: 7,
                        icon_naming: 'ガス代',
                        fixed_amount: 3000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 8,
                        user_icon_number: 8,
                        icon_naming: '水道代',
                        fixed_amount: 3000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 9,
                        user_icon_number: 9,
                        icon_naming: '電気代',
                        fixed_amount: 5000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 10,
                        user_icon_number: 10,
                        icon_naming: '通信費',
                        fixed_amount: 5000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 11,
                        user_icon_number: 11,
                        icon_naming: '小遣い',
                        fixed_amount: 20000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 12,
                        user_icon_number: 12,
                        icon_naming: '医療費',
                        fixed_amount: 10000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 13,
                        user_icon_number: 13,
                        icon_naming: '交通費',
                        fixed_amount: 10000,
                        user_saving: 0,
                    },
                    {
                        unique_user_id: data.unique_user_id,
                        icon_id: 14,
                        user_icon_number: 14,
                        icon_naming: '貯金',
                        fixed_amount: 20000,
                        user_saving: 0,
                    },
                ],
                options
            );

            if (!customIcondata) {
                throw new Error('customIcon作成できませんでした');
            }

            return customIcondata.map((item) =>
                item.get()
            ) as RegistrationType[]; // 返すのは型記述の済んでいる方
        } catch (error) {
            console.error('入力内容に問題があります。(Repository)', error);
            throw new CustomError({
                name: '作成エラー',
                message: 'エラーメッセージ:入力内容に問題があります。',
                status: 400,
            });
        }
    }

    static async currentSituation(data: PartialSettingsType) {
        try {
            const currentSituation = await IconCustomModel.findAll({
                where: { unique_user_id: data.unique_user_id },
                attributes: [
                    'icon_id',
                    'user_icon_number',
                    'icon_naming',
                    'fixed_amount',
                    'user_saving',
                ],
                include: [
                    {
                        model: Icon,
                        as: 'iconId',
                        attributes: ['icon_path'], // 外部テーブルから欲しいカラム
                    },
                ],
                order: [['user_icon_number', 'ASC']],
            });

            // console.log('開始');
            // console.log(currentSituation);
            // console.log('終了');
            if (!currentSituation) {
                throw new Error('情報の取得ができませんでした');
            }

            const result = currentSituation.map((item) => {
                const custom = item.get({ plain: true }) as pathType;
                return {
                    ...custom,
                    icon_path: custom.iconId?.icon_path ?? null,
                };
            });

            const challenge = result.map((item) => ({
                icon_id: item.icon_id,
                user_icon_number: item.user_icon_number,
                icon_naming: item.icon_naming,
                fixed_amount: item.fixed_amount,
                user_saving: item.user_saving,
                icon_path: item.icon_path,
            }));

            // console.log('開始');
            // console.log(challenge);
            // console.log('終了');
            return challenge;
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

export default iconCustomRepository;
