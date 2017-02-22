/**
 * Created by suhanyu on 17/1/18.
 */
import fileHandler  from '../handlers/file_handlers.js';
import path from 'path';

export default {

    doUpfile(req, res){
        var file = req.file;
        let mkdirObj = new fileHandler.Coding_Mkdir();
        mkdirObj.createFolder();
        let filePath = mkdirObj.getPathStr().webFullPath;
        filePath = filePath+path.basename(file.path);

        res.send({
            code: 200,
            data: {
                pic_src: filePath,
            }
        });
    },
    diskStorageConfig(){
        return {
            destination: function (req, file, cb) {
                let partPath = 'upload/';
                let mkdirObj = new fileHandler.Coding_Mkdir();
                mkdirObj.createFolder();
                let filePath = mkdirObj.getPathStr().realPath;
                cb(null, filePath);    // 保存的路径，备注：需要自己创建
            },
            filename: function (req, file, cb) {
                let fileExt = file.originalname.split('.')[1];
                // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
                fileHandler.getRandNumber().then((randString)=>{
                    cb(null, Date.now()+ randString + '.' + fileExt);
                });
            }
        };
    }

}


