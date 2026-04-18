import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            border: '1px solid #e8ecf1',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          },
        }}
      />
    </>
  </React.StrictMode>,
);
