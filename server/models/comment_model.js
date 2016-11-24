import mongoose, {Schema} from 'mongoose';

const CommentSchema = new Schema({
    user: {_id: Schema.Types.ObjectId, avator: String, nickname: String},
    pid: String, // 项目id
    content: String, // 评论内容
    comment_time: {type: Date, default: Date.now} // 评论时间
});


CommentSchema.statics = {
    fetchAll(page, pageSize, cb){
        if (page < 1)page = 1;
        return new Promise((resolve, reject)=> {
            this.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .sort('comment_time')
                .exec((err, comments)=> {
                    if (err) {
                        reject(err);
                    } else {
                        // reject(err);
                        resolve(comments)
                    }
                })
        });
    },
    add(commentModle){
        return new Promise((resolve, reject)=> {
            commentModle.save((err, comment)=> {
                if (err) {
                    reject(err);
                } else {
                    resolve(comment);
                }
            })
        });

    }

};
export default mongoose.model('comment', CommentSchema);
