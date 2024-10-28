import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Router } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import UserInfo, { loader } from './components/UserInfo';
import { LoginForm } from './components/LoginForm';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/users/:userId',
    element: <UserInfo />,
    loader: loader
  },
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path: '*',
    element: <App />
  }
]);
root.render(
  <React.StrictMode>
    <AppHeader title="Lottery" />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
