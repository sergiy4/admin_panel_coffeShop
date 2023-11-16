import { usePagination, usePaginationArgs } from '../hooks/usePagination';
import PaginationButton from './PaginationButton';

interface PaginationProps extends usePaginationArgs {
  path: string;
}

const Pagination = ({
  currentPage,
  siblingCount = 1,
  totalPageCount,
  path,
}: PaginationProps) => {
  console.log('hesre');
  const paginationRange = usePagination({
    currentPage,
    siblingCount,
    totalPageCount,
  });

  console.log(paginationRange);
  if (!paginationRange) {
    return null;
  }
  if (currentPage === 0 && paginationRange?.length < 2) {
    return null;
  }

  return (
    <>
      <section>
        {paginationRange.map((page) => {
          if (typeof page === 'string') {
            return <div key={page}>...</div>;
          }

          return (
            <PaginationButton
              label={page}
              path={`${path}?page=${page}`}
              key={page}
            />
          );
        })}
      </section>
    </>
  );
};

export default Pagination;
