#server端说明

###后端开发任务
- 后端协作约定及代码规范
- 模型设计 Model **Resolved**
- ~~路由设计controller~~ api接口设计 **In Progress**
- 后台脚手架Demo **In Progress**
- 功能模块 **Resolved**
 + 登录注册功能 
 + project部分
 + 留言板功能
 +后台页面（开发此页面请先联系@易燃询问用途）？
- 基础代码编写 **todo**

##后端协作约定及代码规范

###服务器环境
1. nodejs版本 [https://nodejs.org/en/](https://nodejs.org/en/)  6.9.1 LTS;
2. 框架 express 4.14.0;
3. 数据库  mongodb 3.2.10; 
4. 数据操作mongoose;
5. redis 3.2.100 [*windows下载*](https://github.com/MSOpenTech/redis/releases).

###代码约定
1. JS使用ES2015(ES6);
2. 代码工具ESLint;
3. 规范：airbnb.
##数据模型
###用户数据模型
```
user_model {
  _id: Schema.Types.ObjectId, //id
  username: String, //用户名
  nickname: String, //昵称  第三方登录时，存储第三方用户的昵称
  passwd: String, //密码
  level: Number, //用户等级
  telephone: String, //用户电话
  email: String, //用户邮箱
  skill: Array, //技能
  access_token: String, //第三方token
  expire_time: String, //token的失效时间
  sns_type: Number, //第三方用户类型 微信 qq。。。 
  avatar: String, //头像 
  create_time: Date, //创建时间
  last_login_time: Date //最后登录时间
}
```

###项目数据模型

```
project_model {
  _id: Schema.Types.ObjectId, //id
  uid: String, //上传的用户 id
  project_name: String, //项目名称
  description: String, //一句话描述
  detail: String, //简介
  imagePath: Array, //项目图片 字符串数组
  project_link: String, //链接
  developers: Array,//开发者
  star_count: { type: Number, default: 0 },//开发者人数
  star_count: Number, //点赞数
  star_users: Array, //点赞用户 存储用户id
  status: Number, //可用/禁用
  create_time: Date, //创建时间
  mod_time: Date //最后修改时间
}
```
###开发者数据模型
```
developer_model {
  _id: Schema.Types.ObjectId, //id
  uid: String, // 用户id
  pid: String, // 参与项目id
  dev_skills: Array, // 开发技术栈
  application_time: Date //申请时间
}
```
###留言板数据模型 
```
comment_model {
  _id: Schema.Types.ObjectId,
  user: { _id: Schema.Types.ObjectId, avator: String, nickname: String },
  pid: String, // 项目id
  content: String, // 评论内容
  comment_time: Date //评论时间
}
```
##api接口
[*rap*](http://http://rap.taobao.org/org/group.do?plid=6302)
目前版本0.0.0.26

##目录结构

###后台脚手架Demo目录结构
```
│  .babelrc  //babel配置文件
│  .eslintrc //eslint配置文件
│  index.js  //入口文件
│  package.json  
│  ReadMe.md  
│  server.js  
│  
├─bin  
│  └─www
├─config  //配置目录
│      config.example.json
│      config.json
│      mongo_config.js
│      redis_config.js
│      
├─controllers  //业务逻辑处理
│      comment_controllers.js
│      developer_controllers.js
│      project_controllers.js
│      user_controllers.js
│
├─handlers //数据处理
│      comment_handlers.js
│      developer_handlers.js
│      project_handlers.js
│      user_handlers.js
│            
├─middle //中间件
│      index.js      
├─models  //数据模型
│      comment_model.js
│      developer_model.js
│      project_model.js
│      user_model.js
││
├─public //静态资源
│    
├─routes  //路由目录
│      index.js
│      
├─test  //测试目录
│  └─mocha
└─views  //模板目录
        error.ejs
        index.ejs
        project.ejs
```

##分工
 + 登录注册功能  高阳 苏汉宇
 + project部分 临渊
 + 留言板功能 黄圣森
 + 后台页面（开发此页面请先联系@易燃询问用途）？
