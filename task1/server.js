// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from "public"
app.use(express.static("public"));

// Visitor count
let visitorCount = 0;

// When client connects
io.on("connection", (socket) => {
  visitorCount++;
  console.log("Client connected:", socket.id);
  console.log("Visitor Count:", visitorCount);

  // Receive student details from client
  socket.on("studentDetails", (student) => {
    console.log("Student Details Received:");
    console.log("Name:", student.name);
    console.log("Roll:", student.roll);
    console.log("Department:", student.department);
  });

  // Broadcast visitor count if odd
  if (visitorCount % 2 !== 0) {
    io.emit("visitorCount", visitorCount);
  }

  // Handle disconnect
  socket.on("disconnect", () => {
    visitorCount--;
    console.log("Client disconnected:", socket.id);
    console.log("Visitor Count:", visitorCount);
  });
});

// Start server
server.listen(5000, () => {
  console.log("Server running on http://localhost:4000");
});
