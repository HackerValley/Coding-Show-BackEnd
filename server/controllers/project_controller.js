import projectHandlers from '../handlers/project_handlers.js';
// 登录校验
//import { checkLogin } from '../middleware';
import slogger from 'node-slogger';

export default  {
    doAdd(req, res) {
        slogger.error('代码还没有实现');
        res.send('not supported');
    },
    addNew(req, res) {
        res.send('n supported');
    }

}
