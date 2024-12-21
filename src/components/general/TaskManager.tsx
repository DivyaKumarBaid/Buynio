"use client";
import React, { useState } from "react";
import { ManagerList } from "../mapper/types";
import { GrDrag } from "react-icons/gr";
import { AiTwotoneDelete } from "react-icons/ai";

const DragDropComponent = ({
  taskList,
  updateFunction,
}: {
  taskList: ManagerList[];
  updateFunction: (list: ManagerList[]) => void;
}) => {
  const [tasks, setTasks] = useState<ManagerList[]>(taskList || []);

  const [activeIndex, setActiveIndex] = useState<{
    index: number;
    position: string;
  } | null>(null);

  const handleOnDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: number
  ) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleOnDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    e.preventDefault();
    setActiveIndex(null);
    const droppedId = e.dataTransfer.getData("text/plain");

    if (droppedId) {
      const draggedTaskIndex = tasks.findIndex(
        (task) => task.id === parseInt(droppedId)
      );
      const draggedTask = tasks[draggedTaskIndex];

      // Remove dragged task
      const remainingTasks = tasks.filter((task) => task.id !== draggedTask.id);

      // Insert dragged task at drop position
      remainingTasks.splice(dropIndex, 0, draggedTask);

      setTasks(remainingTasks);
      updateFunction(remainingTasks);
    }
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
    position: string
  ) => {
    setActiveIndex({ index, position });
    e.preventDefault();
  };

  const onDropLeave = () => setActiveIndex(null);

  return (
    <div className="w-full h-max rounded-xl flex flex-col my-2">
      {tasks.map((task, index) => (
        <div className="px-2 flex justify-between items-center border rounded-lg m-2" key={task.id}>
          <div
            className={`${activeIndex?.index === index && (activeIndex.position === "top" ? "pt-2" : "pb-2")} relative duration-200 cursor-pointer`}
            key={task.id}
            draggable={true}
            onDragStart={(e) => handleOnDragStart(e, task.id)}
            onDragLeave={onDropLeave}
          >
            <Dropper
              onDrop={(e) => handleOnDrop(e, index)}
              onDragOver={(e, position) => handleDragOver(e, index, position)}
              parentIndex={index}
            />
            <div className="flex p-2 items-center gap-8">
              <GrDrag />
              {task.description}
            </div>
          </div>
          <AiTwotoneDelete
            className="text-xl cursor-pointer"
            onClick={() => {
              const newTask = tasks.filter((_, i) => i != index);
              setTasks(newTask);
              updateFunction(newTask);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DragDropComponent;

interface DropperProps {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, position: string) => void;
  parentIndex: number;
}

const Dropper: React.FC<DropperProps> = ({ onDrop, onDragOver }) => {
  const [_, setActive] = useState(false);

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    position: string
  ) => {
    e.preventDefault();
    setActive(true);
    if (onDragOver) {
      onDragOver(e, position);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
  };

  return (
    <React.Fragment>
      <div
        className="h-1/2 bg-[blue] absolute top-0 w-full opacity-0"
        onDragOver={(e) => handleDragOver(e, "top")}
        onDrop={onDrop}
        onDragLeave={handleDragLeave}
      />
      <div
        className="h-1/2 bg-[red] absolute bottom-0 w-full opacity-0"
        onDragOver={(e) => handleDragOver(e, "bottom")}
        onDrop={onDrop}
        onDragLeave={handleDragLeave}
      />
    </React.Fragment>
  );
};
