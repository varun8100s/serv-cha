const port = process.env.PORT
console.log("Port selected is: " + port)
const io = require('socket.io')(port)

io.on('connection', socket => {
    console.log("active: "+io.clients().server.eio.clientsCount)
         
    console.log("new user: " + socket.id,"ip address:",socket.handshake)
    io.emit('client-connected', `Connected (${io.clients().server.eio.clientsCount} online), send a message...`)
    
    socket.on('disconnect', () => {
        console.log("DISCONNECTED ----------------- "+socket.id)
        
        io.emit('client-connected', `Connected (${io.clients().server.eio.clientsCount} online), send a message...`)
        console.log("active: "+io.clients().server.eio.clientsCount)
    })
    
    
    
    socket.on('send-client-message', msg => {
        console.log(msg)
        socket.broadcast.emit('broadcast', msg)
    })
    
    socket.on('typing', who => {
        socket.broadcast.emit('someone-typing',who)
    })
    
    
})

