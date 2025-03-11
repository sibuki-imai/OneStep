import User from '../models/userModel'; // Userモデルのインポート

// UserTBに初期データを挿入する関数
const seedUser = async () => {
    try {
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
            },
        ]);

        console.log('Userの初期データを挿入しました。');
    } catch (error) {
        console.error('Userの初期データを挿入できませんでした。:', error);
    }
};

export default seedUser;
