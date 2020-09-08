const express = require('express');
const app = express();
const path = require('path');
var multer = require('multer');

// 引入生成随机字符串的工具函数
const randomString = require('./tools/randomString');

// 生成存储的模式对象
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/');
  },
  // 设置存储时的文件名
  filename: function (req, file, cb) {
    cb(null, randomString(5) + Date.now() + path.parse(file.originalname).ext);
  }
});

var upload = multer({
  storage: storage
});

// 设置允许跨域请求
app.use((req, res, next) => {
  // 设置是否运行客户端设置 withCredentials
  // 即在不同域名下发出的请求也可以携带 cookie
  res.header("Access-Control-Allow-Credentials", true);
  // 第二个参数表示允许跨域的域名，* 代表所有域名  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*'); // 允许的 http 请求的方法
  // 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 搭建一个静态资源服务器
app.use('/public', express.static(path.resolve(__dirname, "public")));

// Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Content-Type: application/json
app.use(express.json());

app.get('/', function (req, res) {
  res.send('hello world');
});

const baseUrl = 'http://192.168.0.105:9527/';

app.post('/api/upload', upload.single('avatar'), function (req, res, next) {
  if (req.file) {
    res.status(200);
    res.send({
      status: 200,
      msg: "success",
      url: baseUrl + 'public/img/' + req.file.filename
    });
  }
});

// 路由中间件
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/family", require("./routes/familyRoutes"));
app.use("/api/uassets", require("./routes/userAssetsRoutes"));
app.use("/api/fassets", require("./routes/familyAssetsRoutes"));

app.set('host', '192.168.0.105');

app.listen('9527', () => {
  console.log('server listening on port 9527');
});