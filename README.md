# mongo-rest-api
mongodb rest 风格 api 接口



## 使用教程


### 配置文件说明


mongo   
  host     mongodb 主机名称  
  port     mongodb 端口号码  
  user     mongodb 用户名  
  password mongodb 用户密码  
  replicaSet mongodb 集群  
  auth     mongodb 权限组  
  
server  
  host     express 主机名称  
  port     express 端口号  
  ssl      express ssl配置  
  prefix   express 路由前缀
  

### 1、使用默认express
```
const {server, config} = require('mongo-restful-api');
config.init({mongo: _config.mongodb, server: {prefix: '/mongo'}});
server.init();
```
### 2、使用自定义express
```
const {server, config} = require('mongo-restful-api');
config.init({mongo: _config.mongodb, server: {prefix: '/mongo', client: app}});
server.init();
```
