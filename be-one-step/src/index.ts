import dotenv from 'dotenv';
import app from './App';
import pool from './config/database';

dotenv.config();

const PORT = process.env.BE_DOMAIN || '';

const startServer = async () => {
    try {
        // データベース接続を確認
        const connection = await pool.getConnection();
        console.log('DBの接続を行います。');
        connection.release(); // 接続を解放

        // サーバーを起動
        app.listen(PORT, () => {
            console.log(`起動中 ${PORT}`);
        });
    } catch (error) {
        console.error('接続エラー:', error);
    }
};

startServer();
