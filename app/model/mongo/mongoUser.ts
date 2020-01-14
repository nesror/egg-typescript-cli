import { prop, getModelForClass } from '@typegoose/typegoose';
import { Application } from 'egg';

export class MongoUser {
    @prop()
    public appid: string;
    @prop()
    public userName: string;
}

export const MongoUserModel = getModelForClass(MongoUser);

/**
 * 存MongoUser
 * @param appid
 * @param userName
 */
export async function saveMongoUser({ appid, userName }, app: Application) {
    await MongoUserModel.create({ appid, userName }, (err: any) => {
        if (err) {
            app.logger.error(err);
            return;
        }
    });
}

/**
 * 根据appid查MongoUser
 * @param appid
 */
export async function getMongoUserByappid(appid: string): Promise<MongoUser | null> {
    return MongoUserModel.findOne({ appid }).exec();
}
