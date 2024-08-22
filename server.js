const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Sirviendo el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Cuando un cliente se conecta
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Enviar una notificación cuando sea necesario
    socket.emit('notification', '¡Tienes una nueva notificación!');
    console.log('Notificación enviada al cliente.');

    // Cuando el usuario se desconecta
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
