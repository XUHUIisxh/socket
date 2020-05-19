// 引入模块
var express = require('express');
var socket = require('socket.io');

// 实例化express对象
var app = express();

// 监听服务端口
let server = app.listen(4000,() =>{
  console.log('服务器正在监听4000端口！')
})

// 让服务器识别静态文件
app.use(express.static('public'));

// 设置io
let io = socket(server)

io.on('connection',(socket) =>{
  console.log('socket已连接！')

  // 获取从客户端发送的数据
  socket.on('chat',(data) =>{
    io.sockets.emit('chat',data)
  })

  socket.on('typing',(data) =>{
    socket.broadcast.emit('typing',data)
  })
})