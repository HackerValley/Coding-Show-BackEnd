import mongoose, { Schema } from 'mongoose';
import {formatDate} from '../utils/time';

const UserSchema =  new Schema({
    username: {type:String, unique: true}, // 用户名
    nickname: {type:String,default:''}, // 昵称  第三方登录时，存储第三方用户的昵称
    passwd: String, // 密码
    level: {type:Number,default:0}, // 用户等级
    telephone: {type:String,default:''}, // 用户电话
    email: String, // 用户邮箱
    skill: {type:Array,default:[]}, // 技能
    access_token: {typte:String,default:''}, // 第三方token
    expire_time: String, // token的失效时间
    sns_type: {type:Number,default:0}, // 第三方用户类型 微信 qq。。。
    sns_id : {type:String,default:''},//第三方用户用户ID
    avatar: {type:String,default:''}, // 头像
    create_time: {type:Date, default : Date.now}, // 创建时间
    last_login_time: {type:Date, default : Date.now} // 最后登录时间
});
UserSchema.index({username:1},{unique:true,sparse:true});

UserSchema.statics = {
    //除非特殊情况，不要在这里写业务逻辑
};

export default mongoose.model('coding_show_user', UserSchema);
