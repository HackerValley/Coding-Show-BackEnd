import mongoose, {Schema} from 'mongoose';

const CommentSchema = new Schema({
    user: {_id: Schema.Types.ObjectId, avator: String, nickname: String},
    pid: String, // 项目id
    content: String, // 评论内容
    comment_time: {type: Date, default: new Date()} // 评论时间
});

export default mongoose.model('comment', CommentSchema);
