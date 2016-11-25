import userHandlers from '../handlers/user_handlers.js';
const userHandle = new userHandlers();


export default {
    doRegister : function(req, res) {
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
            last_login_time: new Date
        };
        let msg = [],errFlag = false;
        if(!req.body.username){
            msg.push('请填写正确的用户名');
            errFlag = true;
        }
        if(!req.body.email){
            msg.push('请填写正确的邮箱');
            errFlag = true;
        }
        if(!req.body.password){
            msg.push('请填写密码');
            errFlag = true;
        }
        if(errFlag){
            let result = {
                status: 0,
                msg: msg
            };
            res.send( result );
        }
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

    },
    getInfo : function(req, res) {
        res.send('This is user info!');
    },
    getInfoByUsername : function(req, res){
        userHandle.getOne({username: req.params.username}).then((result)=>{
            res.send( result );
        });
    },
    login : function(req, res){
        let username = req.body.username;
        userHandle.getOne({username: username}).then((result)=>{
            //console.log(result);res.send(result);return;
            req.session.user = result.data;
            res.redirect('/');
        });
    },
    logout : function(req, res){
        req.session.user = null;
        res.redirect('/');
    }

};
