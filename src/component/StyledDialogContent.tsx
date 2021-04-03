import {DialogContent, withStyles} from "@material-ui/core";

export const StyledDialogContent = withStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(1, 3),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(1, 4),
    },
  },
}))(DialogContent);
