import { DataTypes } from 'sequelize';
import pool from '../config/database';
import user from './userModel';
import IconCustom from './iconCustomModel';

const UserInput = pool.define(
    'UserInput',
    {
        money_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true, // 自動入力
            allowNull: false, // 必須
            primaryKey: true,
        },
        unique_user_id: {
            type: DataTypes.STRING(255),
            allowNull: false, // 必須
            references: {
                model: 'user',
                key: 'unique_user_id',
            },
        },

        custom_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false, // 必須
            references: {
                model: 'user_custom',
                key: 'custom_id',
            },
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false, // 必須
        },
        year: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false, // 必須
        },
        month: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false, // 必須
        },
        day: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false, // 必須
        },
        memo: {
            type: DataTypes.STRING,
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
        tableName: 'user_input', // テーブル名
    }
);

// 外部キーリレーションを定義

UserInput.belongsTo(user, {
    foreignKey: 'unique_user_id',
    as: 'uniqueUserId',
});
UserInput.belongsTo(IconCustom, {
    foreignKey: 'custom_id',
    as: 'customId',
});

export default UserInput;
