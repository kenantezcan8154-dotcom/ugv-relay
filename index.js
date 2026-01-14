const net = require("net");

const PORT = process.env.PORT || 3000;

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    console.log("Received:", data.toString());
    socket.write("ACK\n");
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log("UGV Relay listening on port", PORT);
});
