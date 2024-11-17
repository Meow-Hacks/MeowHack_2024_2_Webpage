import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'

import AuthPage from './pages/AuthPage/AuthPage';
import AdminPanelPage from './pages/AdminPanelPage/AdminPanelPage.tsx';
import NotFound from './components/NotFound/NotFound.tsx';
import TestPage from './pages/TestPage/TestPage.tsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <AuthPage />
        },
        {
          path: '/auth',
          element: <AuthPage />
        },
        {
          path: '/adminpanel',
          element: <AdminPanelPage />
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    },
    {
      path: '/test',
      element: <TestPage />
    }
  ]
)

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
