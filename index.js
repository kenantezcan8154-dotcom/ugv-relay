const net = require("net");
const WebSocket = require("ws");

const TCP_PORT = process.env.PORT || 3000;
const WS_PORT = 8080;

let espSocket = null;

/* ===== TCP SERVER (ESP32) ===== */
const tcpServer = net.createServer((socket) => {
  console.log("ESP32 bağlandı");
  espSocket = socket;

  socket.on("data", (data) => {
    console.log("ESP:", data.toString());
  });

  socket.on("end", () => {
    console.log("ESP32 ayrıldı");
    espSocket = null;
  });
});

tcpServer.listen(TCP_PORT, () => {
  console.log("TCP listening on", TCP_PORT);
});

/* ===== WEBSOCKET SERVER (WEB) ===== */
const wss = new WebSocket.Server({ port: WS_PORT });

wss.on("connection", (ws) => {
  console.log("Web client bağlandı");

  ws.on("message", (message) => {
    console.log("Web:", message.toString());

    if (espSocket) {
      espSocket.write(message.toString() + "\n");
    }
  });
});

console.log("WebSocket listening on", WS_PORT);
