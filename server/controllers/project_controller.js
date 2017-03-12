import projectHandlers from '../handlers/project_handlers';
// 登录校验
//import { checkLogin } from '../middleware';
import slogger from 'node-slogger';

export default  {
    // 添加项目模板
  getNew(req, res) {
    res.json({ status: 0, msg: '添加项目模板' }); // 测试
  },
  // 获取项目列表
  getList(req, res) {
    let _query = req.query;
    // 分页
    const page_num = parseInt(_query.page_num,10);
    const page_size = parseInt(_query.page_size,10);
    projectHandlers.getList({},page_num,page_size,(err,page) => {
      if (err) {
        return res.send({status:1,msg:err});
      }
      res.send({status:0,data:page});
    });

  },

  // 获取我的项目
  getMine(req, res) {
    let _query = req.query;
    const queryType = _query.query_type;
    const query = {};
    const userId = req.session.user._id;
    if (queryType === 'release') {
      query.uid = userId;
    } else if (queryType === 'develop') {
      query['developers._id'] = userId;
    } else {
      return res.send({status:1,msg:'不支持的查询类型'});
    }
    // 分页
    const page_num = parseInt(_query.page_num,10);
    const page_size = parseInt(_query.page_size,10);
    projectHandlers.getList(query,page_num,page_size,(err,page) => {
        if (err) {
            return res.send({status:1,msg:err});
        }
        res.send({status:0,data:page});
    });
  },

  // 获取项目详情页
  getDetail(req, res) {
    if (!req.params.id) return res.json({ status: 1, msg: '项目id错误' });
    const query = { _id: req.params.id };
    const op = {
      _id: 1,
      uid: 1, // 项目作者
      project_name: 1, // 项目名称
      description: 1, // 一句话描述
      detail: 1, // 简介
      imagePath: 1, // 项目图片 字符串数组
      project_link: 1, // 链接
      developer_count: 1, // 开发者人数
      developers: 1,
      star_count: 1,// 点赞人数
      star_users: 1,
      create_time: 1,
      mod_time: 1
    };
    projectHandlers.getDetail(query, op)
      .then((result) => {
        if (!result) {
          return res.json({ status: 1, msg: '项目不存在' })
        }
        res.json({ status: 0, msg: '获取成功', data: result });
      })
      .catch(err => {
        if (err) {
          throw new Error(err);
          res.json({ status: 1, msg: err.message })
        }
      })
  },
  // 创建项目
  createProject(req, res) {
    const uid = req.session.user._id;

    // 检验参数
    let msg = '';
    if (!req.body.project_name) {
      msg = '请填写项目名称';
      return res.json({ status: 1, msg });
    }
    if (!req.body.description) {
      msg = '请填写项目概要';
      return res.json({ status: 1, msg });
    }
    if (!req.body.detail) {
      msg = '请填写项目要求';
      return res.json({ status: 1, msg });
    }
    if (!req.body.imagePath) {
      msg = '请上传图片';
      return res.json({ status: 1, msg });
    }
    if (!req.body.project_link) {
      msg = '请填写项目链接';
      return res.json({ status: 1, msg });
    }

    const data = {
      uid,
      project_name: req.body.project_name, // 项目名称
      description: req.body.description, // 项目概要
      detail: req.body.detail, // 项目要求
      imagePath: req.body.imagePath, // 项目图片
      project_link: req.body.project_link, // 项目链接
    };

    projectHandlers.createProject(data)
      .then((result) => {
        if (result) res.json({ status: 0, msg: '创建成功' });
      })
      .catch((err) => {
        throw new Error(err);
        res.json({ status: 1, msg: err.message });
      });
  },
  // 修改项目
  modifyProject(req, res) {
    const query = { _id: req.params.id };
    // 检验参数
    let msg = '';
    if (!req.body.project_name) {
      msg = '请填写项目名称';
      return res.json({ status: 1, msg });
    }
    if (!req.body.description) {
      msg = '请填写项目概要';
      return res.json({ status: 1, msg });
    }
    if (!req.body.detail) {
      msg = '请填写项目要求';
      return res.json({ status: 1, msg });
    }
    if (!req.body.imagePath) {
      msg = '请上传图片';
      return res.json({ status: 1, msg });
    }
    if (!req.body.project_link) {
      msg = '请填写项目链接';
      return res.json({ status: 1, msg });
    }

    const data = {
      project_name: req.body.project_name, // 项目名称
      description: req.body.description, // 项目概要
      detail: req.body.detail, // 项目要求
      imagePath: req.body.imagePath, // 项目图片
      project_link: req.body.project_link, // 项目链接
      mod_time: Date.now()
    };

    projectHandlers.updateProject(query, data, function (msg) {
        if  (msg) res.json({status:0,msg:msg});
    });
  },
  /* 点赞*/
  doStar(req, res) {

    const uid = req.session.user._id;
    if (!req.body.pid) return res.json({ status: 1, msg: '请检查项目id' });
    const query = { _id: req.body.pid };
    const filter = {
      _id: 0,
      star_count: 1,
      star_users: 1
    };
    let star_users = [];
    let star_count = 0;
    projectHandlers.star(uid,query,filter,function (msg) {
      if (msg) res.json({ status:0, msg:msg });
    })
  }
}
