import React, { Suspense } from 'react';
// import ReactDOM from "react-dom";
import ReactDOM from 'react-dom';
import './assets/scss/style.scss';
import App from './App';
// import { BrowserRouter, HashRouter } from 'react-router-dom';
import Loader from './layouts/loader/Loader';

// root.render(
//   <Suspense fallback={<Loader />}>
//     {/* <BrowserRouter basename='/'> */}
//     <App />
//     {/* </BrowserRouter> */}
//   </Suspense>

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <App />{' '}
  </Suspense>,
  document.getElementById('root')
);
