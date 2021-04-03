import React from "react";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '8px 24px',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7b53ef',
    color: '#fff',
    width: '120px',
    padding: '8px 16px',
    '&:hover': {
      backgroundColor: '#9a80e5',
    },
  },
}))

const DonateButton = (props: Props) => {

  const {setIsOpen} = props

  const classes = useStyles()

  const handleDonation = async (event: any) => {
    // event.preventDefault()
    setIsOpen(true)
  }

  return (
    <div className={classes.root}>
      <Button onClick={handleDonation} color="primary" className={classes.button}>
        Donate
      </Button>
    </div>
    // <DonateDialog isOpen={} setOpen={} />
  );
};

type Props = {
  setIsOpen: any
}

export default DonateButton;
