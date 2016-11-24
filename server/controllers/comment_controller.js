import CommentHandler from '../handlers/comment_handlers.js';
const commentHandler = new CommentHandler();
export default {
    // 留言获取
    fetchOne : (req, res) => {

        commentHandler.fetchAllComment(1, 100).then(result=> {
            res.send(result);
        });
    },

    // 留言
    doComment : (req, res) => {
        console.log("comment");
        let commentJson = {
            user: {_id: '5832705b29911605406a201b', avator: 'lsjflsadjflkjak', nickname: 'tom'},
            pid: 'ididi',
            content: 'lf雷锋精神来看看肌肤'
        };
        commentHandler.addComment(commentJson)
            .then(result=> {
                res.send(result);
            });
    }
}
