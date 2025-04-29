import CustomIcon from '../models/iconCustomModel'; // モデルのインポート

// UserTBに初期データを挿入する関数
const seedCustomIcon = async () => {
    try {
        // 既存のデータがあれば全て削除
        await CustomIcon.destroy({ where: {} });

        // 仮データの挿入
        await CustomIcon.bulkCreate([
            // {
            //     unique_user_id: `${process.env.USER_ID}`,
            //     icon_id: 1,
            //     user_icon_number: 1,
            //     icon_naming: '日用品',
            //     fixed_amount: 10000,
            //     user_saving: 0,
            // },
            // {
            //     unique_user_id: `${process.env.USER_ID}`,
            //     icon_id: 3,
            //     user_icon_number: 3,
            //     icon_naming: '災害',
            //     fixed_amount: 10000,
            //     user_saving: 0,
            // },
        ]);

        console.log('CustomIconの初期データを挿入しました。');
    } catch (error) {
        console.error('CustomIconの初期データを挿入できませんでした。:', error);
    }
};

export default seedCustomIcon;
