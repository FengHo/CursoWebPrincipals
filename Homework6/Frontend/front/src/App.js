import React, {Fragment} from 'react';
import './App.css';
import Router from "./Components/Router";
import {Footer} from "./Components/Footer";

function App() {
  return (
      <Fragment>
          <Router></Router>
          <Footer></Footer>
      </Fragment>
  );
}

export default App;
