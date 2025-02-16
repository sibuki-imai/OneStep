import { DataTypes } from 'sequelize';
import pool from '../../config/database';

const User = pool.define(
    'User',
    {
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true, // 自動入力
            allowNull: false, // 必須
            primaryKey: true,
        },
        unique_user_id: {
            type: DataTypes.STRING(255),
            allowNull: false, // 必須
            unique: true, // 一意制約を設定する
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true, // ユニーク制約
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true, // 任意
        },
        passkey: {
            type: DataTypes.STRING(255),
            allowNull: true, // 任意
        },
        authority_flag: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true, // 任意
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false, // 必須
            defaultValue: DataTypes.NOW, // 作成時の時刻
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false, // 必須
            defaultValue: DataTypes.NOW, // 更新時の時刻
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true, // 任意
        },
    },
    {
        timestamps: true, // created_atとupdated_atを自動生成
        paranoid: true, // deleted_atを利用する（論理削除）
        underscored: true, // カラム名をスネークケースで定義
        tableName: 'user', // テーブル名
    }
);

export default User;
