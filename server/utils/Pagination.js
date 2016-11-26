/**
 * 分页处理返回的数据结构
 *
 * @param {Object} options
 * @param {Number} options.pageNum 当前页码数
 * @param {Number} options.pageSize 当前分页大小
 * @param {Number} options.recordTotal 符合当前查询条件的记录总数
 * @param {Array} options.data 查询到的记录数组
 * @constructor
 */
function Pagination(options) {
    this.page_num = options.pageNum || 1;
    this.page_size = options.pageSize || Pagination.NUM_DEFAULT_PAGE_SIZE;
    this.record_total = options.recordTotal || 0;
    this.page_total = Math.ceil(this.record_total/this.page_size);
    this.data = data || [];
    this.option = {};
}

Pagination.NUM_DEFAULT_PAGE_SIZE = 10;

Pagination.prototype.setOption = function(option) {
    if (option && typeof (option) == 'object') {
        for(var key in option) {
            this.option[key] = option[key];
        }
    }
};

export default Pagination;
