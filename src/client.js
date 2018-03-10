"use strict"

// Import React Components
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// Import React-Router
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

// Import Redux Components
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Import reducer
import {eventReducer} from './reducers/eventReducer';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(eventReducer, middleware);

// Import Components
import Main from './main';
import EventList from './components/pages/eventList';

//Routing through React
const Routes = (
    <Provider store = {store}>
    <Router history = {hashHistory}>
        <Route path = "/" component = {Main}>
        <IndexRoute component = {EventList}/>
        </Route>
    </Router>
    </Provider>
)


render(
    Routes, document.getElementById('app')
)