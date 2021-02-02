import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import orderReducer from './store/reducers/orderReducer';
import loginReducer from './store/reducers/loginReducer';
import { Amplify } from 'aws-amplify';
import config from './config';


const composeEnhancers =(process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null )|| compose;
const store=createStore(
 combineReducers({
   order:orderReducer,
   login:loginReducer}),composeEnhancers(applyMiddleware(thunk)));

   Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID,
      oauth: {
        domain: 'goflexeapp.auth.ap-south-1.amazoncognito.com',
        scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: "http://localhost:3000",
        redirectSignOut: "http://localhost:3000",
        responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
    },
    API: {
      endpoints: [
        {
          name: "GoFlexeOrderPlacement",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION
        },
      ]
    },
  
  });

ReactDOM.render(
  <React.StrictMode>
    
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
