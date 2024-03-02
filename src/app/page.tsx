// "use client";
import Test from "@/components/Test";
import FormButton from "@/components/general/FormButton";
import { getUserSession } from "@/lib/session";
import { signOut } from "next-auth/react";

export default async function Home() {
  const user = await getUserSession();

  return (
    <div>
      {JSON.stringify(user)}
      <Test/>
    </div>
  );
}
