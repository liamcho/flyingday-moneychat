import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js/pure";
import {STRIPE_APP_ID} from "./const";

const stripePromise = loadStripe(STRIPE_APP_ID);

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);
