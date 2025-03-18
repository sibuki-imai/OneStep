import express, { Request, Response } from 'express';

export class confirmationFile {
    public static async Connect(req: Request, res: Response) {
        console.log('接続開始');
        try {
            console.log('接続成功');
            res.status(200).json({
                message: '接続成功',
            });
        } catch (error) {
            console.log('接続エラー');
            res.status(400).json({
                message: '接続エラー',
            });
        }
    }
}

export default confirmationFile;
