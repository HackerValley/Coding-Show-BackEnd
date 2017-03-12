import {Types} from 'mongoose';
import async from 'async';
import slogger from 'node-slogger';
import DeveloperModel from '../models/developer_model';
import ProductModel from '../models/project_model';

export default {
  joinProject: (user,pid,skills,callback) => {
    pid = Types.ObjectId(pid);
    const userId = user._id;
    async.waterfall([
        function(callback) {
            ProductModel.findOne({
              'developers._id':userId
            },'_id',function(err,item) {
              if (err) {
                slogger.error('获取开发者信息时失败',err);
                return callback('获取开发者信息时失败');
              }
              if (item) {
                return callback('当前用户已经是此项目开发者');
              }
              callback(false);
            });

        },function(callback) {
            DeveloperModel.findOne({
              uid:userId,pid:pid
            },'_id',function(err,item) {
              if (err) {
                slogger.error('获取当前开发者申请信息时失败',err);
                return callback('获取当前开发者申请信息时失败');
              }
              if (item) {
                return callback('当前开发者已经申请此项目开发者');
              }
              callback(false);
            });
        },function(callback) {
          new DeveloperModel({
              uid:userId,
              avatar:user.avatar,
              nickname:user.nickname,
              pid:pid,
              dev_skills:skills
          }).save(function(err) {
            if (err) {
              slogger.error('保存开发者信息时失败',err);
              return callback('保存开发者信息时失败');
            }
            return callback(false);
          });
        },
        function(callback) {//todo 后期需要审核才能将当前开发者加入项目中

            ProductModel.update({_id:pid},{
              $addToSet:{
                developers:{
                  _id:userId,
                  avatar:user.avatar,
                  nickname:user.nickname
                }
              },
              $inc:{
                developer_count : 1
              }
            },function(err,raw) {
              if (err) {
                slogger.error('审核开发者失败',err);
              }
              callback(false);//这里直接返回
            });
        }
    ],callback);
  }
}
