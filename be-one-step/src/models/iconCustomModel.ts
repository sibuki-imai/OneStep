import { DataTypes } from 'sequelize';
import pool from '../../config/database';
import User from './userModel';
import Icon from './iconModel';

const UserCustom = pool.define(
    'UserCustom',
    {
        custom_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true, // 自動入力
            allowNull: false, // 必須
            primaryKey: true,
        },
        unique_user_id: {
            type: DataTypes.STRING(255),
            allowNull: false, // 必須
            references: {
                model: 'user', // user テーブルとの外部キー設定
                key: 'unique_user_id',
            },
        },
        icon_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false, // 必須
            references: {
                model: 'icon', // icon テーブルとの外部キー設定
                key: 'icon_id',
            },
        },
        user_icon_number: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false, // 必須
        },
        icon_naming: {
            type: DataTypes.STRING(255),
            allowNull: false, // 必須
        },
        fixed_amount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false, // 必須
        },
        user_saving: {
            type: DataTypes.INTEGER, //符号付
            allowNull: false, // 必須
        },
        tentative: {
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
        tableName: 'user_custom', // テーブル名
    }
);

// 外部キーリレーションを定義
UserCustom.belongsTo(User, {
    foreignKey: 'unique_user_id',
    as: 'uniqueUserId',
});
UserCustom.belongsTo(Icon, {
    foreignKey: 'icon_id',
    as: 'iconId',
});

export default UserCustom;
