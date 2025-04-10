import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import CustomError from '../../config/customError';
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

// app.use(
//     (
//         err: any,
//         // req: express.Request,
//         res: express.Response
//         // next: express.NextFunction
//     ) => {
//         if (err instanceof CustomError) {
//             console.error('カスタムエラー:', err);

//             //  リダイレクトURLを返す
//             res.status(err.status || 400).json({
//                 redirectUrl: `${
//                     process.env.FE_DOMAIN
//                 }/errorpage?message=${encodeURIComponent(err.message)}`,
//             });
//         } else {
//             console.error('予期しないエラー:', err);
//             res.status(500).json({
//                 redirectUrl: `${process.env.FE_DOMAIN}/errorpage?message=予期せぬエラーが発生しました`,
//             });
//         }
//     }
// );

// process.on('uncaughtException', (err) => {
//     console.error('致命的なエラー:', err);
// });

export default app;
