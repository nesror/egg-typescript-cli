import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    redis: {
        enable: true,
        package: 'egg-redis'
    },
    alinode: {
        enable: true,
        package: 'egg-alinode',
        env: ['prod']
    },
    rpc: {
        enable: true,
        package: 'egg-rpc-base'
    },
    dubboRpc: {
        enable: true,
        package: 'egg-dubbo-rpc'
    },
    mongoose: {
        enable: true,
        package: 'egg-mongoose'
    }
};

export default plugin;
