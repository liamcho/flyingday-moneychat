import {createStyles, Dialog, Theme, withStyles} from "@material-ui/core";

export const CustomDialog = withStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      minHeight: 300,
      alignItems: 'center',
      width: '90%',
      padding: '24px 16px',
      margin: '16px',
      textAlign: 'center',
      backgroundColor: '#f6f9fc'
    },
  })
)(Dialog);
