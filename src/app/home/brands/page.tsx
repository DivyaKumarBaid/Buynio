"use client";
import { HorizontalDivider } from "@/components/general/Divider";
import Loader from "@/components/general/Loader";
import SavedCard from "@/components/mapper/pageComponents/SavedCard";
import { fragmentMono } from "@/lib/Fonts";
import { fetchPublishedHops } from "@/lib/keys";
import { getReleasedHops } from "@/service/hop";
import { JSONHeaders } from "@/types/mapper.types";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { data: savedHops, isLoading } = useQuery({
    queryKey: [fetchPublishedHops],
    queryFn: () => getReleasedHops(),
    enabled: true,
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
          <h2 className={`${fragmentMono.className} text-xl pb-0`}>Listed Brands</h2>
          <HorizontalDivider />
          <div className="flex gap-8">
            {savedHops?.map((hops: any, index: number) => {
              const blueprint = JSON.parse(hops.blueprint);
              return (
                <SavedCard
                  name={blueprint[JSONHeaders.GENERAL].brandName}
                  background={blueprint[JSONHeaders.GENERAL]?.background}
                  createdAt={hops.createdAt}
                  updatedAt={hops.updatedAt}
                  tag={"New"}
                  key={hops.name + index}
                  logo={blueprint[JSONHeaders.GENERAL].logo}
                  id={hops.id.toString()}
                  link={blueprint[JSONHeaders.GENERAL].link}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
