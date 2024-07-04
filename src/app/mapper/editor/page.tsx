"use client";
import Loader from "@/components/general/Loader";
import SavedCard from "@/components/mapper/pageComponents/SavedCard";
import { fetchSavedHops } from "@/lib/keys";
import { getSavedHops } from "@/service/hop";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { data: session } = useSession();
  const { error, data : savedHops, isLoading } = useQuery({
    queryKey: [fetchSavedHops],
    queryFn: () => getSavedHops(session),
  });

  console.log(savedHops);

  useEffect(() => {
    if (!isLoading && error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-[100vh] flex flex-col gap-4 p-4">
            <h2>Your Saved Hops</h2>
            {savedHops?.map((hops,index) => {
                const blueprint = JSON.parse(hops.blueprint);
                return(
                    <SavedCard name={hops.name} background={blueprint["GENERAL"]?.background} createdAt={hops.createdAt} updatedAt={hops.updatedAt} tag={"New"} key={hops.name + index} logo={"https://"} />
                )
            })}
        </div>
      )}
    </>
  );
};

export default Page;
