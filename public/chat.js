// 连接服务器
var socket = io.connect('http://localhost:4000');

// 获取节点
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// 事件监听
btn.addEventListener('click',() =>{
  socket.emit('chat',{
    message:message.value,
    handle:handle.value
  })
})

// 正在输入事件
message.addEventListener('keypress',()=>{
  socket.emit('typing', handle.value);
})

// 获取服务端发送的数据
socket.on('chat',(data) =>{
  feedback.innerHTML ='';
  output.innerHTML += `<p><strong>${data.handle}:${data.message}</strong></p>`
})

// 获取从服务器广播的数据
socket.on('typing',(data)=> {
  feedback.innerHTML = `<p><em>${data}正在输入...</em></p>`
})