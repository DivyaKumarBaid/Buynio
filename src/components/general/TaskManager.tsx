"use client";
import React, { useState } from "react";

interface Task {
  id: number;
  description: string;
}

const DragDropComponent = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, description: "Task 1" },
    { id: 2, description: "Task 2" },
    { id: 3, description: "Task 3" },
  ]);

  const [activeIndex, setActiveIndex] = useState<{
    index: number;
    position: string;
  } | null>(null);

  const handleOnDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: number
  ) => {
    console.log(id, id.toString());
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleOnDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    e.preventDefault();
    setActiveIndex(null);
    const droppedId = e.dataTransfer.getData("text/plain");
    console.log(droppedId)

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

  const onDropLeave = () => setActiveIndex(null)

  return (
    <div className="w-[10vw] h-max bg-slate-200 flex flex-col">
      {tasks.map((task, index) => (
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
          <div className="p-2 bg-slate-500 border rounded-md m-2 cursor-pointer">
            {task.description}
          </div>
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

const Dropper: React.FC<DropperProps> = ({
  onDrop,
  onDragOver,
}) => {
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
