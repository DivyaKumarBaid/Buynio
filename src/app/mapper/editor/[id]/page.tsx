"use client"
import socket from "@/utils/socket";
import { useEffect, useState } from "react";

const Editor = ({ params }: { params: { id: string } }) => {
  const [message, setMessage] = useState<string>("");
  const roomId = params.id; // This should be dynamic based on your logic

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("joinedRoom", (room: string) => {
      console.log(`Joined room: ${room}`);
    });

    socket.on("messageToClient", (data: string) => {
      console.log("Message from server:", data);
    });

    return () => {
      socket.off("joinedRoom");
      socket.off("messageToClient");
    };
  }, [roomId]);

  const sendMessage = () => {
    socket.emit("messageToRoom", { room: roomId, message });
  };

  return (
    <div className="flex justify-center items-center">
      <h1>Editor</h1>
      <iframe
        src={`/mapper/simulator/${roomId}`}
        className="w-[80vw] h-[80vh]"
      ></iframe>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="text-black"
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default Editor;

// pages/mapper/editor.tsx
