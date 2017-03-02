import slogger from 'node-slogger';
import userHandler from '../handlers/user_handlers';
import {getInstance} from '../lib/oauth2/factory';

export default {
    doRegister(req, res) {
        let msg = undefined;
        let _body = req.body;
        if(!_body.username){
            msg = '请填写正确的用户名';
            return res.send( {
                status: 1,
                msg: msg
            } );
        }
        
        if(!_body.email){
            msg = '请填写正确的邮箱';
            return res.send( {
                status: 2,
                msg: msg
            } );
        }
        if(!_body.password){
            msg = '请填写密码';
            return res.send( {
                status: 3,
                msg: msg
            } );
        }
        if (!_body.phone) {
            return res.send({status:4,msg:'请填写手机号'});
        }
        const nickname = _body.nickname;
        if (!nickname) {
            return res.send({status:5,msg:'请填写昵称'});
        }
        

        let userInfoJson = {
            username: _body.username,
            email: _body.email,
            phone : _body.phone,
            avatar : _body.avatar || '',
            nickname : nickname,
            passwd: _body.password
        };

        userHandler.addUser(userInfoJson,function(err){
            if (err) {
                return res.send({status:1,msg:err});
            }
            res.send({status:0});
        });

    },
    getInfo(req, res) {
        let userId = req.params.id;
        if (!userId && req.session.user) {
            userId = req.session.user._id;
        }
        if (!userId) {
            return res.send({status:1,msg:'用户ID不存在'});
        }
        userHandler.getOne({_id:userId},function(err,user) {
            if (err) {
                return res.send({status:2,msg:err});
            }
            res.send({status:0,data:user});
        });
    },
    getInfoByUsername(req, res) {
        //TODO check param
        userHandler.getOne({username: req.params.username},(err,user) => {
            if (err) {
                return res.send({status:1,msg:err});
            }
            res.send({status:0,data:user});
        });
    },
    login(req, res) {
        let _body = req.body;
        //TODO 检查为空
        let username = _body.username;
        let password = _body.password;
        userHandler.loginCheck(username,password,function(err,user) {
            if (err) {
                return res.send({status:1,msg:err});
            }
            req.session.user = user;
            res.send({status:0,data:user});
        });
    },
    logout(req, res) {
        req.session.user = null;
        res.send({status:0});
    },
    oauth2Login(req, res) {
        const snsType = req.params.snsType;
        if (!snsType) {console.log('snsType not given');
            return res.sendStatus(404);
        }
        const instance = getInstance(snsType,req.protocol);
        if (!instance) {console.log('instance not found');
            return res.sendStatus(404);
        }
        const redirect = req.query.redirect;
        const data = {};
        if (redirect) {
            data.redirect = redirect;
        }
        instance.getAuthUrl(req,data,function(err,url) {
            if (err) {
                return res.render('error',{error:err});
            }
            res.redirect(url);
        });

    },
    oauth2Callback(req, res) {
        let _query = req.query;
        slogger.debug('sns 回调参数',_query);
        const code = _query.code;
        if (!code) {
            return res.render('error',{error:'第三方登录错误'});
        }
        const state = _query.state;
        if (!state) {
            return res.render('error',{error:'非法验证信息'});
        }
        userHandler.oauth2Callback(code, state, req, function(err,user,state) {
            if (err) {
                return res.render('error',{error:err});
            }
            user.passwd = undefined;
            req.session.user = user;
            let url = '/#/oauth2/success';
            if (state.redirect) {
                url += '?redirect=' + encodeURIComponent(state.redirect);
            }
            res.redirect(url);
        });

    }

};
