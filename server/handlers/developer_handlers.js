import developerModel from '../models/developer_model';

export default {
  // 获取项目总数
  getCount: (query) => {
    return ProjectModel.count(query)
      .exec((err) => {
        if (err) throw err;
      });
  },
  getCountD: (id) => {
    return ProjectModel
      .where("developers.uid")
      .equals(uid)
      .count()
      .exec((err) => {
        if (err) throw err;
      });
  },
  // 获取项目列表 获取我开发的项目列表 获取我发布的项目列表
  getList: (query, op, page) => {
    return ProjectModel.find(query, op)
      .skip(page.skip)
      .limit(page.limit)
      .sort(page.sort)
      .exec((err) => {
        if (err) throw err;
      });
  },
  getListD: (uid, op, page) => {
    return ProjectModel
      .where("developers.uid")
      .equals(uid)
      .skip(page.skip)
      .limit(page.limit)
      .sort(page.sort)
      .exec((err) => {
        if (err) throw err;
      });
  },
  // 得到详细信息
  getDetail: (query, op) => {
    return ProjectModel.find(query, op)
      .exec((err) => {
        if (err) throw err;
      });
  },
  // 创建项目
  createProject: (data) => {
    return ProjectModel.create(data, (err) => {
      if (err) throw err;
    });
  },
  // 修改项目
  updateProject: (query, data) => {
    return ProjectModel.findOneAndUpdate(query, { $set: data })
      .exec((err) => {
        if (err) throw err;
      });
  },
  // 确认项目存在
  verify: (query) => {
    return ProjectModel.findOne(query)
      .exec((err) => {
        if (err) throw err;
      });
  }
}
