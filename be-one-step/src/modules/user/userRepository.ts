import { UniqueConstraintError } from 'sequelize';
import User from '../../models/userModel';
import CustomError from '../../../config/customError';

// userテーブルの型定義
interface UserType {
    unique_user_id: String;
    email: String;
    name: string;
    passkey: string;
    authority_flag: Number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null; // ソフトデリートされた場合の削除日時、nullの場合は削除されていない
}

// Partial型の定義
export type PartialUserType = Partial<UserType>;

class userRepository {
    static async createUser(
        data: PartialUserType,
        options?: any
    ): Promise<UserType> {
        try {
            const userdata = await User.create(data, options);

            if (!userdata) {
                throw new Error('User作成できませんでした');
            }

            // 作成したuserInfoのデータをオブジェクト形式で取得して返す
            return userdata.get() as UserType; // get()を使用してデータを取得
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
export default userRepository;
