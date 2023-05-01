import useSWRInfinite from 'swr/infinite';
import { fCodeApi } from '@/api';

export const usePagination = <T>(url: string) => {
  const getKey = (pageIndex: number, previousPageData: T[]) => {
    if (previousPageData && !previousPageData.length) return null;
    return `${url}&page=${pageIndex + 1}`
  }

  const fetcher = async (url: string) => {
    const { data: { docs } } = await fCodeApi.get(url);
    return docs;
  }

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
