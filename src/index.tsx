import React from 'react';
import ReactDOM from 'react-dom/client';
// 确保Tailwind基础样式在自定义样式之前加载
import './index.css';
// 自定义样式在Tailwind基础样式之后加载
import './styles/common.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
