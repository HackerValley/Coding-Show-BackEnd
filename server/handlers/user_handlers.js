import userModel from '../models/user_model';
import authHelper from '../helpers/auth_helper';
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

    }

}
