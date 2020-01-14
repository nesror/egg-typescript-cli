import { Controller } from 'egg';
import { User } from '../model/sql/user';

/**
 * demo
 */
export default class Demo extends Controller {
    /**
     * demo
     */
    public async demo() {
        const { ctx, logger, app } = this;
        logger.debug('info->', JSON.stringify(ctx.params.info));

        switch (ctx.params.info) {
            case 'dubbo':
                ctx.body = `1.进入gradleproject配置好maven地址和需要的jar和源码包;
                2.在config/proxy.js编辑需要使用的类
                3.运行rpc-generator.sh;
                4.app/proxy自动生成js和d.ts文件;
                5.调用app/proxy对应的方法`;
                break;
            case 'database':
                ctx.body = await this.database();
                break;
            default:
                ctx.body = app.config.env + ':有效参数：dubbo\ndatabase';
                break;
        }
    }

    private async database(): Promise<User | null> {
        const user = new User();
        user.appid = 'wewew';
        user.userName = 'nestor';
        await User.createOrUpdateSqlDemo(user);
        return User.findOne({
            where: {
                appid: user.appid
            }
        });
    }
}
