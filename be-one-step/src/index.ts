import dotenv from 'dotenv';
import app from './routes/App';
import sequelize from './config/database';
import fs from 'fs';
import https from 'https';

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        // データベース接続を確認

        await sequelize.authenticate();
        console.log('DBの接続を行います。');

        if (process.env.NODE_ENV === 'development') {
            const privateKey = fs.readFileSync(
                '../ssl/localhost-key.pem',
                'utf8'
            );
            const certificate = fs.readFileSync('../ssl/localhost.pem', 'utf8');
            const credentials = { key: privateKey, cert: certificate };

            https.createServer(credentials, app).listen(PORT, () => {
                console.log(`Server running at https://localhost:${PORT}`);
            });
        } else {
            app.listen(PORT, () => {
                console.log(`Server is running on ${process.env.BE_DOMAIN}`);
            });
        }
    } catch (error) {
        console.error('接続エラー:', error);
    }
};

startServer();
