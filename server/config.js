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
mongoose.Promise = global.Promise;
mongoose.connect(mongoConfig.url); // connect to database

let redisConfig = settings.loadNecessaryObject('redisConfig');
export const redisClient = redis.createClient(redisConfig);

/**
 * oauth2 配置类
 * @typedef OAuth2Config
 * @type {Object}
 * @property {String} clientId
 * @property {String} clientSecret
 */
/**
 * @constant {{github:OAuth2Config,qq:OAuth2Config,weibo:OAuth2Config,linkedin:OAuth2Config}}
 */
export const OAUTH2_CONFIG = settings.loadNecessaryObject('oauth2Config');
export const OAUTH2_TYPE_NUM_MAP = Object.freeze({

});
export const OAUTH2_CALLBACK_MAX_AGE = 10 * 60 * 1000;