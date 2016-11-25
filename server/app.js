import path from 'path';
// 中间件
import Express from 'Express';
import bodyParser from 'body-Parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import connectRedis from 'connect-redis';
let RedisStore = connectRedis(session);
// 引入路由
import routes from './routes';
/* config */
import {redisClient} from './config';

const app = new Express();


// redids数据库未连接
// const client = redis.createClient(redisConfig.port,redisConfig.url);
//app.set('env', 'production');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/static', Express.static(`${__dirname}/public`));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(logger('dev'));

app.use(session({
  secret: '%S43Xdj$',
  cookie:{},
  key:'coding_show',
  resave:false,
  saveUninitialized:false,
  store: new RedisStore({
    client:redisClient,
    ttl:3600*72,
    db:2,
    prefix:'session:coding:'
  })
}));
// 路由
app.use('/', routes);
//404
app.use(function (req, res, next) {
  res.sendStatus(404);
  res.send('404 Not Found');
});

export default app;

//// 端口监听
//app.listen(port, (error) => {
//  if (error) {
//    console.error(error);
//  } else {
//    console.info(`Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
//  }
//});
