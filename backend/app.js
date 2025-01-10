// import express from 'express';
// import ConnectDB from './config/db.js';
// import cookieParser from 'cookie-parser';
// import 'dotenv/config';
// import cors from 'cors';
// import authRoutes from './routes/auth.route.js';
// import testRoutes from './routes/test.route.js';
// import userRoutes from './routes/user.routs.js';
// import postRoutes from './routes/post.route.js';
// import chatRoutes from './routes/chat.route.js';
// import messageRoutes from './routes/message.route.js';

// const app = express();
// await ConnectDB();
// app.use(express.json());
// app.use(cookieParser());
// // Configure CORS options
// const corsOptions = {
//     origin: 'http://localhost:5173', // Allow only the frontend origin
//     credentials: true,               // Enable sending cookies with requests
// };

// app.use(cors(corsOptions)); // Apply CORS middleware with these options

// app.use('/auth', authRoutes);
// app.use("/test", testRoutes);
// app.use("/user", userRoutes);
// app.use("/post", postRoutes);
// app.use("/chat", chatRoutes);
// app.use("/message", messageRoutes);

// app.listen(5000, () => {
//     console.log("Server is running...");
// })

import express from 'express';
import http from 'http'; // Required to create an HTTP server
import { Server } from 'socket.io'; // Import Socket.IO
import ConnectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import testRoutes from './routes/test.route.js';
import userRoutes from './routes/user.routs.js';
import postRoutes from './routes/post.route.js';
import chatRoutes from './routes/chat.route.js';
import messageRoutes from './routes/message.route.js';
//import { saveMessage } from './controllers/messageController.js'; // Import message saving logic if needed

// Initialize the app and the HTTP server
const app = express();
const server = http.createServer(app); // Wrap the app with an HTTP server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Your frontend URL
        methods: ['GET', 'POST'], // Allowed HTTP methods
        credentials: true, // Allow credentials
    },
});

// Database connection
await ConnectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS options
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only the frontend origin
    credentials: true,               // Enable sending cookies with requests
};

app.use(cors(corsOptions)); // Apply CORS middleware with these options

// Routes
app.use('/auth', authRoutes);
app.use('/test', testRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/chat', chatRoutes);
app.use('/message', messageRoutes);

// Socket.IO logic
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a specific chat room
    socket.on('joinRoom', (chatId) => {
        socket.join(chatId);
        console.log(`User ${socket.id} joined chat room: ${chatId}`);
    });

    // Handle receiving and broadcasting a new message
    socket.on('newMessage', async ({ chatId, message }) => {
        try {
            // Save the message to the database (optional)
            const savedMessage = await saveMessage(chatId, message);

            // Broadcast the message to everyone in the chat room
            io.to(chatId).emit('messageReceived', savedMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
