import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const corsOptions = {
	origin: "*",
};
app.use(cors(corsOptions));
const io = new Server(httpServer, {
	/* options */ cors: {
		origin: "*",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

io.on("connection", (socket) => {
	socket.on("message", (msg) => {
		socket.broadcast.emit("received_message", msg);
	});
});

httpServer.listen(3000);

app.get("/", (_req, res) => {
	res.send("The server is running!");
});
