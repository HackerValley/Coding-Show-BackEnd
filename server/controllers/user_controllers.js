import userHandlers from '../handlers/user_handlers.js';

export default function (app) {
  // 用户注册
  app.get('/api/user/register', (req, res) => {
    let userInfoJson = {
      _id: '',
      username: 'user1',
      nickname: 'yunDuanXinYue',
      passwd: '123456',
      level: '1',
      telephone:  '15079051079',
      email: 'suhanyujie@qq.com',
      skill: ['php','nodejs'],
      access_token: 'xxxxx',
      expire_time: '1457625320',
      sns_type: 3,
      avatar: 'http://fd.img.com/img1.png',
      create_time: '2016-11-22 12:23:00',
      last_login_time: '2016-11-22 15:23:00'
    };

    userHandlers.addUser(userInfoJson)
        .then((result)=>{
          res.send(result);
        });

  });

  // 获取用户信息
  app.get('/api/user/:id', (req, res) => {
    res.send('This is user info!');
  });
  // 登录


}
