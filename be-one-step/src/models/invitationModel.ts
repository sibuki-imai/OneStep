import { DataTypes } from 'sequelize';
import pool from '../../config/database';

const Invitation = pool.define(
    'Invitation',
    {
        invitation_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true, // 自動入力
            primaryKey: true,
        },
        invitation_code: {
            type: DataTypes.STRING(255),
            allowNull: false, // 必須
            unique: true, // 一意制約を設定する
        },

        use_flag: {
            type: DataTypes.BOOLEAN,
            allowNull: false, // 必須
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
        tableName: 'invitation', // テーブル名
    }
);

export default Invitation;
