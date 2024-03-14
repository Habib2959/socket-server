import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
var app = express();
var httpServer = createServer(app);
var corsOptions = {
    origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
var io = new Server(httpServer, {
    /* options */ cors: {
        origin: "http://localhost:5173",
    },
});
io.on("connection", function (socket) {
    socket.on("message", function (msg) {
        socket.broadcast.emit("received_message", msg);
    });
});
httpServer.listen(3000);
//# sourceMappingURL=index.js.map