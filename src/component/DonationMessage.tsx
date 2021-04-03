import React from "react";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '8px 24px',
    borderRadius: '4px',
    color: '#fff',
    width: '100%',
    backgroundColor: '#7b53ef',
    '&:hover': {
      backgroundColor: '#9a80e5',
    },
  },
  title: {
    fontWeight: 500,
    fontSize: 16
  }
}))

const DonateMessage = (props: Props) => {

  const {userId, amount} = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      {userId} has just donated ${amount}!
    </div>
  );
};

type Props = {
  userId: string,
  amount: string
}

export default DonateMessage;
