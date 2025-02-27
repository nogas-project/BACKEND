import winston from 'winston';
import { format } from 'winston'

export const loggerService = winston.createLogger({
    level: 'http',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [new winston.transports.Console(),new winston.transports.File({ filename: 'logs/service.log' })],
});
export const loggerController = winston.createLogger({
    level: 'http',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [new winston.transports.Console(),new winston.transports.File({ filename: 'logs/controller.log' })],
});