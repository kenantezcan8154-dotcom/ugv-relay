const express = require("express");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.log("HTTP server ayakta:", PORT);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  console.log("✅ WebSocket client baglandi");

  ws.on("message", msg => {
    console.log("📩 Gelen:", msg.toString());
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.on("close", () => {
    console.log("❌ WebSocket client cikti");
  });
});
