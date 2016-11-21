import mongoose, { Schema } from 'mongoose';

export default mongoose.model('developer', new Schema({
  uid: String, // 用户id
  pid: String, // 参与项目id
  dev_skills: Array,   // 开发技术栈
  application_time: Date //申请时间
}));
