const port = process.env.PORT
console.log("Port selected is: " + port)
const io = require('socket.io')(port)
var allClients = []
io.on('connection', socket => {
    console.log("active: "+allClients.length)
    allClients.push(socket)     
    console.log("new user: " + socket.id)
    io.emit('client-connected', `Connected (${allClients.length} online), send a message...`)
    
    socket.on('disconnect', () => {
        console.log("DISCONNECTED ----------------- "+socket.id)
        var i = allClients.indexOf(socket)
        allClients.splice(i, 1)
        io.emit('client-connected', `Connected (${allClients.length} online), send a message...`)
        console.log("active: "+allClients.length)
    })
    
    
    
    socket.on('send-client-message', msg => {
        console.log(msg)
        socket.broadcast.emit('broadcast', msg)
    })
    socket.on('client-ip', data=>console.log(data))
})

