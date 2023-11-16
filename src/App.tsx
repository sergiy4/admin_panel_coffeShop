import Router from './Router';
import useAuth from './hooks/useAuth';
import '../src/index.css';
function App() {
  useAuth();
  return (
    <>
      <Router />
    </>
  );
}

export default App;
