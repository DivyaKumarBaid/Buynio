"use client";
import Settingbar from "@/components/mapper/bars/Settingbar";
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
    sendMessage();
  },[useMapper?.webJson])

  useEffect(()=>{
    socket.emit("updateJsonToRoom", {room: roomId, message: useMapper?.webJson})
  },[useMapper?.webJson])

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("joinedRoom", (room: string) => {
      socket.emit("updateJsonToRoom", {room: roomId, message: useMapper?.webJson});
      if (useMapper?.setRoomId) useMapper.setRoomId(room);
    });

    socket.on("messageToClient", (data: string) => {
      console.log("Message from server:", data);
    });

    socket.on("elemSelectedToClient", (data: SelectedElem) => {
      useMapper?.setSelectedElement(data);
    });

    return () => {
      socket.off("joinedRoom");
      socket.off("messageToClient");
    };
  }, [roomId]);


  const sendMessage = () => {
    socket.emit("messageToRoom", { room: roomId, message: useMapper?.webJson });
  };

  return (
    <div className="flex justify-center items-center w-[100vw] min-h-[100vh]">
      <div className="flex w-full h-full justify-between">
        <div className="w-full h-[100vh] flex justify-center items-center relative">
          <Topbar />
          <iframe
            src={`/mapper/simulator/${roomId}`}
            className="rounded-xl border-[#aaa9ad] border-4 duration-300"
            style={{
              width: useMapper?.view === View.WEB ? "72vw" : "400px",
              height: useMapper?.view === View.WEB ? "744px" : "744px",
            }}
          />
        </div>
        <Settingbar />
      </div>
    </div>
  );
};

export default Editor;

// pages/mapper/editor.tsx
