const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// create express app, apply middlewares.
const app = express();
app.use(cors);

// create http server
const httpServer = http.createServer(app);

// create socket instance
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
});

//listen to events
io.on('connection', (socket) => {
    console.log(`User connected --> ${socket.id}`);
    socket.on('send_message', (data) => {
        socket.broadcast.emit('recieve_message', data);
    })
})

const PORT = 3001;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
