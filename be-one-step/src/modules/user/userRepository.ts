import { UniqueConstraintError } from 'sequelize';
import User from '../../models/userModel';
import Invitation from '../../models/invitationModel';
import CustomError from '../../config/customError';

// userテーブルの型定義
interface UserType {
    unique_user_id: String;
    name: string;
    email: String;
    invitation_id: number;
    authority_flag: boolean;
    registration_flag: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null; // ソフトデリートされた場合の削除日時、nullの場合は削除されていない
}

interface InvitationType {
    invitation_id: number;
    invitation_code: String;
    unused_flag: Boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date | null; // ソフトデリートされた場合の削除日時、nullの場合は削除されていない
}

interface UserPromotionType {
    unique_user_id: string;
    registration_flag: boolean;
}

// Partial型の定義
export type PartialUserType = Partial<UserType>;
export type PartialInvitationType = Partial<InvitationType>;
export type PartialUserPromotionType = Partial<UserPromotionType>;

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

    static async unusedFlagUpdate(
        data: PartialInvitationType,
        options?: any
    ): Promise<InvitationType> {
        try {
            const [updatedCount, updatedRows] = await Invitation.update(
                { unused_flag: data.unused_flag },
                {
                    where: {
                        invitation_id: data.invitation_id,
                        invitation_code: data.invitation_code,
                    },
                    returning: true,
                    ...options,
                }
            );
            if (updatedCount === 0) {
                throw new CustomError({
                    name: '更新エラー',
                    message: '該当するInvitationが見つかりませんでした。',
                    status: 404,
                });
            }
            const updatedInvitation = await Invitation.findOne({
                where: {
                    invitation_id: data.invitation_id,
                    invitation_code: data.invitation_code,
                },
            });

            if (!updatedInvitation) {
                throw new CustomError({
                    name: 'データ取得エラー',
                    message: '更新後のデータを取得できませんでした。',
                    status: 500,
                });
            }

            return updatedInvitation.get() as InvitationType;
        } catch (error) {
            console.error('入力内容に問題があります。(Repository)', error);
            throw new CustomError({
                name: '作成エラー',
                message: 'エラーメッセージ:入力内容に問題があります。',
                status: 400,
            });
        }
    }

    static async Promotion(
        data: PartialUserPromotionType,
        options?: any
    ): Promise<boolean> {
        try {
            await User.update(
                { registration_flag: true },
                {
                    where: {
                        unique_user_id: data.unique_user_id,
                    },
                    ...options,
                }
            );

            return true;
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
