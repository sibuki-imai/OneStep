import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
export class auth {
    public static async UserCertification(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            // console.log('認証開始: UserCertification');

            const { code } = req.query;
            if (!code) {
                res.status(400).json({
                    error: 'Authorization code is missing',
                });
                return;
            }

            const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
            const redirectUri = `${process.env.BE_DOMAIN}/api/user/certification`;

            // 1. 認可コードをアクセストークンに交換
            const tokenResponse = await axios.post(GOOGLE_TOKEN_URL, null, {
                params: {
                    code,
                    client_id: process.env.GOOGLE_CLIENT_ID,
                    client_secret: process.env.GOOGLE_CLIENT_SECRET,
                    redirect_uri: redirectUri,
                    grant_type: 'authorization_code',
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const { access_token, expires_in } = tokenResponse.data;
            if (!access_token) {
                console.error('アクセストークン取得失敗');
                res.status(500).json({
                    error: 'Failed to obtain access token',
                });
                return;
            }

            // 2. Google ユーザー情報取得
            res.cookie('google_access_token', access_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: expires_in * 1000, // ミリ秒に変換
            });

            res.redirect(`${process.env.BE_DOMAIN}/api/user/information`);
        } catch (error) {
            console.error('Google SSO 認証エラー:', error);
            res.status(500).json({ error: 'Google認証に失敗しました' });
        }
    }

    public static async GoogleUser(req: Request, res: Response): Promise<void> {
        try {
            // console.log('Google ユーザー情報取得開始');

            // 1. Cookie からアクセストークンを取得
            const access_token = req.cookies.google_access_token;
            if (!access_token) {
                res.status(401).json({ error: 'Access token is missing' });
                return;
            }

            // 2. Google ユーザー情報取得
            const userInfo = await auth.fetchGoogleUser(access_token);
            if (!userInfo) {
                res.status(500).json({
                    error: 'Failed to fetch Google user info',
                });
                return;
            }
            console.log(userInfo);

            // 3. ユーザー情報をフロントエンドに返す
            res.redirect(`${process.env.FE_DOMAIN}/record-input`);
        } catch (error) {
            console.error('Google ユーザー情報取得エラー:', error);
            res.status(500).json({ error: 'Failed to get Google user info' });
        }
    }

    private static async fetchGoogleUser(access_token: string) {
        try {
            const GOOGLE_USERINFO_URL =
                'https://www.googleapis.com/oauth2/v2/userinfo';
            const userResponse = await axios.get(GOOGLE_USERINFO_URL, {
                headers: { Authorization: `Bearer ${access_token}` },
            });

            if (!userResponse) {
                console.log('レスポンス未取得');
            }
            const { id, email, name } = userResponse.data;
            if (!id || !email || !name) {
                return null;
            }

            return { googleId: id, email, name };
        } catch (error) {
            console.error('Google API ユーザー情報取得エラー:', error);
            return null;
        }
    }
}

export default auth;
