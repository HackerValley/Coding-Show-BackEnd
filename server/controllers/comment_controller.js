import commentHandler  from '../handlers/comment_handlers.js';
export default {
    // 留言获取
    fetchOne(req, res) {
        commentHandler.fetchAllComment(10, 1, 10, (err, result)=> {
            res.send(result);
        })
    },

    // 留言
    doComment(req, res) {
        commentHandler.addComment(req.body.comment, (err, comment)=> {
            if (err) {
                return res.send({status: 1, msg: '留言失败'})
            }
            res.send({
                status: 0,
                msg: '留言成功',
                date: comment
            });
        })
    }
}
