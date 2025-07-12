import Invitation from '../models/invitationModel'; // モデルのインポート

// UserTBに初期データを挿入する関数
const seedInvitation = async () => {
    try {
        if (process.env.DBRESET === 'true') {
            // 既存のデータがあれば全て削除
            await Invitation.destroy({ where: {} });

            // 仮データの挿入
            await Invitation.bulkCreate([
                {
                    invitation_code: `${process.env.ADM_PASS}`,
                    unused_flag: false,
                },
                {
                    invitation_code: `${process.env.USER_PASS}`,
                    unused_flag: false,
                },
                {
                    invitation_code: `${process.env.USER_TEST1}`,
                    unused_flag: true,
                },
                {
                    invitation_code: `${process.env.USER_TEST2}`,
                    unused_flag: false,
                },
            ]);

            console.log('Invitationの初期データを挿入しました。');
        } else {
            console.log('Invitationのデータを引継ぎました。');
        }
    } catch (error) {
        console.error('Invitationの初期データを挿入できませんでした。:', error);
    }
};

export default seedInvitation;
