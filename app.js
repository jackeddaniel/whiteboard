const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


// Serve static files from the "public" directory
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('draw', (data) => {
    // Broadcast the draw event to all other clients
    socket.broadcast.emit('draw', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

