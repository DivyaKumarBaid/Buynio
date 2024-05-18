// "use client";
import FileUpload from "@/components/Test";

export default async function Home() {
  // const user = await getUserSession();

  return (
    <div>
      {/* {JSON.stringify(user)} */}
      <FileUpload />
    </div>
  );
}
