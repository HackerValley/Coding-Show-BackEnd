export default (op) => {
  let msg = '';
  if (!op.project_name) {
    msg = '请填写项目名称';
    return res.json({ status: 1, msg });
  }
  if (!op.description) {
    msg = '请填写项目概要';
    return res.json({ status: 1, msg });
  }
  if (!op.detail) {
    msg = '请填写项目要求';
    return res.json({ status: 1, msg });
  }
  if (!op.imagePath) {
    msg = '请上传图片';
    return res.json({ status: 1, msg });
  }
  if (!op.project_link) {
    msg = '请填写项目链接';
    return res.json({ status: 1, msg });
  }
}