import { networkInterfaces } from 'os';
import { Context } from 'egg';

/**
 * 获取ip地址
 */
export function getIPAddress(): string {
    const interfaces = networkInterfaces();
    for (let devName in interfaces) {
        if (interfaces.hasOwnProperty(devName)) {
            let iface = interfaces[devName];
            for (let alias of iface) {
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
    return '';
}

/**
 * 判断参数是否为空
 * @param params
 */
export function checkParams(ctx: Context, ...paramNames: string[]): boolean {
    let msg = '';
    paramNames.forEach((paramName) => {
        if (!ctx.query[paramName]) {
            msg += paramName + ' ';
        }
    });
    if (msg) {
        msg += '不能为空';
        ctx.status = 400;
        ctx.body = msg;
        return false;
    }
    return true;
}
