/**
 * Created by sunny on 2016/11/24.
 */
// 数据库操作
import mongoose from 'mongoose';
import redis from 'redis';

import configObj from '../config';
import settings from './utils/settings';

settings.init(configObj);

export const port = settings.loadNecessaryInt('port');

let mongoConfig = settings.loadNecessaryObject('mongoConfig');
mongoose.connect(mongoConfig.url); // connect to database



