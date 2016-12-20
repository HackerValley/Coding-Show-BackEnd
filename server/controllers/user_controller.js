import slogger from 'node-slogger';
import userHandler from '../handlers/user_handlers';
import {getInstance} from '../lib/oauth2/factory';

export default {
    doRegister(req, res) {
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
    getInfo(req, res) {
        res.send('This is user info!');
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
            res.send({status:0});
        });
    },
    logout(req, res) {
        req.session.user = null;
        res.send({status:0});
    },
    oauth2Login(req, res) {
        const snsType = req.params.snsType;
        if (!snsType) {
            return res.sendStatus(404);
        }
        const instance = getInstance(snsType,req.prototype);
        if (!instance) {
            return res.sendStatus(404);
        }
        instance.getAuthUrl(req,{},function(err,url) {
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
        userHandler.oauth2Callback(code, state, req, function(err,user) {
            if (err) {
                return res.render('error',{error:err});
            }
            res.send(user);
        });

    }

};
