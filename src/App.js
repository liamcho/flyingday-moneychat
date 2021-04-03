import React, {useState} from "react";
import { SendBirdProvider as SBProvider } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

import { ButtonGroup, Button } from "@material-ui/core";

import {APP_ID, USER_ID, NICKNAME, STRIPE_APP_ID} from "./const";
import CustomizedApp from "./CustomizedApp";
import "./index.css";
import useStyles from "./styles";
import {SendBirdAction} from "./SendBirdAction";


// export const sb = new SendBirdAction();
const sbAction =  new SendBirdAction();
export const sb = sbAction.Sendbird;

function App() {
  const classes = useStyles();
  const { selected, unselected, rightButton } = classes;
  const [customizedMessage, setCustomizedMessage] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // console.log('## isConnected: ', isConnected);
  //
  // useEffect(() => {
  //     sb.connect(USER_ID, ACCESS_TOKEN, (res, err) => {
  //       if (!err) return;
  //       console.log('## connected!');
  //       console.log('## hi!');
  //       setIsConnected(true);
  //     });
  //
  // }, [])

  return (
    // isConnected &&
    <div className="app-wrapper">
      <div className="channel-selector">
        <div className="channel-selector__icons">
          <ButtonGroup>
            <Button
              className={customizedMessage ? unselected : selected}
              onClick={() => setCustomizedMessage(false)}
              variant={customizedMessage ? "outlined" : "contained"}
              size="large"
            >
              Normal Messages
            </Button>
            <Button
              className={`${
                customizedMessage ? selected : unselected
              } ${rightButton}`}
              onClick={() => setCustomizedMessage(true)}
              variant={customizedMessage ? "contained" : "outlined"}
              size="large"
            >
              Customized Messages
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <SBProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
        <CustomizedApp customizedMessage={customizedMessage} />
      </SBProvider>
    </div>
  );
}

export default App;
