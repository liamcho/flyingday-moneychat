import {DialogTitle, withStyles} from "@material-ui/core";

export const StyledDialogTitle = withStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2, 3),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2, 4),
    },
  },
}))(DialogTitle);
