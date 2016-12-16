import projectHandlers from '../handlers/project_handlers.js';
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
    let record_total = 0;
    let sort_key = { create_time: -1 };// 测试
    const query = {};

    projectHandlers.getCount(query)
      .then((result) => {
        if (result) {
          record_total = result;
        } else {
          return res.json({ status: 1, msg: '没有项目' });
        }
      })
      .catch(err => {
        if (err) throw new Error(err);
      });

    // 分页
    const page_num = req.body.page_num || 1;
    const page_size = req.body.page_size || 12;
    const page_total = Math.floor(record_total / page_size) + 1;
    const op = {
      create_time: 1,
      pid: 1,
      project_name: 1,
      star_count: 1,
      uid: 1
    };
    const pages = {
      skip: (page_num - 1) * page_size,
      limit: page_size,
      sort: sort_key
    };

    projectHandlers.getList(query, op, pages)
      .then((result) => {
        res.json({
          status: 0,
          msg: '获取项目列表',
          data: {
            page_num,
            page_size,
            page_total,
            projects_total: record_total,
            list: result
          }
        });
      })
  },

  // 获取我发布的项目
  getRelease(req, res) {
    const uid = req.session.uid;
    let sort_key = { create_time: -1 };// 测试
    const query = { uid };
    let record_total = 0;

    projectHandlers.getCount(query)
      .then((result) => {
        if (result) {
          record_total = result;
        } else {
          return res.json({ status: 1, msg: '没有项目' });
        }
      })
      .catch((err) => {
        if (err) throw new Error(err);
      });


    const op = {
      create_time: 1,
      pid: 1,
      project_name: 1,
      star_count: 1,
      uid: 1
    };

    // 分页
    const page_num = req.body.page_num || 1;
    const page_size = req.body.page_size || 12;
    const page_total = Math.floor(record_total / page_size) + 1;
    const pages = {
      skip: (page_num - 1) * page_size,
      limit: page_size,
      sort: sort_key
    };

    projectHandlers.getList(query, op, pages)
      .then((result) => {
        res.json({
          status: 0,
          msg: '获取项目列表',
          data: {
            page_num,
            page_size,
            page_total,
            projects_total: record_total,
            list: result
          }
        });
      });
  },
  // 获取我开发的项目
  getDev(req, res) {
    const uid = req.session.uid;
    let record_total = 0;
    let sort_key = { create_time: -1 };// 测试
    projectHandlers.getCountD(uid)
      .then((result) => {
        if (result) {
          record_total = result;
        } else {
          return res.json({ status: 1, msg: '没有项目' });
        }
      })
      .catch(err => {
        if (err) throw new Error(err);
      });

    const op = {
      create_time: 1,
      pid: 1,
      project_name: 1,
      star_count: 1
    };

    // 分页
    const page_num = req.body.page_num || 1;
    const page_size = req.body.page_size || 12;
    const page_total = Math.floor(record_total / page_size) + 1;
    const pages = {
      skip: (page_num - 1) * page_size,
      limit: page_size,
      sort: sort_key
    };

    projectHandlers.getListD(uid, op, pages)
      .then((result) => {
        res.json({
          status: 0,
          msg: '获取项目列表',
          data: {
            page_num,
            page_size,
            page_total,
            projects_total: record_total,
            list: result
          }
        });
      })
  },
  // 获取项目详情页
  getDetail(req, res) {
    if (!req.params.id) return res.json({ status: 1, msg: '项目id错误' });
    const query = { _id: req.params.id };
    const op = {
      _id: 1,
      project_name: 1, // 项目名称
      description: 1, // 一句话描述
      detail: 1, // 简介
      imagePath: 1, // 项目图片 字符串数组
      project_link: 1, // 链接
      developer_count: 1, // 开发者人数
      star_count: 1 // 点赞人数
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
    const uid = '1123234'; // 测试用
    // const uid = req.session.uid;

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

    projectHandlers.verify(query)
      .then((result) => {
        if (result) {
          projectHandlers.updateProject(query, data)
            .then((result) => {
              if (result) res.json({ status: 0, msg: '更新成功' });
            });
        }
      })
      .catch((err) => {
        if (err) throw err;
        res.json({ status: 1, msg: "该项目不存在" });
      });

  },
  /* 点赞*/
  doStar(req, res) {
    //const uid = req.session.uid;
    const uid = '23';// 测试
    if (!req.body.pid) return res.json({ status: 1, msg: '请检查项目id' });
    const query = { _id: req.body.pid };
    const filter = {
      _id: 0,
      star_count: 1,
      star_users: 1
    };
    let star_users = [];
    let star_count = 0;
    projectHandlers.verify(query)
      .then((result) => {
        if (result) {
          projectHandlers.getDetail(query, filter)
            .then((result) => {
              star_count = result.star_count;
              star_users = result.star_users;
            });
          /* 防止重复点赞功能;
          const temp = star_users.every((val) => {
            if (val === uid) return false;
            return true;
          });
          if (temp) {
            star_users.push(uid);
          } else {
            star_users = [];
            star_count += 1;
            return res.json({ status: 1, msg: '请不要重复点赞' });
          }
          */
          star_count += 1;
          star_users.push(uid);
          const data = {
            star_count,
            star_users
          };
          projectHandlers.updateProject(query, data)
            .then((result) => {
              if (result) res.json({ status: 0, msg: '更新成功' });
            });
        }
      })
      .catch((err) => {
        if (err) throw err;
        res.json({ status: 1, msg: err.message });
      });
  }
}
