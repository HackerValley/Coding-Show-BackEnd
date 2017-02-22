/**
 * Created by suhanyu on 17/1/18.
 */
if(typeof(fs) == 'undefined'){
    var fs = require('fs');
    var path = require('path');
}
var exec = require('child_process').exec;
if(typeof(path) == 'undefined'){
    var path = require('path');
}


/**
 * 文件夹创建类
 */
class Coding_Mkdir {
    // 构造函数
    constructor(){
        let dateObj = new Date();
        this.year = dateObj.getFullYear();
        this.month = Math.floor((  dateObj.getMonth() + 3   ) / 3 );
        this.day = dateObj.getDate();
        // 公共的路径前缀
        let configData = require(__dirname + '/../../config.json');
        this.publicPath = configData.upfile.publicPath;
        this.domain = configData.upfile.domain;
    }
    // 获取创建文件夹后的文件夹路径的字符串
    getPathStr(){
        let pathArr = [this.year, this.month, this.day];
        let pathStr = pathArr.join('/');
        if(this.fullPath){
            let tmpPublicPath = this.publicPath;
            tmpPublicPath = tmpPublicPath.split('/');
            if(this.domain && this.domain.indexOf('http') < 0){
                this.domain = 'http://' + this.domain + '/';
            }
            return {
                realPath: this.fullPath,
                webPath: tmpPublicPath[1] + '/' + pathStr+'/',
                webFullPath: this.domain + tmpPublicPath[1] + '/' + pathStr+'/'
            };
        }
        pathStr = this.publicPath + pathStr;
        this.fullPath = path.resolve(__dirname + '/../' + pathStr )
        return this.fullPath;
    }
    // 根据路径的字符串创建文件夹  支持 递归的创建
    createFolder(pathStr, mode){
        if(!pathStr){
            this.getPathStr();
            pathStr = this.fullPath;
        }
        let p1 = new Promise((resolve, reject)=>{
            if ( fs.existsSync(pathStr) ) {
                resolve(200);
            }else{
                exec( 'mkdir -p ' + pathStr, ( e,  stdout,  stderr)=> {
                    if(e){
                        console.log(e);
                        throw e;
                    }
                    resolve(201);
                });
            }
        });
        p1.then((status)=>{
            if(status != 200 && status != 201)throw 'create upfile folder error!';
            return new Promise((resolve, reject)=>{
                if(status != 201)resolve('success');
                exec( 'chmod -R 0777 ' + pathStr, ( e,  stdout,  stderr)=> {
                    if(e)console.log(e);
                    resolve('success');
                });
            })
        }).then(()=>{
            console.log('create upfile folder success!');
        });
    }


}

export default {
    Coding_Mkdir,
    getRandNumber(){
        return new Promise((resolve, reject)=>{
            require('crypto').randomBytes(8, function(ex, buf) {
                var token = buf.toString('hex');
                resolve(token);
            });
        });
    }



}

