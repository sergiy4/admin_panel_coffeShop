import Router from './Router';
function App() {
  let thatSameOrigin = true;
  const Origin = localStorage.getItem('origin');

  if (Origin) {
    console.log('ge');
    thatSameOrigin = JSON.parse(Origin) === 'admin_panel_coffee_shop';
  }
  console.log(thatSameOrigin);
  return (
    <>
      <Router />
    </>
  );
}

export default App;
