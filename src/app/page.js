"use client"

import React from 'react';
import { Providers } from '../app/redux/Providers';
import {store} from '../app/redux/store';
import Login from '../app/auth/signin/page';

function App() {
  
  return (
    <>
      <Login />
    </>
  );
}

export default function Page() {
  return (
    <Providers store={store}>
      <App />
    </Providers>
  );
}