const port = 1212
const io = require('socket.io')(port)
var allClients = []
io.on('connection', socket => {
    allClients.push(socket)     
    console.log("new user: " + socket.id)
    console.log("active: "+allClients.length)
    socket.emit('client-connected', `Connected (${allClients.length} online), send a message...`)

    socket.on('disconnect', () => {
        console.log("DISCONNECTED ----------------- "+socket.id)
        var i = allClients.indexOf(socket)
        allClients.splice(i, 1)
        console.log("active: "+allClients.length)
    })

    socket.on('send-client-message', msg => {
        console.log(msg)
        socket.broadcast.emit('broadcast', msg)
    })
})


