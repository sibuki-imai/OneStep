import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import https from 'https';

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

const port = 3001;
if (process.env.NODE_ENV === 'development') {
    const privateKey = fs.readFileSync('./ssl/localhost-key.pem', 'utf8');
    const certificate = fs.readFileSync('./ssl/localhost.pem', 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    https.createServer(credentials, app).listen(port, () => {
        console.log(`Server running at https://localhost:${port}`);
    });
} else {
    app.listen(port, () => {
        console.log(`Server is running on ${process.env.BE_DOMAIN}`);
    });
}

export default app;
