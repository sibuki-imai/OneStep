import { UniqueConstraintError } from 'sequelize';
import UserInput from '../../models/userInputModel';
import UserCustom from '../../models/iconCustomModel';
import IconModel from '../../models/iconModel';
import CustomError from '../../config/customError';

interface UserType {
    unique_user_id: string;
    year: Number;
    month: Number;
    custom_id: Number;
}
interface ReportType {
    year: Number;
    month: Number;
    day: Number;
    custom_id: Number;
    amount: Number;
    memo: string;
    money_id: Number;
    icon_path: string;
}

export type PartialUserType = Partial<UserType>;
export type PartialReportType = Partial<ReportType>;

class reportRepository {
    static async allGet(
        data: PartialUserType & PartialReportType,
        options?: any
    ): Promise<PartialReportType[]> {
        try {
            const whereCondition: any = {
                unique_user_id: data.unique_user_id,
                year: data.year ?? new Date().getFullYear(),
                month: data.month ?? new Date().getMonth() + 1,
            };

            if (data.custom_id !== undefined) {
                whereCondition.custom_id = data.custom_id;
            }

            const findget = await UserInput.findAll({
                where: whereCondition,
                attributes: [
                    'year',
                    'month',
                    'day',
                    'custom_id',
                    'amount',
                    'memo',
                    'money_id',
                ],
                order: [
                    ['year', 'DESC'],
                    ['month', 'DESC'],
                    ['day', 'DESC'],
                    ['custom_id', 'ASC'],
                    ['amount', 'ASC'],
                    ['money_id', 'ASC'],
                ],
            });

            const plainResults = findget.map((findget) => findget.dataValues);
            // console.log('確認', plainResults);

            const updatedResults = await Promise.all(
                plainResults.map(async (item) => {
                    const iconRecord = await UserCustom.findOne({
                        where: { custom_id: item.custom_id },
                        attributes: ['icon_id', 'icon_naming'],
                    });
                    // console.log('レコード', iconRecord);
                    const iconId = iconRecord?.dataValues.icon_id;
                    const iconNaming = iconRecord?.dataValues.icon_naming;

                    // console.log('アイコンID:', iconId);
                    // console.log('アイコンName:', iconNaming);

                    const addData = await IconModel.findOne({
                        where: { icon_id: iconId },
                        attributes: ['icon_path'],
                    });
                    const iconPath = addData?.dataValues.icon_path;

                    return {
                        ...item,
                        iconNaming,
                        iconPath,
                    };
                })
            );

            // console.log('確認', updatedResults);
            if (!updatedResults) {
                throw new Error('情報の取得ができませんでした。');
            }

            return updatedResults;
        } catch (error) {
            console.error('情報の取得ができませんでした。', error);
            throw new CustomError({
                name: '取得エラー',
                message: 'エラーメッセージ:情報の取得ができませんでした。',
                status: 400,
            });
        }
    }
}
export default reportRepository;
