import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const corsOptions = {
	origin: "https://socket-cllient.vercel.app/",
};
app.use(cors(corsOptions));
const io = new Server(httpServer, {
	/* options */ cors: {
		origin: "https://socket-cllient.vercel.app/",
	},
});

io.on("connection", (socket) => {
	socket.on("message", (msg) => {
		socket.broadcast.emit("received_message", msg);
	});
});

httpServer.listen(3000);
