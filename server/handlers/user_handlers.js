import userModel from '../models/user_model';
import authHelper from '../helpers/auth_helper';
export default   {
    loginCheck : function(username,passwd,callback) {
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
    getOne : function(someInfo){
        return userModel.getOne( someInfo )
                .then((userInfo)=>{
                    return {
                        status: 1,
                        msg: 'success',
                        data: userInfo
                    }
                })
                .catch((err)=>{
                    return {
                        status: 0,
                        msg: 'error',
                        data: err
                    }
                });
    },
    // 添加用户
    addUser: function(userInfo,callback) {
//TODO 检查唯一性
        userInfo.passwd = authHelper.passwdSign(userInfo.username,userInfo.passwd);
        new userModel(userInfo).save((err, userInfo)=>{
            if( err ){
                console.error('添加用户失败',err);
                return callback('添加用户失败');
            }
            callback(false,userInfo);
        });

    }

}
