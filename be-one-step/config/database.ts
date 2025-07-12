import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// ここで宣言
let sequelize: Sequelize;

// DBRESET が 'Actual' なら PostgreSQL (Neon)
if (process.env.DBRESET === 'Actual') {
    sequelize = new Sequelize(process.env.DATABASE_URL!, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Neon は SSL 必須
            },
        },
    });
} else {
    // ローカル (MySQL)
    sequelize = new Sequelize(
        process.env.DB_NAME!,
        process.env.DB_USERNAME!,
        process.env.DB_PASSWORD!,
        {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            dialect: 'mysql',
            logging: false,
        }
    );
}

const runSeeders = async (): Promise<void> => {
    const { default: invitationSeeder } = await import(
        '../src/seeders/invitationSeeder'
    );
    const { default: userSeeder } = await import('../src/seeders/userSeeder');
    const { default: iconSeeder } = await import('../src/seeders/iconSeeder');
    const { default: custoIconSeeder } = await import(
        '../src/seeders/customIconSeeder'
    );

    await invitationSeeder();
    await userSeeder();
    await iconSeeder();
    await custoIconSeeder();
};

const syncDatabase = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('データベースと接続しました。');

        if (process.env.DBRESET === 'true') {
            console.log('リセット');
            await sequelize.sync({ force: true });
        } else if (process.env.DBRESET === 'false') {
            console.log('引継ぎ');
            await sequelize.sync({ force: false });
        } else {
            console.log('本番');
            await sequelize.sync({ alter: true });
        }

        console.log('同期しました。');
        await runSeeders();
    } catch (error) {
        console.error('データベースとの接続・同期ができませんでした。:', error);
    }
};

if (process.env.NODE_ENV === 'development') {
    syncDatabase();
}

export default sequelize;
