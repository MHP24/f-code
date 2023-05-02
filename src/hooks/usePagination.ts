import useSWRInfinite from 'swr/infinite';
import { fCodeApi } from '@/api';

export const usePagination = <T>(url: string) => {
  const getKey = (pageIndex: number, previousPageData: T[]) => {
    return (
      previousPageData && !previousPageData.length ? null
        : `${url}&page=${pageIndex + 1}`
    );
  }

  const fetcher = async (url: string) => (await fCodeApi.get(url)).data.docs;

  const { data, size, setSize, error, mutate } = useSWRInfinite(getKey, fetcher);
  const paginatedData: T[] | undefined = data?.flat();
  const hasMore = data && !data.at(-1).length;
  const isLoading = data && typeof data[size - 1] === 'undefined';

  return {
    data: paginatedData,
    hasMore,
    isLoading,
    size,
    setSize,
    error,
    mutate
  };
}
