import User from '../models/userModel'; // Userモデルのインポート

// UserTBに初期データを挿入する関数
const seedUser = async () => {
    try {
        // 既存のデータがあれば全て削除
        await User.destroy({ where: {} });

        // 仮データの挿入
        await User.bulkCreate([
            {
                unique_user_id: '00000000-0000-0000-0000-000000000000',
                email: 'ad.min@jp',
                name: 'あどみん',
                passkey: '000-000',
                authority_flag: 7,
            },
            {
                unique_user_id: '550e8400-e29b-41d4-a716-446655440001',
                email: 'gavi.brown@jp',
                name: '山田太郎',
                passkey: '000-001',
                authority_flag: 0,
            },
        ]);

        console.log('Userの初期データを挿入しました。');
    } catch (error) {
        console.error('Userの初期データを挿入できませんでした。:', error);
    }
};

export default seedUser;
