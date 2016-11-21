import mongoose, { Schema } from 'mongoose';

export default mongoose.model('user', new Schema({
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
  create_time: Date, // 创建时间
  last_login_time: Date // 最后登录时间
}));
