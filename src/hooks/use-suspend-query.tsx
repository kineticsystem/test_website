import { QueryKey, QueryObserverOptions, useQuery } from "@tanstack/react-query";

export default function useSuspendQuery<T>(
  queryFn: () => Promise<T>,
  cacheKeys: QueryKey,
  options?: QueryObserverOptions<T>
): T {
  const { data } = useQuery({
    queryKey: cacheKeys,
    queryFn: queryFn,
    enabled: true,
    refetchOnWindowFocus: false,
    // if we don't set a cache time, the default react query time is 5 minutes
    cacheTime: 300000,
    // We can set all queries to suspend at the top level in QueryClient params, or do it by individual query
    // since useSuspendQuery will be a reusable hook, we will set it here to prevent breakage in case of top level changes
    suspense: true,
    ...options
  });

  // we can cast as the generic type passed in since a suspend query will always either return data or be caught by an error boundary
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Types for react-query are wrong, see above; they should have a special-case non-undefined type when `suspense: true` but they do not.
  return data as T;
}
