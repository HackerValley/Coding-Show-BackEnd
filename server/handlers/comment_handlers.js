import CommentModel from '../models/comment_model';
import {pageViaServer} from '../helpers/model_helper';

export default {
    fetchAllComment(pid, pageNum, pageSize, callback) {

        pageViaServer(CommentModel, {p_id: pid}, {
            pageNum: pageNum,
            pageSize: pageSize,
            sort:{_id: -1}
        }, (err, result)=> {
            if (err) {
                return callback({
                    status: 1,
                    msg: '获取评论失败',
                });
            }
            callback({status: 0, data: result});
        });

        // CommentModel.find({p_id: pid}, null,(err, result)=> {
        //     if (err) {
        //         return callback({
        //             status: 1,
        //             msg: '获取评论失败',
        //         });
        //     }
        //     callback({status: 0, data: result});
        // });

        // CommentModel.find({p_id: pid})
        //     .sort({'time':'desc'})
        //     .exec((err, result)=> {
        //         if (err) {
        //             return callback({
        //                 status: 1,
        //                 msg: '获取评论失败',
        //             });
        //         }
        //         callback({status: 0, data: result});
        //     });
    },

    addComment(commentJson, callback) {
        let commentModel = new CommentModel(commentJson);
        commentModel.save((err, comment)=>callback(err, comment));
    }

}