import { useDeleteProductMutation } from '../productApi/productApi';
import getQueryErrorMessage from '../../../utils/getQueryErrorMessage';
const DeleteButton = ({ id }: { id: string }) => {
  let errorMessage;
  const [deleteProduct, { isError, error }] = useDeleteProductMutation();

  if (isError) {
    errorMessage = getQueryErrorMessage(error);
  }
  // TODO: add delete icon
  return (
    <>
      <button onClick={() => deleteProduct(id)}>DELETE</button>;
      {errorMessage ? <p>{errorMessage}</p> : null}
    </>
  );
};

export default DeleteButton;
