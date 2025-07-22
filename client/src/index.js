import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/style.scss';
import App from './App';
import Loader from './layouts/loader/Loader';

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <div
      style={{ margin: '2rem' }}
      className='d-flex justify-content-center flex-column align-items-center'
    >
      <App />{' '}
    </div>
  </Suspense>,
  document.getElementById('root')
);
