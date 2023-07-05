import React from "react";
import { createRoot } from 'react-dom/client'
import Team from "./Team";

import { store } from './redux/store.js';
import { Provider } from 'react-redux';

import './Team.scss';

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Team/>
    </Provider>
)