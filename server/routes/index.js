import userController from '../controllers/user_controller';
import projectController from '../controllers/project_controller';
import commentController from '../controllers/comment_controller';
import developerController from '../controllers/developer_controller';
import express  from 'express';
let router = express.Router();

  // ����
router.get('/', function (req, res) {
    res.render('index',{title:'backend'});
});
// �û�ע��
router.post('/api/user/register', userController.doRegister);
// �û��ǳ�
router.get('/api/user/logout', userController.logout);
//�û��ĵ�¼
router.post('/api/user/login', userController.login);

  //userControllers(app);
// �����Ŀģ��
router.get('/api/projects/new', /* checkLogin, */ projectController.doAdd);
// ��ȡ��Ŀ�б�
router.get('/api/projects/list', projectController.doAdd);
// ��ȡ�ҷ�������Ŀ
router.get('/api/projects/release', /* checkLogin, */ projectController.doAdd);
// ��ȡ�ҿ�������Ŀ
router.get('/api/projects/development', /* checkLogin, */ projectController.doAdd);
// ��ȡ��Ŀ����ҳ
router.get('/api/projects/:id', projectController.doAdd);
// ������Ŀ
router.post('/api/projects', /* checkLogin, */ projectController.doAdd);
// �޸���Ŀ
router.put('/api/projects/:id', /* checkLogin, */ projectController.doAdd);

// ���Ի�ȡ
router.get('/api/comment/:id', commentController.fetchOne);

// ����
router.post('/api/comment', commentController.doComment);
//developerController(app);

export default router;