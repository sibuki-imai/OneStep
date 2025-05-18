import express, { Request } from 'express';
import IconCustom from '../../models/iconCustomModel';

async function userIconNumberGet(userId: string) {
    try {
        const judgment = await IconCustom.findOne({
            where: { unique_user_id: userId },
            attributes: ['user_icon_number'],
            order: [['user_icon_number', 'DESC']],
        });
        const nextUserIconNumber = judgment?.dataValues.user_icon_number + 1;
        return nextUserIconNumber;
    } catch (error) {}
}
export default userIconNumberGet;
