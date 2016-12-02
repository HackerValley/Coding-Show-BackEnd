import CommentModel from '../models/comment_model';
import {pageViaServer} from '../helpers/model_helper';

export default {
    fetchAllComment(pid,pageNum, pageSize,callback) {
        pageViaServer(CommentModel,{},{
            pageNum:pageNum,
            pageSize:pageSize
        },callback)
    },

    addComment(commentJson,callback) {
       let commentModel=new CommentModel(commentJson);
        commentModel.save((err,comment)=>callback(err,comment));
    }

}