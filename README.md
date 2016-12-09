# server端说明

## 1. 开发任务

如果想参与项目，请在此 [issue](https://github.com/HackerValley/Coding-Show-BackEnd/issues/3) 上留言，并[@yiranguan](https://github.com/yiranguan)。  
当前[任务及分工](https://github.com/HackerValley/Coding-Show-BackEnd/wiki/task)文档。

## 2. 协作约定及代码规范

### 2.1 服务器环境

1. nodejs版本 [https://nodejs.org/en/](https://nodejs.org/en/)  6.9.x LTS;
2. 框架 express 4.14.0;
3. 数据库  mongodb 3.2.10; 
4. 数据操作类库 mongoose;
5. redis 3.2.100 [*windows下载*](https://github.com/MSOpenTech/redis/releases).

### 2.2 代码约定

1. JS使用ES2015(ES6);
2. 代码工具ESLint;
3. 规范：airbnb.

## 3. 实体定义

参见[实体定义](https://github.com/HackerValley/Coding-Show-BackEnd/wiki/schema)文档。

## 4. api接口文档

普通接口文档参见[*rap*](http://rap.taobao.org/workspace/myWorkspace.do?projectId=10767#81538)  
关于前端登录状态判断的文档参见[这里](https://github.com/HackerValley/Coding-Show-BackEnd/wiki/login_status)  
第三方登录流程参见[这里](https://github.com/HackerValley/Coding-Show-BackEnd/wiki/third_login)


## 5. 目录结构

### 5.1 后台脚手架Demo目录结构

```
README.md  
package.json
config.example.json 配置文件,项目使用前复制一份，然后重命名为config.json
.babelrc  //babel配置文件
.eslintrc //eslint配置文件
server
    │  index.js  //入口文件
    │  app.js  express构造文件
    │  config.js 全局配置信息
    ├─bin  
    │  └─www 服务启动文件
    │      
    ├─controllers  //业务逻辑处理
    │      comment_controller.js
    │      developer_controller.js
    │      project_controller.js
    │      user_controller.js
    │
    ├─handlers //数据处理,**这里面应该是导出对象，而不是导出类**
    │      comment_handlers.js
    │      developer_handlers.js
    │      project_handlers.js
    │      user_handlers.js
    │            
    ├─middle //中间件
    │      index.js      
    ├─models  //数据模型，**业务处理在handlers文件夹下的文件中编写**
    │      comment_model.js
    │      developer_model.js
    │      project_model.js
    │      user_model.js
    │
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
## 6. 运行调试

首先在项目目录下运行 `npm install` 安装所有依赖，推荐使用 webstorm2016来启动应用。

### 6.1 webstorm 运行调试配置

新建一个Node配置项，然后配置 `Node interprter` 为 ${project_dir}/node_modules/.bin/babel-node （${project_dir}为你的项目所在路径）, 配置 `Javascript file` 为 server/bin/www 。

### 6.2 webstorm 测试配置

本项目使用 [mocha](https://mochajs.org) 进行测试，所以在使用前先要保证 mocha 命令安装在全局中（即运行命令`npm install -g mocha`）。然后新建一个 mocha 配置项，`mocha package`设置为 mocha npm 安装后的路径位置，`Extra mocha option` 设置为 `--compilers js:babel-register`。

### 6.3 命令行运行

运行`npm start`，由于使用了 [nodemon](https://nodemon.io/)，需要全局安装 nodemon 和 babel-cli。

### 6.4 命令行测试

运行 `npm test`。

## 7. license

MIT