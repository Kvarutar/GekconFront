import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reducer from "./reducers"
import App from "./containers/App";
import reportWebVitals from './reportWebVitals';
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

const store = configureStore({reducer});

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<HashRouter>
				<App />
			</HashRouter>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
