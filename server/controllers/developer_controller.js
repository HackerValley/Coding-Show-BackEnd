import developerHandlers from '../handlers/developer_handlers';

export default {
  joinProject(req, res) {
    const _body = req.body;
    const user = req.session.user;
    const pid = _body.pid;
    const  dev_skills = _body.dev_skills;
    // 已加入检测未完成
    developerHandlers.joinProject(user,pid,dev_skills,function(err) {
      if (err) {
        return res.send({status:1,msg:err});
      }
      res.send({status:0});
    });

  }
}
