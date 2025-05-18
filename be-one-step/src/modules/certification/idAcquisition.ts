import express, { Request } from 'express';
import CryptoJS from 'crypto-js';

// cookieを取得する仕組み
async function idAcquisition(req: Request) {
    // envからcookieの名前を取得
    const COOKIE_NAME = process.env.COOKIE_NAME_INDIVIDUAL || '';
    // console.log('Cookie_name：', COOKIE_NAME);

    // cookie_Nameの値を取得
    const encryptedUniqueUserId = req.cookies?.[COOKIE_NAME];
    console.log('cookie暗:', encryptedUniqueUserId);

    // cookie_Nameと同一のcookieの値がない場合拾う
    if (!encryptedUniqueUserId) {
        throw new Error(
            'GoogleSsoIdが取得できません。再度ログインを行ってください'
        );
    }

    try {
        const secretKey = process.env.COOKIE_VALUE_INDIVIDUAL || ''; // 環境変数から暗号化キーを取得
        const bytes = CryptoJS.AES.decrypt(encryptedUniqueUserId, secretKey); // 復号化
        const UniqueUserId = bytes.toString(CryptoJS.enc.Utf8); // 平文に変換

        // 復号化した後に値が不正の場合拾う
        if (!UniqueUserId) {
            throw new Error('復号化に失敗しました');
        }
        // console.log('cookie平:', UniqueUserId);
        return UniqueUserId;
    } catch (error) {
        console.error('復号化エラー:', error);
        throw new Error('クッキーの復号化に失敗しました');
    }
}

export default idAcquisition;
