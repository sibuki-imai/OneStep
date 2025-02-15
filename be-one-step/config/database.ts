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
    // const { default: userSeeder } = await import('../seeders/userSeeder');
    // const { default: seedamount } = await import('../seeders/userInputSeeder');
    // 各シーダーの実行、初期データ挿入（挿入順）
    // await userSeeder();
    // await seedamount();
};

const syncDatabase = async (): Promise<void> => {
    try {
        // DB接続を確認
        await sequelize.authenticate();
        console.log('データベースと接続しました。');

        // DB同期を実行
        // force: false でテーブルが存在しない場合のみ作成
        // force: true で毎回削除し、新しく作成
        await sequelize.sync({ force: true });
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
