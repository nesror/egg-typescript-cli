import { Context } from 'egg';
import { ServletTraceLog } from '../model/log/traceLog';

/**
 * 中间件
 */
export default () => {
    return async function interceptor(ctx: Context, next: () => Promise<any>) {
        const { app } = ctx;

        if (!canAllow(ctx)) {
            app.logger.info(
                '以下ip访问了不允许访问的方法->' + ctx.ip + ',' + ctx.request.headers['x-real-ip']
            );
            return;
        }

        const startTime = Date.now();

        await next();

        // http进日志规范 xxx-digest.log
        app.getLogger('digestLogger').info(ServletTraceLog.httpDigestLoggerInfo(startTime, ctx));

        if (app.config.env === 'local') {
            console.log(`
        ############## http ${ctx.status}################
            ---IP:${ctx.ip}
            ---URL:${ctx.request.URL}
            ---headers:${JSON.stringify(ctx.request.headers)}
            ---body:${JSON.stringify(ctx.request.body)}
        -------------response----------------
            ---headers:${JSON.stringify(ctx.response.headers)}
            ---body:${JSON.stringify(ctx.response.body)}
        ####################################`);
        }
    };
};

/**
 * 判断接口是否允许外网访问
 */
function canAllow(ctx: Context): boolean {
    const { path } = ctx;
    const ip = ctx.request.headers['x-real-ip'];

    // 允许外网访问
    if (path.startsWith('/callback/') || path === '/') {
        return true;
    }

    if (ip === '127.0.0.1' || ip === 'localhost' || ctx.app.config.env === 'local') {
        return true;
    }

    const aryIpAddress = ip.split('.');

    if (aryIpAddress[0] === '10') {
        return true;
    }

    if (aryIpAddress[0] === '192' && aryIpAddress[1] === '168') {
        return true;
    }

    if (aryIpAddress[0] === '172') {
        const num = parseInt(aryIpAddress[1], 10);
        if (num >= 16 && num <= 31) {
            return true;
        }
    }

    return false;
}
