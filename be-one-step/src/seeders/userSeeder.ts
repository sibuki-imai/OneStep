import User from '../models/userModel'; // モデルのインポート

// UserTBに初期データを挿入する関数
const seedUser = async () => {
    try {
        if (process.env.DBRESET === 'true') {
            // 既存のデータがあれば全て削除
            await User.destroy({ where: {} });

            // 仮データの挿入
            await User.bulkCreate([
                {
                    unique_user_id: `${process.env.ADM_UNIQUE}`,
                    email: 'ad.min@jp',
                    name: 'あどみん',
                    invitation_id: 1,
                    authority_flag: true,
                    registration_flag: true,
                    email_flag: false,
                },

                {
                    unique_user_id: `${process.env.USER_ID}`,
                    email: `${process.env.USER_EMAIL}`,
                    name: `${process.env.USER_NAME}`,
                    invitation_id: 2,
                    authority_flag: false,
                    registration_flag: false,
                    email_flag: false,
                },
            ]);

            console.log('Userの初期データを挿入しました。');
        } else {
            console.log('Userのデータを引継ぎました。');
        }
    } catch (error) {
        console.error('Userの初期データを挿入できませんでした。:', error);
    }
};

export default seedUser;
