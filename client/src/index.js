import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/style.scss';
import App from './App';
import Loader from './layouts/loader/Loader';

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <App />{' '}
  </Suspense>,
  document.getElementById('root')
);
