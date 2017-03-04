import slogger from 'node-slogger';
import async from 'async';
import ProjectModel from '../models/project_model';
import {pageViaServer} from '../helpers/model_helper';

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
  getList(query, pageNum, pageSize, callback) {
    pageViaServer(ProjectModel, query, {
      sort: {_id: -1}, fields: {star_users: 0}, pageNum, pageSize
    }, function (err, page) {
      if (err) {
        slogger.error('获取项目列表时失败', err);
        return callback('获取项目列表时失败');
      }
      callback(false, page);
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
  updateProject: (query, data, fn) => {
    ProjectModel.findOne(query).exec((err, item) => {
      if (err) console.error(err.message);
      return item;
    })
      .then((item) => {
        if (!item) return fn('该项目不存在或已被删除');
        if (item) {
          ProjectModel.findOneAndUpdate(query, {$set: data})
            .exec((err, item) => {
              if (err) console.error(err.message);
              if (item) return fn('项目更新成功');
            })
        }
      })
  },
  // 点赞功能
  star: (uid, query, filter, fn) => {
    let data = {};
    ProjectModel.findOne(query, filter).exec((err,item) => {
      if (err) throw new Error(err);
      if (!item) {
        return fn('该项目不存在');
      } else {
        //console.log('点赞前\n' + item);
        item.star_count += 1;
        item.star_users.push(uid);
        //console.log('点赞后\n' + item);
        return item;
      }
    })
      .then((item) => {
        //console.log('更新前' + item);
        ProjectModel.findOneAndUpdate(query, {
          $set: {
            star_count: item.star_count,
            star_users: item.star_users
          }
        }, (err, item) => {
          if (err) throw new Error(err);
          if (item) return fn('点赞成功');
        })
      })
  }
}
