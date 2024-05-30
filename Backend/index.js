// import express from 'express';
// import cors from 'cors';
// import session from 'express-session';
// import dotenv from 'dotenv';
// import db from './config/Database.js';

// import SequelizeStore from 'connect-session-sequelize';
// import FileUpload from 'express-fileupload';

// import UserRoute from './routes/UserRoute.js';
// import AuthRoute from './routes/AuthRoute.js';
// import socialMediaRoutes from './routes/socialMediaRoutes.js';

// const app = express();

// const sessionStore = SequelizeStore(session.Store);
// const store = new sessionStore({
//     db: db
// });

// /* (async() => {
//     await db.sync();
// })(); */

// dotenv.config();

// // Middleware
// app.use(session({
//     secret: process.env.SESS_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: {
//         secure: 'auto'
//     }
// }));

// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:5173'
// }));


// app.use(express.json());

// app.use(FileUpload());
// app.use(express.static("public"));

// app.use(UserRoute);
// app.use(AuthRoute);
// app.use(socialMediaRoutes);

// // store.sync();

// app.listen(process.env.APP_PORT, () => {
//     console.log('Server up and running...');
// });

//MY INDEX.JS WORKING FINE
// import express from 'express';
// import cors from 'cors';
// import session from 'express-session';
// import dotenv from 'dotenv';
// import db from './config/database.js';
// import SequelizeStore from 'connect-session-sequelize';
// import FileUpload from 'express-fileupload';
// import UserRoute from './routes/UserRoute.js';
// import AuthRoute from './routes/AuthRoute.js';
// import socialMediaRoutes from './routes/socialMediaRoutes.js';
// import kanbanRoutes from './routes/kanbanRoutes.js';
// import { Server } from "socket.io";
// import http from "http"; // Importing the 'http' module

// const app = express();
// const PORT = process.env.APP_PORT || 5000;

// dotenv.config();

// const sessionStore = SequelizeStore(session.Store);
// const store = new sessionStore({
//     db: db
// });

// app.use(session({
//     secret: process.env.SESS_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: store,
//     cookie: {
//         secure: 'auto'
//     }
// }));

// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:5173'
// }));

// app.use(express.json());

// app.use(FileUpload());
// app.use(express.static("public"));
// app.use(express.static("uploads"));

// app.use(UserRoute);
// app.use(AuthRoute);
// app.use(socialMediaRoutes);
// app.use(kanbanRoutes);

// // Create an HTTP server
// const httpServer = http.createServer(app);

// // Start the HTTP server
// httpServer.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// // Create a WebSocket server
// const io = new Server(httpServer);

// // Handle WebSocket connections
// io.on('connection', (socket) => {
//     console.log(`Socket connected: ${socket.id}`);

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log(`Socket disconnected: ${socket.id}`);
//     });
// });

// export { httpServer }; // Exporting the httpServer for use in other modules



import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/database.js';
import SequelizeStore from 'connect-session-sequelize';
import FileUpload from 'express-fileupload';
import UserRoute from './routes/UserRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import socialMediaRoutes from './routes/socialMediaRoutes.js';
import kanbanRoutes from './routes/kanbanRoutes.js';
import chatGroupRoutes from './routes/chatGroupRoute.js';
//import { Server } from "socket.io";
import http from "http";

const app = express();
const PORT = process.env.APP_PORT || 5000;

dotenv.config();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use(FileUpload());
app.use(express.static("public"));

app.use(express.static("uploads"));
// app.use(express.static("attachments"));

app.use(UserRoute);
app.use(AuthRoute);
app.use(socialMediaRoutes);
app.use(kanbanRoutes);
app.use(chatGroupRoutes);

// Create an HTTP server
const httpServer = http.createServer(app);

// Start the HTTP server
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// const io = new Server(server, {
//     pingTimeout: 60000,
//     cors: {
//       origin: 'http://localhost:5173',
//     },
//   });

// io.on('connection', (socket) => {
//     console.log('Connected to socket.io');

//     socket.on("setup", (userData) => {
//         socket.join(userData.id);
//         console.log("userrrrrr is",userData.id);
//         socket.emit("connected");
//   });

//   socket.on('join chat', (room) => {    //group_id
//     socket.join(room);
//     console.log('User Joined Group: ' + room);
//   });

//   socket.on('new message', (data) => {
//     console.log('ishita');
//     console.log("msg is",data);
    //var chat = newMessageReceived.group_id;

    //if (!chat.users) return console.log('chat.users not defined');

    // chat.users.forEach((user) => {
    //   if (user._id == newMessageReceived.sender._id) return;

     // socket.in(data.selectedGroupId).emit('message received', data.messageContent);
     //socket.emit('message received', data);
   // });
 // });

//});



// io.on("")

// Create a WebSocket server
// const io = new Server(httpServer);

// // Handle WebSocket connections
// io.on('connection', (socket) => {
//     console.log(`Socket connected: ${socket.id}`);

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log(`Socket disconnected: ${socket.id}`);
//     });
// });

//export { io }; // Exporting the httpServer for use in other modules