import { EggAppConfig, PowerPartial, EggAppInfo } from 'egg';
import { join,resolve } from 'path';

export default (appInfo: EggAppInfo) => {
    const config: PowerPartial<EggAppConfig> = {};

    // redis
    config.redis = {
        client: {
            cluster: true,
            nodes: [
                {
                    host: 'xxx',
                    port: 6379,
                    password: '',
                    db: 0
                }
            ]
        }
    };

    config.alinode = {
        server: 'wss://agentserver.node.aliyun.com:8080',
        appid: 'xxx',
        secret: 'xxx',
        logdir: `/data/html/logs/${appInfo.name}/alinode`,
        error_log: [
            `/data/html/logs/${appInfo.name}/${appInfo.name}-error.log`,
            `/data/html/logs/${appInfo.name}/${appInfo.name}-error.log.#YYYY#-#MM#-#DD#`
        ],
        packages: [resolve(__dirname, '..') + '/package.json']
    };

    config.logger = {
        dir: `/data/html/logs/${appInfo.name}`,
        appLogName: `${appInfo.name}-biz.log`,
        errorLogName: `${appInfo.name}-error.log`
    };

    config.customLogger = {
        accessLogger: {
            file: join('/data/html/tracelogs/', `${appInfo.name}/${appInfo.name}-access.log`)
        },
        digestLogger: {
            file: join('/data/html/tracelogs/', `${appInfo.name}/${appInfo.name}-digest.log`)
        }
    };


    config.sequelize = {
        host: 'xxx',
        username: 'xxx',
        password: 'xxx',
        port: 3306,
        database: 'xxx'
    };

    config.mongoose = {
        client: {
            url:
                'mongodb://xxx',
            options: {
                mongos: true,
                db: { native_parser: true },
                server: {
                    poolSize: 5,
                    auto_reconnect: true,
                    socketOptions: { keepAlive: 1 }
                },
                replset: { rs_name: 'gabriel' },
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
         }
    };

    return config;
};
