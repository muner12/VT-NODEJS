const {Server}=require('socket.io')


const socketServer=(server)=>{

    const io=new Server(server)

    io.on('connection',(socket)=>{

        console.log('a user connected');
    })
}


module.exports=socketServer