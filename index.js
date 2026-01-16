const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 🔹 public klasörünü yayınla
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Ana sayfa
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

wss.on("connection", (ws) => {
  console.log("✅ ESP32 veya Web Client bağlandı");

  ws.on("message", (message) => {
    console.log("📩 Gelen:", message.toString());

    // Herkese yayınla (ESP32 dahil)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("❌ Client ayrıldı");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
