import userHandlers from '../handlers/user_handlers.js';

export default function (app) {
  // 用户注册
  app.get('/api/user/register', (req, res) => {



    var result =  {
      flag: 1,
      msg: 'success~'
    };
    res.send(result);
  });

  // 获取用户信息
  app.get('/api/user/:id', (req, res) => {
    res.send('This is user info!');
  });
  // 登录


}
