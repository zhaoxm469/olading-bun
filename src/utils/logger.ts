import winston from 'winston';
import path from 'path';

// 定义日志级别
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// 定义日志颜色
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

// 添加颜色到 winston
winston.addColors(colors);

// 定义日志格式
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.json(),
    winston.format.prettyPrint(),
);

// 定义日志传输方式
const transports = [
    // 控制台输出
    new winston.transports.Console(),
    // 记录所有日志级别
    new winston.transports.File({
        filename: path.join(__dirname, '../../logs/all.log'),
    }),
    // 记录错误日志
    new winston.transports.File({
        filename: path.join(__dirname, '../../logs/error.log'),
        level: 'error',
    }),
];

// 创建 logger
const logger = winston.createLogger({
    level: Bun.env.NODE_ENV === 'production' ? 'warn' : 'debug' ,
    levels,
    format,
    transports,
});

export default logger;