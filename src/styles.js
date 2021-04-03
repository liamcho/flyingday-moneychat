import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  selected: {
    boxShadow: "none",
    textTransform: "none",
    color: "rgba(255, 255, 255, 0.88)",
    backgroundColor: "#7b53ef",
    "&:hover": {
      backgroundColor: "#7b53ef",
      boxShadow: "none"
    }
  },
  unselected: {
    textTransform: "none",
    color: "rgba(0, 0, 0, 0.5)",
    border: "solid 1px rgba(0, 0, 0, 0.38)",
    "&:hover": {
      color: "#7b53ef"
    }
  },
  rightButton: {
    borderLeftWidth: "0px !important"
  }
});

export default useStyles;
