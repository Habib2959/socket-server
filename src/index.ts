import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const corsOptions = {
	origin: ["http://localhost:5173", "https://socket-cllient.vercel.app"],
};
app.use(cors(corsOptions));
const io = new Server(httpServer, {
	/* options */ cors: {
		origin: ["http://localhost:5173", "https://socket-cllient.vercel.app"],
	},
});

io.engine.on("headers", (headers, req) => {
	headers["Access-Control-Allow-Origin"] = "https://socket-cllient.vercel.app";
	headers["Access-Control-Allow-Headers"] =
		"origin, x-requested-with, content-type";
	headers["Access-Control-Allow-Methodsn"] = "PUT, GET, POST, DELETE, OPTIONS";
});

io.on("connection", (socket) => {
	socket.on("message", (msg) => {
		socket.broadcast.emit("received_message", msg);
	});
});

httpServer.listen(3000);

app.get("/", (_req, res) => {
	res.status(200).json({ message: "Connected to server" });
});
