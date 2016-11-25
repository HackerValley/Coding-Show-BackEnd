import mongoose, { Schema } from 'mongoose';

const UserSchema =  new Schema({
    username: String, // 用户名
    nickname: String, // 昵称  第三方登录时，存储第三方用户的昵称
    passwd: String, // 密码
    level: Number, // 用户等级
    telephone: String, // 用户电话
    email: String, // 用户邮箱
    skill: Array, // 技能
    access_token: String, // 第三方token
    expire_time: String, // token的失效时间
    sns_type: Number, // 第三方用户类型 微信 qq。。。
    avatar: String, // 头像
    create_time: String, // 创建时间
    last_login_time: String // 最后登录时间
});

UserSchema.statics = {
    // 根据用户名查找用户信息
    getOne( username ){
        return new Promise((resolve, reject)=> {
            this.find(username, (err, userInfo)=>{
                if( err ){
                    reject( err );
                } else {
                    resolve( userInfo );
                }
            });
        });
    },

    // 新增用户
    add(userModel){
        return new Promise((resolve,reject)=>{
            userModel.save((err, info)=>{
                if( err ){
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }


}

export default mongoose.model('coding_show_user', UserSchema);
