const port = process.env.PORT;
console.log(`Port selected is: ${port}`);
const io = require('socket.io')(port);

io.on('connection', (socket) => {
  console.log(`Active: ${io.clients().server.eio.clientsCount}`);
  console.log(`New user: ${socket.id}, IP address: ${socket.handshake.address}`);
  io.emit(
    'client-connected',
    `Connected (${io.clients().server.eio.clientsCount} online), send a message...`
  );

  socket.on('disconnect', () => {
    console.log(`DISCONNECTED ----------------- ${socket.id}`);
    io.emit(
      'client-connected',
      `Connected (${io.clients().server.eio.clientsCount} online), send a message...`
    );
    console.log(`Active: ${io.clients().server.eio.clientsCount}`);
  });

  socket.on('send-client-message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('broadcast', msg);
  });

  socket.on('typing', (who) => {
    socket.broadcast.emit('someone-typing', who);
  });
});
