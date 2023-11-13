import Router from './Router';
import useAuth from './hooks/useAuth';
function App() {
  useAuth();
  return (
    <>
      <Router />
    </>
  );
}

export default App;
