import userController from '../controllers/user_controller';
import projectController from '../controllers/project_controller';
import commentController from '../controllers/comment_controller';
import fileController from '../controllers/file_controller';
import developerController from '../controllers/developer_controller';
import authMiddle from '../middleware/auth_middle';
import express  from 'express';
// 文件上传 by汉宇 20170118
let multer  = require('multer');
// 通过 fileController中的配置 进行属性定制
let storage = multer.diskStorage( fileController.diskStorageConfig() );
// 通过 storage 选项来对 上传行为 进行定制化
let upload = multer({ storage: storage });
let router = express.Router();
const LOGIN_CHECK_MIDDLE = [authMiddle.needLogin];

  // 测试
router.get('/api', function (req, res) {
    res.render('index',{title:'backend'});
});
// 用户注册
router.post('/api/user/register', userController.doRegister);
// 用户登出
router.get('/api/user/logout', userController.logout);
//用户的登录
router.post('/api/user/login', userController.login);
//获取当前登录用户信息
router.get('/api/user', LOGIN_CHECK_MIDDLE, userController.getInfo);
//根据ID获取用户信息
router.get('/api/user/:id',userController.getInfo);
//第三方登录，snsType可选值 github linkedin qq weibo
router.get('/api/user/oauth2/:snsType', userController.oauth2Login);
//第三方登录回调
router.get('/api/user/oauth2/callback/:snsType', userController.oauth2Callback);

//userControllers(app);
// 添加项目模板
// 获取项目列表
router.get('/api/projects/list', projectController.getList);
// 获取我的项目
router.get('/api/projects/mine', LOGIN_CHECK_MIDDLE, projectController.getMine);

// 获取项目详情页
router.get('/api/projects/:id', projectController.getDetail);
// 创建项目
router.post('/api/projects', LOGIN_CHECK_MIDDLE, projectController.createProject);
// 修改项目
router.put('/api/projects/:id', LOGIN_CHECK_MIDDLE, projectController.modifyProject);

//点赞
router.post('/api/projects/star', LOGIN_CHECK_MIDDLE, projectController.doStar);
// 参与开发 


// 参与开发

router.post('/api/developers', LOGIN_CHECK_MIDDLE,developerController.joinProject);


// 留言获取
router.get('/api/comment/:id', commentController.fetchByProjectId);

// 留言
router.post('/api/comment', LOGIN_CHECK_MIDDLE, commentController.doComment);
//developerController(app);

// 文件上传
router.post('/api/upload', upload.single('attachment'), fileController.doUpfile);
router.get('/api/upload', function (req, res) {
    res.render('testForm',{title:'backend'});
});

//登录测试
router.get('/api/test/login',LOGIN_CHECK_MIDDLE,function(req,res) {res.send({status:0});});
// router.get('/api/test/project',projectController.addNew);

export default router;
