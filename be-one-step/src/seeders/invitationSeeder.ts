import Invitation from '../models/invitationModel'; // Userモデルのインポート

// UserTBに初期データを挿入する関数
const seedInvitation = async () => {
    try {
        // 既存のデータがあれば全て削除
        await Invitation.destroy({ where: {} });

        // 仮データの挿入
        await Invitation.bulkCreate([
            {
                invitation_code: `${process.env.ADM_PASS}`,
                use_flag: false,
            },
            {
                invitation_code: `${process.env.USER_PASS}`,
                use_flag: true,
            },
        ]);

        console.log('Invitationの初期データを挿入しました。');
    } catch (error) {
        console.error('Invitationの初期データを挿入できませんでした。:', error);
    }
};

export default seedInvitation;
