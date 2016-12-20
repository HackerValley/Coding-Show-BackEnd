import developerHandlers from '../handlers/developer_handlers.js';

export default {
  joinProject(req, res) {
    const uid = '111'; // 测试
    //const uid = req.session.uid;
    const data = {
      uid,
      pid: req.body.p_id,
      dev_skills: req.body.dev_skills
    };
    // 已加入检测未完成
    ProjectHandlers.joinProject(data)
      .then(result => {
        res.json({ status: 0, msg: "已加入" });
      })
      .catch((err) => {
        res.json({ status: 1, msg: "出现未知错误" })
      })
  }
}
