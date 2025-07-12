import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
import User from '../../models/userModel';
import idAcquisition from './idAcquisition';

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

            const { access_token } = tokenResponse.data;
            if (!access_token) {
                console.error('アクセストークン取得失敗');
                res.status(500).json({
                    error: 'Failed to obtain access token',
                });
                return;
            }
            // アクセストークン暗号化
            const encryptedAccessTokey = CryptoJS.AES.encrypt(
                access_token,
                `${process.env.COOKIE_VALUE_TOKEN}`
            ).toString();

            if (!encryptedAccessTokey) {
                console.error('アクセストークン取得失敗');
                res.status(500).json({
                    error: 'Failed to obtain access token',
                });
                return;
            }

            // 2. Google ユーザー情報取得

            res.cookie(
                `${process.env.COOKIE_NAME_TOKEN}`,
                encryptedAccessTokey,
                {
                    httpOnly: true,
                    secure: true,
                    // sameSite: 'strict',
                    sameSite: 'none',
                    maxAge: 15 * 60 * 1000,
                }
            );

            res.redirect(`${process.env.BE_DOMAIN}/api/user/information`);
        } catch (error) {
            console.error('Google SSO 認証エラー:', error);
            res.cookie(`${process.env.COOKIE_NAME_INDIVIDUAL}`, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 0,
            });
            res.cookie(`${process.env.COOKIE_VALUE_INDIVIDUAL}`, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 0,
            });
            res.status(500).json({ error: 'Google認証に失敗しました' });
        }
    }

    public static async GoogleUser(req: Request, res: Response): Promise<void> {
        try {
            // console.log('Google ユーザー情報取得開始');

            // 1. Cookie からアクセストークンを取得
            const tokenName = `${process.env.COOKIE_NAME_TOKEN}`;
            // console.log(tokenName);
            const access_token = req.cookies?.[tokenName];
            // console.log(access_token);
            if (!access_token) {
                res.status(401).json({ error: 'Access token is missing' });
                return;
            }
            const bytes = CryptoJS.AES.decrypt(
                access_token,
                `${process.env.COOKIE_VALUE_TOKEN}`
            ); // 復号化
            const AccessToken = bytes.toString(CryptoJS.enc.Utf8); // 平文に変換

            // 2. Google ユーザー情報取得
            const userInfo = await auth.fetchGoogleUser(AccessToken);
            if (!userInfo) {
                res.status(500).json({
                    error: 'Failed to fetch Google user info',
                });
                return;
            }
            // console.log(userInfo);
            const openId = userInfo.googleId;

            const judgment = await User.findOne({
                where: { unique_user_id: openId },
                attributes: ['unique_user_id', 'registration_flag'],
            });

            const encryptedopenId = CryptoJS.AES.encrypt(
                openId,
                `${process.env.COOKIE_VALUE_INDIVIDUAL}`
            ).toString();

            res.cookie(
                `${process.env.COOKIE_NAME_INDIVIDUAL}`,
                encryptedopenId,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 60 * 24 * 60 * 60 * 1000,
                    //60*60*1000 ->1h
                    //24*60*60*1000 ->24h
                }
            );

            if (!judgment) {
                console.log('アカウント登録判定');
                res.redirect(`${process.env.FE_DOMAIN}/account/registration`);
                return;
            }
            console.log(`ログイン判定`);
            const registrationFlag = judgment?.dataValues.registration_flag;

            console.log('テストFLAG', registrationFlag);
            if (registrationFlag === false) {
                res.redirect(`${process.env.FE_DOMAIN}/tutorial`);
                return;
            }
            res.redirect(`${process.env.FE_DOMAIN}/record-input`);
        } catch (error) {
            console.error('Google ユーザー情報取得エラー:', error);
            res.cookie(`${process.env.COOKIE_NAME_INDIVIDUAL}`, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 0,
            });
            res.cookie(`${process.env.COOKIE_VALUE_INDIVIDUAL}`, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 0,
            });
            res.status(500).json({ error: 'Failed to get Google user info' });
            res.redirect(`${process.env.FE_DOMAIN}/errorpage`);
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

    public static async UserInformation(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const tokenName = `${process.env.COOKIE_NAME_TOKEN}`;
            const access_token = req.cookies?.[tokenName];
            if (!access_token) {
                res.status(401).json({ error: 'Access token is missing' });
                return;
            }

            const bytes = CryptoJS.AES.decrypt(
                access_token,
                `${process.env.COOKIE_VALUE_TOKEN}`
            ); // 復号化
            const AccessToken = bytes.toString(CryptoJS.enc.Utf8); // 平文に変換

            if (!AccessToken) {
                console.log('SSOID取得失敗');
                return;
            }

            const GOOGLE_USERINFO_URL =
                'https://www.googleapis.com/oauth2/v2/userinfo';
            const userResponse = await axios.get(GOOGLE_USERINFO_URL, {
                headers: { Authorization: `Bearer ${AccessToken}` },
            });
            if (!userResponse) {
                console.log('レスポンス未取得');
            }
            const { id, email, name } = userResponse.data;

            res.status(200).json({
                UserId: id,
                UserEmail: email,
                UserName: name,
            });
        } catch (error) {
            res.cookie(`${process.env.COOKIE_NAME_INDIVIDUAL}`, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 0,
            });
            res.cookie(`${process.env.COOKIE_VALUE_INDIVIDUAL}`, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 0,
            });
            console.error('Google API ユーザー情報取得エラー:', error);
            res.status(400).json({ error: '情報取得エラー' });
        }
    }

    public static async InquiryConfirmation(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const userId = await idAcquisition(req);
            if (!userId) {
                console.log('ID未取得');
                res.redirect(`${process.env.BE_DOMAIN}/api/user/certification`);
                return;
            }

            res.status(200);
        } catch (error) {
            res.cookie(`${process.env.COOKIE_NAME_INDIVIDUAL}`, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 0,
            });
            res.cookie(`${process.env.COOKIE_VALUE_INDIVIDUAL}`, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 0,
            });
            console.error('Google API ユーザー情報取得エラー:', error);
            res.status(400).json({ error: '情報取得エラー' });
        }
    }
}

export default auth;
