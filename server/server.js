// 中间件
import Express from 'Express';
import bodyParser from 'body-Parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// 数据库操作
import mongoose from 'mongoose';
import redis from 'redis';
// 引入
import mongoConfig from './config/mongo_config';
import redisConfig from './config/redis_config';
import routes from './routes';
/* config */
const app = new Express();
const port = process.env.PORT || 3000;
mongoose.connect(mongoConfig.url); // connect to database
// redids数据库未连接
// const client = redis.createClient(redisConfig.port,redisConfig.url);
app.set('env', 'production');
app.use('/static', Express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(logger('dev'));

// 测试
app.get('/', function (req, res) {
  res.send('Hello World!');
});
// 路由
routes(app);
//404
//app.use(function (req, res, next) {
//  res.status(404);
//  res.send('404 Not Found');
//})

// 端口监听
app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
