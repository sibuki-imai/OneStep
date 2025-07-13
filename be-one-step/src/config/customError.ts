interface CustomErrorOptions {
    name?: string;
    message: string;
    status?: number;
    details?: any;
}

class CustomError extends Error {
    // エラーの名前
    name: string;

    // HTTPステータスコード
    status: number;

    // 追加情報を保持するプロパティ
    details?: string; // エラーに関する追加情報

    constructor({ name, message, status, details }: CustomErrorOptions) {
        super(message); // エラーメッセージを親クラス（Error）に渡す
        this.name = name || '不明なエラー名'; // エラーの名前を設定
        this.status = status || 500; // エラーコードを設定
        this.details = details; // 追加情報を設定
    }

    toJSON() {
        return {
            message: this.message,
            status: this.status,
            details: this.details,
        };
    }
}

export default CustomError;
