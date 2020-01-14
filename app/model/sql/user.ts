import { BaseModel } from './baseModel';
import { Column } from 'sequelize-typescript';

export class User extends BaseModel<User> {
    /**
     * 创建或更新User
     * @param user User
     */
    public static async createOrUpdateSqlDemo(user: User) {
        await User.upsert({
            authorizer_appid: user.appid,
            authorizer_refresh_token: user.userName
        });
    }

    /**
     * appid
     */
    @Column({
        unique: true,
        comment: 'appid'
    })
    public appid: string;

    @Column
    public userName: string;
}
