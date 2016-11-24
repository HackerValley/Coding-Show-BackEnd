// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)

exports.formatDate = function(date, fmt){ //author: meizz
    fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
};
if (!Date.prototype.format) {
    Date.prototype.format = function(fmt) {
        return exports.formatDate(this,fmt);
    }
}
/**
 *
 * @param origin 格式：20161201115908
 * @returns {string}
 */
exports.getFormatTimeFromDigitString = function(origin){
    if (!origin || origin.length !== 14) {
        return '';
    }
    var date = new Date(origin.substr(0,4),origin.substr(4,2) - 1,origin.substr(6,2),
        origin.substr(8,2),origin.substr(10,2),origin.substr(12,2));
    return date.format();
}