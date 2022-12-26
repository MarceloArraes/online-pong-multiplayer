function listen(io) {
// const pongNamespace = io.of('/pong')
let readyPlayerCount = 0;
  io.on("connection", (socket) => {
  let room = '';
  console.log("a user connected", socket.id);
  socket.on('ready', () => {
    room = 'romm'+ Math.floor(readyPlayerCount/2);
    socket.join(room)
    console.log('Player ready', socket.id);
    readyPlayerCount++;
    if (readyPlayerCount%2===0) {
      io.in(room).emit('startGame', socket.id)
    }
  })
  socket.on('paddleMove', (paddleData) => {
    socket.to(room).emit('paddleMove', paddleData);
  })
  socket.on('ballMove', (ballData) => {
    socket.to(room).emit('ballMove', ballData);
  });
  socket.on('disconnect', (reason) => {
    console.log(`Client ${socket.id} disconnected: ${reason}`);
    socket.leave(room)
    // readyPlayerCount--;
  })
});
}
module.exports = {
  listen,
}