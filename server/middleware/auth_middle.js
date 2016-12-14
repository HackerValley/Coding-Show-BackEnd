/**
 * Created by sunny on 2016/11/26.
 */
const ERROR_NO_LOGIN = 0xffff;
export default {
    needLogin(req, res, next) {
        if (req.session && req.session.user) {
            return next();
        }
        if (req.xhr) {
            return res.send({status:ERROR_NO_LOGIN , msg:'尚未登录'});
        }
        res.render('error',{error:'尚未登录'});
    }
};