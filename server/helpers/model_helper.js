/**
 * Created by sunny on 2016/11/25.
 */
import Pagination from '../utils/Pagination';
/**
 * 分页回调函数.
 *
 * @callback PaginationCallback
 * @param {Error} err
 * @param {Pagination} page
 */

/**
 * 分页辅助函数
 * @param {Mongoose.Model} model
 * @param {Object} query  查询条件
 * @param {Object} params
 * @param {Object?} params.sort 排序字段
 * @param {Object?} params.fields 查询返回的字段
 * @param {Number?} params.pageNum
 * @param {Number?} params.pageSize
 * @param {PaginationCallback} callback
 */
export function pageViaServer(model,query,params,callback) {
    model.count(query,function(err,num) {
        if (err) {
            return callback(err);
        }
        let pageNum = params.pageNum || 1;
        let pageSize = params.pageSize || Pagination.NUM_DEFAULT_PAGE_SIZE;
        if (num === 0) {
            return callback(false,new Pagination({
                pageNum : pageNum,
                pageSize : pageSize,
                recordTotal : 0,
                list : []
            }));
        }

        let option = {limit:pageSize,skip : (pageNum - 1) * pageSize, fields:params.fields};
        let sort = params.sort;
        if (sort) {
            if (typeof (sort) === 'number') {
                option.sort = {_id:sort};
            } else if (typeof (sort) === 'object') {
                option.sort = sort;
            }
        }
        model.find(query).setOptions(option).exec(function(err,items) {
            if (err) {
                return callback(err);
            }
            callback(false,new Pagination({
                pageNum : pageNum,
                pageSize : pageSize,
                recordTotal : num,
                list : items
            }));
        });
    });
};
