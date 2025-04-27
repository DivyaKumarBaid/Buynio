import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

const useThrottleQuery = (
  key: string,
  serviceFunction: (
    query: Record<string, any>
  ) => Promise<Record<any, any> | undefined>,
  throttleDelay = 3000
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const searchQueryMutation = useMutation({
    mutationFn: (latestQuery: Record<string, any>) => serviceFunction(latestQuery),
  });

  const throttledMutate = (latestQuery: Record<string, any>) => {
    if (timeoutRef.current) return;
    searchQueryMutation.mutate(latestQuery);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
    }, throttleDelay);
  };

  return {
    ...searchQueryMutation,
    throttledMutate,
  };
};

export default useThrottleQuery;
