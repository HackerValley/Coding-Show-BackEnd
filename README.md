# coding-show server端说明

[coding-show](http://www.coding-show.com) 旨在提供这样一个网站：发布富有创意的开源项目开发计划，组织编程爱好者，以各自喜欢的方法（技术栈）自由组队，并且给开发完成的开源项目提供一个自我展示的机会。

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

* 普通接口文档参见[*rap*](http://rap.taobao.org/workspace/myWorkspace.do?projectId=10767#81538)
* 关于前端登录状态判断的文档参见[这里](https://github.com/HackerValley/Coding-Show-BackEnd/wiki/login_status)
* 第三方登录流程参见[这里](https://github.com/HackerValley/Coding-Show-BackEnd/wiki/third_login)
* 文件上传接口 https://github.com/HackerValley/Coding-Show-BackEnd/wiki/project-uploadFile


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
    │  └─www.js 服务启动文件
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

第一次运行之前首先保证将目录下的config.example.json复制一份，然后改名为config.json,这个文件的格式如下：

```json
{
  "description" : "这个文件存放项目的配置信息，使用的时候需要复制出来一份，然后改名为config.json",
  "port" : "http服务启动的端口号",
  "errorLogFile" : "错误日志存放路径",
  "mongoConfig" : {
    "option" : {},
    "url" : "mongodb连接字符串"
  },
  "redisConfig" : {
    "url" :"redis连接字符串"
  },
  "oauth2ConfigDesc":"配置信息参见：https://trello.com/c/qa044n9z/14--",
  "oauth2Config" : {
    "github" : {
      "clientId" : "",
      "clientSecret" : ""
    }
  }
}
```

然后在项目目录下运行 `npm install` 安装所有依赖，由于第三方网站登录回调需要回调到www.coding-show.com这个域名上，所以需要做一个反向代理，具体配置参见[这里](https://github.com/HackerValley/Coding-Show-BackEnd/wiki/server_config)。

### 6.1 webstorm 运行调试配置

新建一个Node配置项，然后配置 `Node interprter` 为 ${project_dir}/node_modules/.bin/babel-node （${project_dir}为你的项目所在路径）, 配置 `Javascript file` 为 server/bin/www.js 。

### 6.2 webstorm 测试配置

本项目使用 [mocha](https://mochajs.org) 进行测试，所以在使用前先要保证 mocha 命令安装在全局中（即运行命令`npm install -g mocha`）。然后新建一个 mocha 配置项，`mocha package`设置为 mocha npm 安装后的路径位置，`Extra mocha option` 设置为 `--compilers js:babel-register`。

### 6.3 命令行运行

运行`npm start`，需要全局安装 [pm2](http://pm2.keymetrics.io/) 和 babel-cli, 并且在 `process.json` 中配置 `"exec_interpreter" : "babel-node"`。如果配置`"watch" : true`，则文件更新后会自动重启，windows环境慎用。下面是示例：

```json
{
  "apps" : [{
    "name"        : "coding-show-backend",
    "script"      : "./server/bin/www",
    "instances"   : 1,
    "exec_interpreter" : "babel-node"
    "watch"       : true,
    "error_file"  : "/var/log/pm2/coding-show-backend/error.log",
    "out_file"    : "/var/log/pm2/coding-show-backend/out.log",
    "env": {
      "NODE_ENV": "development"
    },
    "env_production" : {
      "NODE_ENV": "production"
    }
  }]
}
```

### 6.4 命令行测试

运行 `npm test`。

## 7. 部署


项目使用 [pm2](http://pm2.keymetrics.io/) 来实现生产环境的进程管理工具。在继续下面操作之前需要保证你在全局中安装了 pm2 包。第一次运行前，需要复制 `process.example.json` 一份，然后重命名为 `process.json`。分别指定 `process.json` 中的属性 `error_file` 和 `out_file` 为错误日志输出路径和普通日志输出日志。最后运行命令 `make`，即可完成项目启动。

鉴于直接使用 babel 会导致内存泄漏等问题，在 `make` 时会先编译成es5，然后再运行。同时将 `watch` 参数设置为false，以提高性能。最终生产环境的启动文件为：

```json
{
  "apps" : [{
    "name"        : "coding-show-backend",
    "script"      : "./dist/bin/www.js",
    "instances"   : 1,
    "watch"       : false,
    "error_file"  : "/var/log/pm2/coding-show-backend/error.log",
    "out_file"    : "/var/log/pm2/coding-show-backend/out.log",
    "env": {
      "NODE_ENV": "development"
    },
    "env_production" : {
      "NODE_ENV": "production"
    }
  }]
}
```
**注意，除非操作nginx redis mongo，不要使用root来部署更新项目代码!**

## 8. license

[MIT](https://github.com/HackerValley/Coding-Show-BackEnd/blob/develop/LICENSE)