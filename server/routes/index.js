import userController from '../controllers/user_controller';
import projectController from '../controllers/project_controller';
import commentController from '../controllers/comment_controller';
import developerController from '../controllers/developer_controller';
import authMiddle from '../middleware/auth_middle';
import express  from 'express';
let router = express.Router();
const LOGIN_CHECK_MIDDLE = [authMiddle.needLogin];

  // 测试
router.get('/', function (req, res) {
    res.render('index',{title:'backend'});
});
// 用户注册
router.post('/api/user/register', userController.doRegister);
// 用户登出
router.get('/api/user/logout', userController.logout);
//用户的登录
router.post('/api/user/login', userController.login);
//第三方登录，snsType可选值 github linkedin qq weibo
router.get('/api/user/oauth2/:snsType');
//第三方登录回调
router.get('/api/user/oauth2/callback/:snsType');

//userControllers(app);
// 添加项目模板
router.get('/api/projects/new', /*LOGIN_CHECK_MIDDLE,*/ projectController.getNew);
// 获取项目列表
router.get('/api/projects/list', projectController.getList);
// 获取我发布的项目
router.get('/api/projects/release', /*LOGIN_CHECK_MIDDLE,*/ projectController.getRelease);
// 获取我开发的项目
router.get('/api/projects/development', /*LOGIN_CHECK_MIDDLE,*/ projectController.getDev);
// 获取项目详情页
router.get('/api/projects/:id', projectController.getDetail);
// 创建项目
router.post('/api/projects', /*LOGIN_CHECK_MIDDLE,*/ projectController.createProject);
// 修改项目
router.put('/api/projects/:id', /*LOGIN_CHECK_MIDDLE,*/ projectController.modifyProject);

//点赞
router.post('/api/projects/star', /*LOGIN_CHECK_MIDDLE,*/ projectController.doStar);
// 参与开发 


// 参与开发

router.post('/api/developers', /*LOGIN_CHECK_MIDDLE,*/developerController.joinProject);

//点赞
router.post('/api/projects/star', /*LOGIN_CHECK_MIDDLE,*/ projectController.doStar);

// 留言获取
router.get('/api/comment/:id', commentController.fetchOne);

// 留言
router.post('/api/comment', LOGIN_CHECK_MIDDLE, commentController.doComment);
//developerController(app);

//登录测试
router.get('/api/test/login',LOGIN_CHECK_MIDDLE,function(req,res) {res.send({status:0});});
// router.get('/api/test/project',projectController.addNew);

export default router;
