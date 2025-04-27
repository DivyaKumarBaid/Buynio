"use client";
import Settingbar from "@/components/mapper/bars/Settingbar";
import Topbar from "@/components/mapper/bars/Topbar";
import {
  SelectedElem,
  useMapperContext,
  View,
} from "@/components/mapper/hooks/useEditor";
import socket from "@/utils/socket";
import { updateFuncProxy } from "@/utils/utility";
import { useEffect } from "react";

const Editor = ({ params }: { params: { id: string } }) => {
  const useMapper = useMapperContext();
  const roomId = params.id;

  // editor update functions
  const updateJson = (json: Record<string, any>) => {
    useMapper?.setWebJson?.(json);
    socket.emit("updateJsonToRoom", {
      room: roomId,
      message: json,
    });
  };

  const updateFunc = updateFuncProxy(useMapper?.webJson, updateJson, useMapper?.selectedElement)

  // editor update functions
  useEffect(() => {
    if (useMapper?.webJson) {
      socket.emit("updateJsonToRoom", {
        room: roomId,
        message: useMapper.webJson,
      });
    }
  }, [useMapper?.webJson, roomId]);

  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("joinedRoom", (room: string) => {
      if (useMapper?.setRoomId) useMapper.setRoomId(room);
      if (useMapper?.webJson) {
        socket.emit("updateJsonToRoom", {
          room: roomId,
          message: useMapper.webJson,
        });
      }
    });

    socket.on("messageToClient", (data: string) => {
      console.log("Message from server:", data);
    });

    socket.on("elemSelectedToClient", (data: SelectedElem) => {
      useMapper?.setSelectedElement(data);
    });

    socket.on("addSectionToClient", (data: SelectedElem) => {
      useMapper?.setWebJson?.(data);
    });

    return () => {
      socket.off("joinedRoom");
      socket.off("messageToClient");
      socket.off("elemSelectedToClient");
      socket.off("addSectionToClient");
    };
  }, [roomId, useMapper]);

  // bg-[url('/editorBg.png')] bg-contain
  return (
    <div className="flex justify-center items-center w-[100vw] max-h-[cal(100vh-2rem)] bg-[var(--background-color)] ">
      <div className="flex w-full h-full justify-between">
        <div className="w-full h-[100vh] flex justify-center items-center relative pt-16">
          <Topbar />
          <iframe
            src={`/hops/simulator/${roomId}`}
            className="rounded-2xl duration-300 shadow-[0px_0px_16px_rgba(0,0,0,0.4)] border-4 border-[var(--card-border-color)]"
            style={{
              width: useMapper?.view === View.WEB ? "72vw" : "400px",
              height: useMapper?.view === View.WEB ? "744px" : "744px",
            }}
          />
        </div>
        <Settingbar updateFunctions={updateFunc}/>
      </div>
    </div>
  );
};

export default Editor;
