import userHandlers from '../handlers/user_handlers.js';
const userHandle = new userHandlers();

export default function (app) {
    // 用户注册
    app.post('/api/user/register', (req, res) => {
        let defaultJson = {
            username: 'user1',
            nickname: 'yunDuanXinYue',
            passwd: '123456',
            level: '1',
            telephone:  '15079051079',
            email: 'suhanyujie@qq.com',
            skill: [],
            access_token: 'xxxxx',
            expire_time: '1457625320',
            sns_type: 0,
            avatar: 'http://fd.img.com/img1.png',
            create_time: '2016-11-22 12:23:00',
            last_login_time: '2016-11-22 15:23:00'
        };
        let userInfoJson = {
            username: req.body.username,
            email: req.body.email,
            passwd: req.body.password,
            create_time: new Date().toLocaleString()
        };
        userInfoJson = Object.assign(defaultJson, userInfoJson);
        userHandle.addUser(userInfoJson)
            .then((result)=>{
                res.send(result);
            });

    });

    // 获取用户信息
    app.get('/api/user/:id', (req, res) => {
        res.send('This is user info!');
    });
    // 根据用户名获取用户信息
    app.get('/api/username/:username', (req, res) => {
        userHandle.getOne({username: req.params.username})
        .then((result)=>{
            res.send( result );
        });
    });

    // 登录


}
