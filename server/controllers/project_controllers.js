import projectHandlers from '../handlers/project_handlers.js';
// 登录校验
//import { checkLogin } from '../middleware';

export default function(app) {
  // 添加项目模板
  app.get('/api/projects/new', /* checkLogin, */ (req, res) => {
    res.send('添加项目模板');
  });
  // 获取项目列表
  app.get('/api/projects/list', (req, res) => {
    res.send('获取项目列表');
  });
  // 获取我发布的项目
  app.get('/api/projects/release', /* checkLogin, */ (req, res) => {
    res.send('获取我发布的项目');
  });
  // 获取我开发的项目
  app.get('/api/projects/development', /* checkLogin, */ (req, res) => {
    res.send('获取我开发的项目');
  });
  // 获取项目详情页
  app.get('/api/projects/:id', (req, res) => {
    const id = req.params.id;
    res.send('获取项目详情页'+id);
  });
  // 创建项目
  app.post('/api/projects', /* checkLogin, */ (req, res) => {
    res.send('创建项目');
  });
  // 修改项目
  app.put('/api/projects/:id', /* checkLogin, */ (req, res) => {
    const id = req.params.id;
    res.send('修改项目'+id);
  });

}
