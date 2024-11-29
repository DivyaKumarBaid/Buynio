"use client";
import FileUpload from "@/components/Test";

export default async function Home() {
  return (
    <div>
      {/* {JSON.stringify(user)} */}
      <FileUpload />
      <span className="material-symbols-outlined">home</span>
    </div>
  );
}
