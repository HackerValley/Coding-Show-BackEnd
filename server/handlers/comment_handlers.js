import CommentModel from '../models/comment_model';
import {respond} from '../utils'
export default class CommentHandler {
    constructor() {
    }

    fetchAllComment(page, pageSize) {
        return CommentModel.fetchAll(page, pageSize)
            .then(comments=> {
                return respond(0, '查询成功', comments, 1, pageSize);
            }).catch(err=> {
                return respond(110, '查询失败');

            });
    };


    addComment(commentJson) {
        return CommentModel.add(new CommentModel(commentJson))
            .then(comment=> {
                return respond(0, '评论成功', comment);
            }).catch(err=> {
                return respond(119, '评论失败');
            })

    }

}