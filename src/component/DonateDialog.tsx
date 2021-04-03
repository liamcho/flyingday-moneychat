import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  DialogActions,
  InputAdornment,
  TextField,
  Divider, withStyles, Theme, createStyles, Dialog
} from '@material-ui/core'
import {StyledDialogTitle} from "./StyledDialogTitle";
import {StyledDialogContent} from "./StyledDialogContent";
import validate from "validate.js";
import {CardInfo} from "../type/type";

const useStyles = makeStyles(theme => ({
  button: {
    width: 220,
    height: 40,
    fontSize: 14,
    margin: '48px 0 16px',
    backgroundColor: '#7b53ef',
    color: '#fff',
    padding: '8px 16px',
    '&:hover': {
      backgroundColor: '#9a80e5',
    },
  },
  inputCont: {
    marginTop: '24px',
  },
  label: {
    paddingBottom: '8px',
    fontSize: '14px',
    opacity: 0.5,
    textTransform: 'uppercase'
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    marginTop: theme.spacing(4),
  },
  cardInfo: {
    marginTop: theme.spacing(2),
  }
}))

const schema = {
  addAmount: {
    presence: {allowEmpty: false, message: 'is required'},
    numericality: {
      greaterThan: 0
    }
  }
}

const CustomDialog = withStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minHeight: 240,
      alignItems: 'center',
      width: '500px',
      padding: '24px 16px',
      margin: '16px',
      textAlign: 'center',
      backgroundColor: '#f6f9fc'
    },
  })
)(Dialog);

const DonateDialog = (props: Props) => {

  const {isOpen, setOpen, setUpPayment, channelOperators} = props

  const classes = useStyles()

  const [dialogForm, setDialogForm] = useState({
    isValid: false,
    value: 0,
    touched: false,
    errors: []
  })

  useEffect(() => {
    const errors = validate({addAmount: dialogForm.value}, schema)

    setDialogForm(dialogForm => ({
      ...dialogForm,
      isValid: !errors,
      errors: errors || []
    }))
  }, [dialogForm.value])

  const onInputChange = (event: any) => {
    event.persist()

    const target = event.target as HTMLInputElement
    setDialogForm(dialogForm => ({
      ...dialogForm,
      value: target.valueAsNumber,
      touched: true
    }))
  }

  const onClose = () => {
    setOpen(false);
  }

  const onClick = () => {
    setUpPayment(channelOperators[0], dialogForm.value * 100, 'usd');
    onClose();
  }

  return (
    <CustomDialog open={isOpen} onClose={onClose}>
      <h3>
        Donate to chat operator
      </h3>

      <StyledDialogContent style={{ width: '60%'}}>
        <div className={classes.inputCont} style={{textAlign: 'left'}}>
          <div className={classes.label}>Amount</div>
          <TextField
            autoFocus
            size='small'
            type='number'
            name='addAmount'
            variant='outlined'
            value={dialogForm.value}
            onChange={onInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              inputProps: { min: 0}
            }}
            style={{ width: '100%' }}
          />
        </div>

        {/*<div className={classes.title}>*/}
        {/*  Payment Method*/}
        {/*</div>*/}

        {/*<div className={classes.cardInfo}>*/}
        {/*  <div>Payment Method:</div>*/}
        {/*  <div>{cardInfo.brand} card ending with {cardInfo.last4}</div>*/}
        {/*</div>*/}
      </StyledDialogContent>

      <Divider/>

      <DialogActions>
        <Button onClick={onClick} color="primary" className={classes.button} disabled={channelOperators.length === 0}>
          Confirm payment
        </Button>
      </DialogActions>
    </CustomDialog>
  )
};

type Props = {
  isOpen: boolean,
  setOpen: any,
  setUpPayment: any,
  channelOperators: string[]
}

export default DonateDialog;
