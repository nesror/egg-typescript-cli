import { Application, IBoot } from 'egg';
import { Sequelize } from 'sequelize-typescript';
import { DubboTraceLog } from './app/model/log/traceLog';
import { DubboInfo } from './app/model/log/dubboInfo';

export default class FooBoot implements IBoot {
    private readonly app: Application;

    public constructor(app: Application) {
        this.app = app;
    }

    public configWillLoad() {
        // Ready to call configDidLoad,
        // Config, plugin files are referred,
        // this is the last chance to modify the config.
    }

    public configDidLoad() {
        // Config, plugin files have loaded.
    }

    public async didLoad() {
        // All files have loaded, start plugin here.
    }

    public async willReady() {
        const { config, rpcClient, getLogger } = this.app;
        // mysql
        const sequelize = new Sequelize({
            dialect: 'mysql',
            host: config.sequelize.host,
            username: config.sequelize.username,
            password: config.sequelize.password,
            port: config.sequelize.port,
            database: config.sequelize.database
        });
        sequelize.addModels([SqlDemo]);

        // rpc出日志规范 xxx-insight.log
        rpcClient.on('request', () => {});
        rpcClient.on('response', (info: DubboInfo) => {
            getLogger('accessLogger').info(DubboTraceLog.dubboLoggerInfo(this.app, info));
        });
    }

    public async didReady() {
       
    }

    public async serverDidReady() {
        
    }

    public async beforeClose() {
       
    }
}
