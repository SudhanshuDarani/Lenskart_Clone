import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google'

// cartStore.subscribe(() => console.log(cartStore.getState()));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='1049388978627-d6e0j1r4l772rlaisehafvlu0uu0g1m.apps.googleusercontent.com'>
      <Provider store={store} >
        <BrowserRouter>
          <ChakraProvider>
            <App /> 
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
