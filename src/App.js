import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import CategorySideBar from './components/CategorySideBar';

function App() {
  return (
    <BrowserRouter>
      <div>
        <CategorySideBar />
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
