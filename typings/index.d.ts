/* eslint-disable @typescript-eslint/no-require-imports */
import 'egg';

declare module 'egg' {
    interface Context {
        proxy: {
            
        };
    }
    interface Application {
        rpcClient: EggRpcClient;
    }
}
