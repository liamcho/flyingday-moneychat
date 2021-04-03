import React, { useMemo } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useResponsiveFontSize from "../useResponsiveFontSize";
import {CustomDialog} from "./CustomDialog";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    width: 240,
    height: 40,
    fontSize: 14,
    marginTop: '80px',
    backgroundColor: '#7b53ef',
    color: '#fff',
    padding: '8px 16px',
    '&:hover': {
      backgroundColor: '#9a80e5',
    },
  },
}))


const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const CardDialog = (props: Props) => {

  const classes = useStyles()

  const stripe = useStripe();
  const elements = useElements();

  const {isOpen, setOpen, setUpCard} = props

  const onClose = () => {
    setOpen(false);
  }

  const handleSave = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // const cardElement = elements.getElement(CardElement);
    //
    // const payload = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement
    // });
    // const payload = {};


    if (elements) setUpCard();
  };

  return (
    <CustomDialog open={isOpen} onClose={onClose}>
      <h3>
        Card details
      </h3>
      <form onSubmit={handleSave} style={{ width: '80%', margin: '48px 0'}}>
        <CardElement
          options={useOptions()}
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={event => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />
        <Button onClick={handleSave} color="primary" className={classes.button} disabled={!stripe}>
          Save Payment Method
        </Button>
        {/*<button type="submit" disabled={!stripe} style={{ marginTop: '32px'}}>*/}
        {/*  Pay*/}
        {/*</button>*/}
      </form>
    </CustomDialog>
  );
};

type Props = {
  isOpen: boolean,
  setOpen: any,
  setUpCard: any
}

export default CardDialog;
