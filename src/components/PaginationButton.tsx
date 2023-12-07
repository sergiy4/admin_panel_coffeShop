interface PaginationButtonProps {
  page: number;
  setPage: (newState: string) => void;
}
const PaginationButton = ({ page, setPage }: PaginationButtonProps) => {
  const setCurrentPage = () => {
    setPage(page.toString(10));
  };

  return <button onClick={() => setCurrentPage()}>{page}</button>;
};

export default PaginationButton;
