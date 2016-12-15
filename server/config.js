/**
 * Created by sunny on 2016/11/24.
 */
// 数据库操作
import mongoose from 'mongoose';
import redis from 'redis';
import log4js from 'log4js';
import slogger from 'node-slogger';

import configObj from '../config';
import settings from './utils/settings';

settings.init(configObj);

const accessLogFile = settings.loadNecessaryFile('accessLogFile',true);
const errorLogFile = settings.loadNecessaryFile('errorLogFile',true);
log4js.configure({
    appenders: [
        {type: 'console'},
        {type: 'dateFile', filename: accessLogFile, 'pattern': '-yyyy-MM-dd', category: 'access'}, //
        {type: 'file', filename: errorLogFile, maxLogSize: 1024000, backups: 10, category: 'error'}
    ],
    replaceConsole : true
});
export const accessLogger = log4js.getLogger('access');
slogger.init({errorLogger : log4js.getLogger('error') , disableCustomConsole : true});

export const port = settings.loadNecessaryInt('port');

let mongoConfig = settings.loadNecessaryObject('mongoConfig');
mongoose.connect(mongoConfig.url); // connect to database

let redisConfig = settings.loadNecessaryObject('redisConfig');
export const redisClient = redis.createClient(redisConfig);

