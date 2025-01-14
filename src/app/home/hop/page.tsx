"use client";
import Loader from "@/components/general/Loader";
import SavedCard from "@/components/mapper/pageComponents/SavedCard";
import { fetchSavedHops } from "@/lib/keys";
import { getSavedHops } from "@/service/hop";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();
  const { data: savedHops, isLoading } = useQuery({
    queryKey: [fetchSavedHops],
    queryFn: () => getSavedHops(session),
    enabled: status != "loading" && !!session?.user?.refresh_token,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // useEffect(() => {
  //   if (!isLoading && error) {
  //     toast.error(error.message);
  //   }
  // }, [error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-[calc(96vh-2rem)] flex flex-col gap-4 p-4">
          <h2>Your Saved Hops</h2>
          {savedHops?.map((hops: any, index: number) => {
            const blueprint = JSON.parse(hops.blueprint);
            console.log(blueprint);
            return (
              <SavedCard
                name={hops.name}
                background={blueprint["GENERAL"]?.background}
                createdAt={hops.createdAt}
                updatedAt={hops.updatedAt}
                tag={"New"}
                key={hops.name + index}
                logo={blueprint["GENERAL"].logo}
                id={hops.id.toString()}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Page;
