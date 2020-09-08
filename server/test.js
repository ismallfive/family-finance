const path = require('path');
var multer = require('multer');

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

app.listen('9527', () => {
  console.log('server listening on port 9527');
});