import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
var app = express();
var httpServer = createServer(app);
var corsOptions = {
    origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
var io = new Server(httpServer, {
    cors: {
        origin: corsOptions.origin,
        // allowedHeaders: ["my-custom-header"],
        // credentials: true,
    },
    // allowRequest: (req, callback) => {
    // 	const noOriginHeader = req.headers.origin === undefined;
    // 	callback(null, noOriginHeader); // only allow requests without 'origin' header
    // },
});
io.on("connection", function (socket) {
    // io.sockets.emit("this", { will: "hello" });
    // socket.on("message", (msg) => {
    // 	socket.broadcast.emit("received_message", msg);
    // });
});
httpServer.listen(3000);
app.get("/", function (_req, res) {
    res.status(200).json({ message: "Connected to server" });
});
app.post("/send", function (req, res) {
    var message = req.body.message;
    io.sockets.emit("test001", message);
    res.status(200).json({ message: "Message sent" });
});
//# sourceMappingURL=index.js.map