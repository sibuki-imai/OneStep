import dotenv from 'dotenv';
import app from './routes/App';
import sequelize from '../config/database';

dotenv.config();

const PORT = process.env.PORT || 3002;

const startServer = async () => {
    try {
        // データベース接続を確認

        await sequelize.authenticate();
        console.log('DBの接続を行います。');

        // サーバーを起動
        app.listen(PORT, () => {
            console.log(`起動中 ${PORT}`);
        });
    } catch (error) {
        console.error('接続エラー:', error);
    }
};

startServer();
