import { useGetProductsQuery } from './features/product/productApi/productApi';
import SignUp from './features/auth/pages/SignUp';
function App() {
  // const { data, isError, error, isSuccess } = useGetProductsQuery({});

  // if (isError) {
  //   console.log(error);
  // } else if (isSuccess) {
  //   console.log(data);
  // }
  return (
    <>
      <SignUp />
    </>
  );
}

export default App;
