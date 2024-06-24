"use client";
import Topbar from "@/components/mapper/bars/Topbar";
import {
  SelectedElem,
  useMapperContext,
  View,
} from "@/components/mapper/hooks/selectedElemContext";
import socket from "@/utils/socket";
import { useEffect } from "react";

const Editor = ({ params }: { params: { id: string } }) => {
  const useMapper = useMapperContext();
  const roomId = params.id;

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("joinedRoom", (room: string) => {
      console.log(`Joined room: ${room}`);
    });

    socket.on("messageToClient", (data: string) => {
      console.log("Message from server:", data);
    });

    socket.on("elemSelectedToClient", (data: SelectedElem) => {
      useMapper?.setSelectedElement(data)
    });

    return () => {
      socket.off("joinedRoom");
      socket.off("messageToClient");
    };
  }, [roomId]);

  // const sendMessage = () => {
  //   socket.emit("messageToRoom", { room: roomId, message });
  // };

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] relative">
      <Topbar />
      <iframe
        src={`/mapper/simulator/${roomId}`}
        className="rounded-xl border-[#aaa9ad] border-4"
        style={{
          width: useMapper?.view === View.WEB ? "70vw" : "400px",
          height: useMapper?.view === View.WEB ? "744px" : "744px",
        }}
      ></iframe>
    </div>
  );
};

export default Editor;

// pages/mapper/editor.tsx
