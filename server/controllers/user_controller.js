import userHandler from '../handlers/user_handlers';

export default {
    doRegister : function(req, res) {
        let msg = undefined;
        if(!req.body.username){
            msg = '请填写正确的用户名';
            return res.send( {
                status: 1,
                msg: msg
            } );
        }
        if(!req.body.email){
            msg = '请填写正确的邮箱';
            return res.send( {
                status: 2,
                msg: msg
            } );
        }
        if(!req.body.password){
            msg = '请填写密码';
            return res.send( {
                status: 3,
                msg: msg
            } );
        }

        let userInfoJson = {
            username: req.body.username,
            email: req.body.email,
            passwd: req.body.password
        };

        userHandler.addUser(userInfoJson,function(err){
            if (err) {
                return res.send({status:1,msg:err});
            }
            res.send({status:0});
        });

    },
    getInfo : function(req, res) {
        res.send('This is user info!');
    },
    getInfoByUsername : function(req, res){
        userHandler.getOne({username: req.params.username}).then((result)=>{
            res.send( result );
        });
    },
    login : function(req, res){
        let _body = req.body;
        //TODO 检查为空
        let username = _body.username;
        let password = _body.password;
        userHandler.loginCheck(username,password,function(err,user) {
            if (err) {
                return res.send({status:1,msg:err});
            }
            req.session.user = user;
            res.send({status:0});
        });
    },
    logout : function(req, res){
        req.session.user = null;
        res.send({status:0});
    }

};
