import React, { Suspense } from 'react';
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import './assets/scss/style.scss';
import App from './App';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import Loader from './layouts/loader/Loader';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Suspense fallback={<Loader />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>

  // document.getElementById("root")
);
