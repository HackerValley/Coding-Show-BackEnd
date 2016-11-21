import mongoose, { Schema } from 'mongoose';

export default mongoose.model('comment', new Schema({
  _id: Schema.Types.ObjectId,
  user: { _id: Schema.Types.ObjectId, avator: String, nickname: String },
  pid: String, // 项目id
  content: String, // 评论内容
  comment_time: Date // 评论时间
}));
