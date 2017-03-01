import commentHandler  from '../handlers/comment_handlers.js';
export default {
    // 留言获取
    fetchByProjectId(req, res) {
        let projectId=req.query.id;
        commentHandler.fetchAllComment(projectId, 1, 10, (err, result)=> {
            res.send(result);
        })
    },

    // 留言
    doComment(req, res) {

        let user = req.session.user;
        if (!user) {
            return res.send({
                status: 1,
                msg: '请先登录',
            });
        }
        let comment = req.body.comment;
        if (!comment) {
            return res.send({
                status: 1,
                msg: '评论内容不能为空',
            });
        }
        comment = Object.assign({}, comment, {
            user: {
                _id: user._id,
                avator: user.anchor,
                nickname: user.nickname
            }
        });

        commentHandler.addComment(comment, (err, comment)=> {
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
