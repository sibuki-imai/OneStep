import { UniqueConstraintError } from 'sequelize';
import Demo from '../../models/demoModel';
import CustomError from '../../../config/customError';

// userテーブルの型定義
interface DemoType {
    // カラム名:　型名；
    // 下記基本
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null; // ソフトデリートされた場合の削除日時、nullの場合は削除されていない
}

// Partial型の定義
export type PartialDemoType = Partial<DemoType>;

class demoRepository {
    static async demo(data: PartialDemoType, options?: any): Promise<DemoType> {
        try {
            const demodata = await Demo.create(data, options);

            if (!demodata) {
                throw new Error('Demo作成できませんでした');
            }

            return demodata.get() as DemoType; // get()を使用してデータを取得
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
