import Icon from '../models/iconModel'; // モデルのインポート

// UserTBに初期データを挿入する関数
const seedIcon = async () => {
    try {
        // 既存のデータがあれば全て削除
        await Icon.destroy({ where: {} });

        // 仮データの挿入
        await Icon.bulkCreate([
            {
                icon_image_name: '食費',
                icon_path: 'img/food.png',
            },
            {
                icon_image_name: '日用品',
                icon_path: 'img/dailyNecessities.png',
            },
            {
                icon_image_name: '衣服費',
                icon_path: 'img/clothes.png',
            },
            {
                icon_image_name: '美容費',
                icon_path: 'img/beauty.png',
            },
            {
                icon_image_name: '学習費',
                icon_path: 'img/study.png',
            },
            {
                icon_image_name: '家賃',
                icon_path: 'img/rent.png',
            },
            {
                icon_image_name: '熱費',
                icon_path: 'img/gas.png',
            },
            {
                icon_image_name: '水道費',
                icon_path: 'img/waterSupply.png',
            },
            {
                icon_image_name: '光費',
                icon_path: 'img/electricity.png',
            },
            {
                icon_image_name: '通信費',
                icon_path: 'img/communication.png',
            },
            {
                icon_image_name: '小遣い',
                icon_path: 'img/pocketMoney.png',
            },
            {
                icon_image_name: '医療費',
                icon_path: 'img/medicalCare.png',
            },
            {
                icon_image_name: '交通費',
                icon_path: 'img/traffic.png',
            },
            {
                icon_image_name: '貯金',
                icon_path: 'img/saving.png',
            },
        ]);

        console.log('Iconの初期データを挿入しました。');
    } catch (error) {
        console.error('Iconの初期データを挿入できませんでした。:', error);
    }
};

export default seedIcon;
