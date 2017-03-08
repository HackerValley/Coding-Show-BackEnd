import mongoose, {Schema} from 'mongoose';

const CommentSchema = new Schema({
    user: {_id: Schema.Types.ObjectId, avator: String, nickname: String},
    p_id: String, // 项目id
    comment_msg: String, // 评论内容
    time: {type: Date, default: Date.now} // 评论时间
});

export default mongoose.model('comment', CommentSchema);
