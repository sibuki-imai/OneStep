import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import confirmationRoutes from '../debug/confirmationRoutes'; //debug
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const app = express();

app.use(cookieParser()); // cookieの受け付け

app.use(express.json());
app.use(
    cors({
        origin: [`${process.env.BE_DOMAIN}`, `${process.env.FE_DOMAIN}`], // 許可する通信元
        credentials: true, // セッションクッキーを含むリクエストを許可
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    })
);
console.log('Appの起動');
app.use('/debug', confirmationRoutes);
app.use('/api/user', authRoutes);
app.use('/api/user/setting', userRoutes);

// app.use('/api/input', inputRoutes);

export default app;
