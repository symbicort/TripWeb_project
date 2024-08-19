"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisProvider = void 0;
const ioredis_1 = require("ioredis");
exports.redisProvider = {
    useFactory: () => {
        return new ioredis_1.default({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD,
        });
    },
    provide: 'REDIS_CLIENT',
};
//# sourceMappingURL=redis.provider.js.map