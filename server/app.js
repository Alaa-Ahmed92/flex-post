const express = require('express');
const app = express();
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const convRoutes = require('./routes/chat/conversationRoutes');
const msgRoutes = require('./routes/chat/messageRoutes');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const socket = require('socket.io');

// DB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('DB Connected!'));

mongoose.connection.on('error', (err) => {
    console.log(`DB Connection error: ${err.message}`)
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', convRoutes);
app.use('/', msgRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});


const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`The server is running on port: ${port}`);
});

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

let users = [];

const addUser = (userId, socketId) => {
    return !users.some(user => user.userId === userId) && users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId);
}

io.on('connection', (socket) => {
    console.log('User Connected!');
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    // Send Message
    socket.on('sendMessage', ({ senderId, recevierId, text }) => {
        let user = getUser(recevierId);
        io.to(user?.socketId).emit('getMessage', {
            senderId,
            text
        });
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected!');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
});