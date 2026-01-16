const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

// 1️⃣ HTTP SERVER (Railway bunu istiyor)
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("UGV Relay is running\n");
});

// 2️⃣ WebSocket SERVER
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("🔌 Client connected");

  ws.on("message", (msg) => {
    console.log("📩 Received:", msg.toString());

    // broadcast (web → esp / esp → web)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});

// 3️⃣ SERVER BAŞLAT
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

