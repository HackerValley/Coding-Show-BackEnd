/**
 * User: sunny
 * Date: 15-4-15
 * Time: 下午5:18
 */
var request = require('request');
var slogger = require('./slogger');
const TIME_OUT_MILLISECONDS = 5*1000;
const POOL_SIZE = 16;
exports.TIME_OUT_MILLISECONDS = TIME_OUT_MILLISECONDS;
function parseResponse(url,description, error,response,body,callback) {
    if (error) {
        slogger.error('请求'+url+'失败',error);
        callback('请求'+description+'网络错误');
        return;
    }
    if (!response) {
        callback('请求'+description+'失败，未知错误');
        return;
    }
    if (response.statusCode != 200) {
        slogger.error(url, response.statusCode, body);
        callback('请求'+description+'失败['+response.statusCode+']');
        return;
    }
    callback(false,body);
}

exports.parseResponse = parseResponse;

function doGet(url, params,description, callback) {
    var options = {
        qs:params,
        json:true,
        timeout:TIME_OUT_MILLISECONDS
    };

    slogger.debug('请求地址',url,'请求参数',options);
    request.get(url,options,function(error,response,body) {
        parseResponse(url,description,error,response,body,callback);
    });
}
exports.doGet = doGet;

function doPost(url,params,description,callback) {
    var options = {form:params,json:true,timeout:TIME_OUT_MILLISECONDS,pool: {maxSockets: POOL_SIZE}};
    slogger.debug('请求地址',url,'请求参数',options);
    request.post(url,options,function(error,response,body) {
        parseResponse(url,description,error,response,body,callback);
    });
}
exports.doPost = doPost;

function doPostPlain(url,params,description,callback) {
    var options = {form:params,timeout:TIME_OUT_MILLISECONDS,pool: {maxSockets: POOL_SIZE}};
    slogger.debug('请求地址',url,'请求参数',options);
    request.post(url,options,function(error,response,body) {
        parseResponse(url,description,error,response,body,callback);
    });
}
exports.doPostPlain = doPostPlain;