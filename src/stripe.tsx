import React, {useState} from "react";
import useStyles from "./styles";


function Stripe() {
  const classes = useStyles();
  const { selected, unselected, rightButton } = classes;
  const [customizedMessage, setCustomizedMessage] = useState(false);


  return (
    <div></div>
  );
}

export default Stripe;