import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'mysql',
        logging: false, // ログを表示しない
    }
);

const runSeeders = async (): Promise<void> => {
    // 各シーダーのインポート（必要な初期データを挿入するスクリプト）
    const { default: invitationSeeder } = await import(
        '../src/seeders/invitationSeeder'
    );
    const { default: userSeeder } = await import('../src/seeders/userSeeder');
    const { default: iconSeeder } = await import('../src/seeders/iconSeeder');
    const { default: custoIconSeeder } = await import(
        '../src/seeders/customIconSeeder'
    );

    // 各シーダーの実行、初期データ挿入（挿入順）
    await invitationSeeder();
    await userSeeder();
    await iconSeeder();
    await custoIconSeeder();
};

const syncDatabase = async (): Promise<void> => {
    try {
        // DB接続を確認
        await sequelize.authenticate();
        console.log('データベースと接続しました。');

        // DB同期を実行
        // force: false でテーブルが存在しない場合のみ作成
        // force: true で毎回削除し、新しく作成
        if (process.env.DBRESET === 'true') {
            // 毎回リセット
            console.log('リセット');
            await sequelize.sync({ force: true });
        } else if (process.env.DBRESET === 'false') {
            // 引継ぎ
            console.log('引継ぎ');
            await sequelize.sync({ force: false });
        } else {
            // 本番環境向け
            console.log('本番');
            await sequelize.sync({ alter: true });
        }

        console.log('同期しました。');

        // 初期データの挿入を実行
        await runSeeders();
    } catch (error) {
        // エラーが発生した場合、エラーメッセージを出力
        console.error('データベースとの接続・同期ができませんでした。:', error);
    }
};
if (process.env.NODE_ENV === 'development') {
    syncDatabase();
}
export default sequelize;
