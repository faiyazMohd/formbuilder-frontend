import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BuildForm from './pages/BuildForm';
import PreviewForm from './pages/PreviewForm';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <BuildForm />,
      },
      {
        path: "/preview",
        element: <PreviewForm />,
      },
    ],
  },
 
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={appRouter}/>
  // </React.StrictMode>
);

reportWebVitals();
