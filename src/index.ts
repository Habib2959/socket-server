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
app.use(express.json());

const io = new Server(httpServer, {
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

io.on("connection", (socket) => {
	// io.sockets.emit("this", { will: "hello" });
	// socket.on("message", (msg) => {
	// 	socket.broadcast.emit("received_message", msg);
	// });
});

httpServer.listen(3000);

app.get("/", (_req, res) => {
	res.status(200).json({ message: "Connected to server" });
});

app.post("/send", (req, res) => {
	const { message } = req.body;
	io.sockets.emit("test001", message);
	res.status(200).json({ message: "Message sent" });
});
