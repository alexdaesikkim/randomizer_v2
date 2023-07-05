import React from "react";
import { createRoot } from 'react-dom/client'
import App from "./App";

import { store } from './redux/store.js';
import { Provider } from 'react-redux';

import "./App.scss";

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)