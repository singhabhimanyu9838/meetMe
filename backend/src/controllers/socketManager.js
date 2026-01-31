import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

  

    socket.on("join-call", (path) => {

      if (!connections[path]) connections[path] = [];
      connections[path].push(socket.id);

      timeOnline[socket.id] = new Date();

     
      connections[path].forEach(id => {
        io.to(id).emit("user-joined", socket.id, connections[path]);
      });

      
      if (messages[path]) {
        messages[path].forEach(m => {
          io.to(socket.id).emit(
            "chat-message",
            m.data,
            m.sender,
            m.senderId
          );
        });
      }
    });

    socket.on("signal", (toId, data) => {
      io.to(toId).emit("signal", socket.id, data);
    });

   
    socket.on("chat-message", (data, sender) => {

      let roomKey = null;

      for (const key in connections) {
        if (connections[key].includes(socket.id)) {
          roomKey = key;
          break;
        }
      }

      if (!roomKey) return;

      if (!messages[roomKey]) messages[roomKey] = [];

      messages[roomKey].push({
        sender,
        data,
        senderId: socket.id
      });

      connections[roomKey].forEach(id => {
        io.to(id).emit("chat-message", data, sender, socket.id);
      });
    });

    
    socket.on("disconnect", () => {

      console.log("User left:", socket.id);

      for (const key in connections) {

        if (connections[key].includes(socket.id)) {

          connections[key].forEach(id => {
            io.to(id).emit("user-left", socket.id);
          });

          connections[key] = connections[key].filter(id => id !== socket.id);

          if (connections[key].length === 0) {
            delete connections[key];
            delete messages[key];
          }

          break;
        }
      }

      delete timeOnline[socket.id];
    });

  });

  return io;
};
