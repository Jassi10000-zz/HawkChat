const fs = require('fs');
__dirname__= fs.realpathSync('.');

const express = require('express');

const path = require('path');

const app = express();

const http = require('http').createServer(app);



app.use(express.static(path.join(__dirname__, 'public')))

let users = [];

const io = require('socket.io')(http)
io.on('connection' , socket=>{
   console.log("Connection ready");

   socket.on('sending name' , name=>{

      if(users.length >= 2){
         console.log("Not allowed")
         return;
      }
      
      console.log(name)
      users.push(name);
      io.emit('sendNameToAll' , {name,users})
      
      console.log(users)
   }) 

   socket.on('sendMessage' , msg=>{
      socket.broadcast.emit('sendToAll' , msg)
   }) 
})



const PORT = 3000

// process.env is a J.S object

http.listen(PORT , () => {
   console.log("Server listening at port" + PORT); 
})
