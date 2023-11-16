import { useNavigate } from 'react-router-dom';

interface PaginationButtonProps {
  label: string | number;
  path: string;
}
const PaginationButton = ({ label, path }: PaginationButtonProps) => {
  const navigation = useNavigate();
  return <button onClick={() => navigation(path)}>{label}</button>;
};

export default PaginationButton;
