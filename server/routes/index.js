import userController from '../controllers/user_controller';
import projectController from '../controllers/project_controller';
import commentController from '../controllers/comment_controller';
import developerController from '../controllers/developer_controller';
import express  from 'express';
let router = express.Router();

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

  //userControllers(app);
// 添加项目模板
router.get('/api/projects/new', /* checkLogin, */ projectController.doAdd);
// 获取项目列表
router.get('/api/projects/list', projectController.doAdd);
// 获取我发布的项目
router.get('/api/projects/release', /* checkLogin, */ projectController.doAdd);
// 获取我开发的项目
router.get('/api/projects/development', /* checkLogin, */ projectController.doAdd);
// 获取项目详情页
router.get('/api/projects/:id', projectController.doAdd);
// 创建项目
router.post('/api/projects', /* checkLogin, */ projectController.doAdd);
// 修改项目
router.put('/api/projects/:id', /* checkLogin, */ projectController.doAdd);

// 留言获取
router.get('/api/comment/:id', commentController.fetchOne);

// 留言
router.post('/api/comment', commentController.doComment);
//developerController(app);

export default router;