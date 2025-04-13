import { NumberDataType, UniqueConstraintError } from 'sequelize';
import Icon from '../../models/iconModel';
import IconCustom from '../../models/iconCustomModel';
import CustomError from '../../../config/customError';

// userテーブルの型定義
interface RegistrationType {
    // カラム名:　型名；
    icon_id: number;
    icon_naming: string;
    fixed_amount: number;
    user_saving: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null; // ソフトデリートされた場合の削除日時、nullの場合は削除されていない
}

// Partial型の定義
export type PartialRegistrationType = Partial<RegistrationType>;

class demoRepository {
    static async iconRegistration(
        data: PartialRegistrationType,
        options?: any
    ): Promise<RegistrationType> {
        try {
            const demodata = await IconCustom.create(data, options);

            if (!demodata) {
                throw new Error('Demo作成できませんでした');
            }

            return demodata.get() as RegistrationType; // get()を使用してデータを取得
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

export default demoRepository;
