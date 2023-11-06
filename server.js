const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Füge dies hinzu, um JSON-Anfragen zu verarbeiten

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('drawPixel', (data) => {
        // Broadcast die Zeichenaktion an alle anderen Benutzer
        socket.broadcast.emit('drawPixel', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/image/main-canvas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main-canvas.png'));
});

app.post('/save/main-canvas.png', (req, res) => {
    const base64Data = req.body.image.replace(/^data:image\/png;base64,/, '');

    fs.writeFile('public/main-canvas.png', base64Data, 'base64', (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
