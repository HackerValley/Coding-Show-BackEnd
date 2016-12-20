import slogger from 'node-slogger';
import async from 'async';
import userModel from '../models/user_model';
import authHelper from '../helpers/auth_helper';
import {refreshUserData} from '../helpers/model_helper';
import URLSafeBase64 from '../utils/urlsafe-base64';
import {OAUTH2_CALLBACK_MAX_AGE} from '../config';
import factory from '../lib/oauth2/factory';
export default   {
    loginCheck(username,passwd,callback) {
        userModel.findOne({username:username},function(err,item) {
            if (err) {
                console.error('获取用户信息时失败',err);
                return callback('获取用户信息时失败');
            }
            if (!item) {
                return callback('当前用户不存在');
            }
            if (!authHelper.passwdVerify(username,passwd,item.passwd)) {
                return callback('用户名或者密码错误');
            }
            item.passwd = undefined;
            callback(false,item);
        });
    },
    // 查询某个用户信息
    getOne(someInfo,callback) {
        userModel.findOne( someInfo,(err,item) => {
            if( err ){
                console.error('查找用户时失败',err);
                return callback('查找用户时失败');
            }
            callback(false,item);
        });

    },
    // 添加用户
    addUser(userInfo,callback) {
//TODO 检查唯一性
        userInfo.passwd = authHelper.passwdSign(userInfo.username,userInfo.passwd);
        new userModel(userInfo).save((err, userInfo)=>{
            if( err ){
                console.error('添加用户失败',err);
                return callback('添加用户失败');
            }
            callback(false,userInfo);
        });

    },

    oauth2Callback(code,state,req,callback) {
        try {
            state = URLSafeBase64.decode(state).toString();
            state = JSON.parse(state);
        } catch (e) {
            slogger.error('当前凭证格式错误',e);
            return callback('当前凭证格式错误');
        }
        let session = req.session;
        if (session.rand != state.rand) {
            return callback('非法的登录凭证');
        }
        if (new Date().getTime() - state.time > OAUTH2_CALLBACK_MAX_AGE) {
            return callback('登录超时');
        }
        const instance = factory.getInstance(state.type,req.protocol);
        if (!instance) {
            return callback('不支持的登录类型：'+state.type);
        }
        async.waterfall([
            function(callback) {
                instance.getAccessToken(code,function(err,body){
                    if (err) {
                        slogger.error('请求access token时失败',err);
                        return callback('请求access token时失败');
                    }
                    if (!body.access_token) {
                        slogger.error('请求access token失败',err);
                        return callback('请求access token失败');
                    }
                    callback(false,body.access_token);
                });
            },function(accessToken,callback) {
                instance.getUserInfo(accessToken,function(err,user) {
                    if (err) {
                        return callback(err);
                    }
                    callback(false,user);
                });
            },function(user,callback) {
                userModel.findOne({
                    sns_id:user.sns_id,sns_type:user.sns_type
                },'username',function(err,item) {
                    if (err) {
                        slogger.error('查询用户信息时失败',err);
                        return callback('查询用户信息时失败');
                    }
                    callback(false,user,item);
                });

            },function(snsUser,dbUser,callback) {
                if (dbUser) {
                    refreshUserData(dbUser._id,snsUser,function (err) {

                    });
                    return callback(false,Object.assign(dbUser,snsUser));
                }
                new userModel(snsUser).save(function(err,userInfo) {
                    if (err) {
                        slogger.error('保存用户数据时失败',err);
                        return callback('保存用户数据时失败');
                    }
                    callback(false,userInfo);
                });
            }
        ],callback);


    }

}
