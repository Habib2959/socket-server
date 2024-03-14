import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const corsOptions = {
	origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
const io = new Server(httpServer, {
	/* options */ cors: {
		origin: "http://localhost:5173",
	},
});

io.on("connection", (socket) => {
	socket.on("message", (msg) => {
		socket.broadcast.emit("received_message", msg);
	});
});

httpServer.listen(3000);
