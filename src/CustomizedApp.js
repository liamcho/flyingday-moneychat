import React, {useEffect, useState} from "react";
import {
  Channel as SBConversation,
  ChannelList as SBChannelList,
  ChannelSettings as SBChannelSettings,
  withSendBird
} from "sendbird-uikit";
import CardDialog from "./component/CardDialog";
import DonateButton from "./component/DonateButton";
import {makeStyles} from "@material-ui/styles";
import DonateDialog from "./component/DonateDialog";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {ACCESS_TOKEN, API_HOST, APP_ID as appId, USER_ID, WS_HOST} from "./const";
import SendBird from "sendbird";
import DonateMessage from "./component/DonationMessage";

const useStyles = makeStyles(theme => ({
}))

const sb = new SendBird({appId});
// const sb = SendBird.getInstance();

// Auth: https://stripe.com/docs/api/authentication?lang=node
// const stripe = require('stripe')(STRIPE_APP_ID);
// console.log('## stripe: ', stripe);

const CustomizedApp = (props) => {
  // props
  const {
    config: { userId },
    customizedMessage
  } = props;

  const elements = useElements();

  // useState
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [channelOperators, setChannelOperators] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [confirmedPaymentIntent, setConfirmedPaymentIntent] = useState(null);

  const stripe = useStripe();

  console.log('## channelOperators: ', channelOperators.length);

  useEffect(() => {
    sb.connect(USER_ID, ACCESS_TOKEN, API_HOST, WS_HOST,
      (user, error) => {
        console.log('## user: ', user);
        console.log('## error: ', error);
        if (error) return;
        sb.getPaymentMethodId(USER_ID, (res, err) => {
          if (err) return;
          // console.log('### payment_method_id: ', res.payment_method_id);
          // const paymentMethodId = res.payment_method_id;
          // console.log('### stripe.paymentMethods.retrieve(paymentMethodId): ', stripe.paymentMethods.retrieve(paymentMethodId));
          setPaymentMethodId(res.payment_method_id);
          // async function fetchMyAPI() {
          //   const confirmedPaymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
          //   console.log('### confirmedPaymentMethod: ', confirmedPaymentMethod);
          //
          //   // setPaymentMethod(confirmedPaymentMethod)
          //   // setCardInfo(confirmedPaymentMethod.card);
          // }
          //
          // fetchMyAPI();

          // stripe.paymentMethods.retrieve(paymentMethodId)
          //   .then((res, err) => {
          //     console.log('## res: ', res);
          //     console.log('## err: ', err);
          //
          //
          //     // const confirmedPaymentMethod = res.payment_method_id;
          //     // console.log('## confirmedPaymentMethod: ', confirmedPaymentMethod);
          //     // setPaymentMethod(confirmedPaymentMethod)
          //     // setCardInfo(confirmedPaymentMethod.card);
          //   });
        });
      }
    );
  }, []);

  const getCardElement = () => {
    return elements.getElement(CardElement)
  }

  const setUpPayment = (receiverId, amount, currency) => {
    setIsPending(true);
    processPayment(receiverId, amount, currency);
    // if (!paymentMethod) {
    //   stripe.createPaymentMethod({
    //     type: 'card',
    //     card: getCardElement(),
    //     billing_details: {
    //       name: cardInfo.name,
    //       email: cardInfo.email
    //     },
    //   }).then(function(result) {
    //     if (result.error) {
    //       // handle error
    //       setIsPending(false);
    //       return;
    //     }
    //     processPayment(result.paymentMethod, amount);
    //   });
    // } else {
    //   processPayment(paymentMethod, amount);
    // }
  }

  const setUpCard = () => {
    setIsPending(true);
    const card = getCardElement();
    console.log('## card: ', card);
    stripe.createPaymentMethod({
      type: 'card',
      card: card
    }).then(function(result) {
      if (result.error) {
        // handle error
        setIsPending(false);
        return;
      }
      console.log('## result: ', result);
      setPaymentMethodId(result.paymentMethod.id);
      // setCardInfo(card);
      setIsPending(false);
    });
  }

  const processPayment = (receiverId, amount, currency) => {
    console.log('## currentChannelUrl: ', currentChannelUrl);
    console.log('## receiverId: ', receiverId);
    console.log('## amount: ', amount);
    console.log('## currency: ', currency);
    console.log('## paymentMethodId: ', paymentMethodId);


    sb.putPaymentIntent(currentChannelUrl, receiverId, amount, currency, true, paymentMethodId)
      .then((res, err) => {
        setIsPending(false);
        if (err) return;
        setConfirmedPaymentIntent(res);
      });
  }

  const getOperators = (members) => {
    console.log('## members: ', members);
    const filtered = members.filter((member) => {
      // return member.userId;
      return (member.role === 'operator' && member.state === 'joined'); // && member.userId !== userId
    }).map((member) => member.userId);
    console.log('## filtered: ', filtered);

    return filtered;
  }


  return (
    <div className="customized-app">
      {
        paymentMethodId && paymentMethodId !== '' // when payment method is saved
          ? <DonateDialog isOpen={isOpen} setOpen={setIsOpen} channelOperators={channelOperators} setUpPayment={setUpPayment}/>
          : <CardDialog isOpen={isOpen} setOpen={setIsOpen} setUpCard={setUpCard}/>
      }
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <SBChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
                setChannelOperators(getOperators(channel.members))
              }
            }}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          {customizedMessage ? (
            <SBConversation
              channelUrl={currentChannelUrl}
              onChatHeaderActionClick={() => {
                setShowSettings(true);
              }}
              renderCustomMessage={(message, channel) => {
                if (message.customType === "payment") {
                  const paymentDetails = JSON.parse(message.message);
                  // const paymentType = paymentDetails['payment_type'];
                  const amount = paymentDetails['amount'];
                  return () => (
                    <DonateMessage userId={message._sender.userId} amount={amount}></DonateMessage>
                  );
                }
              }}
              renderChatHeader={({channel, user}) => <DonateButton setIsOpen={setIsOpen} />}
            />
          ) : (
            <SBConversation
              channelUrl={currentChannelUrl}
              onChatHeaderActionClick={() => {
                setShowSettings(true);
              }}
              renderChatHeader={({channel, user}) => <DonateButton setIsOpen={setIsOpen} />}
            />
          )}
        </div>
        {showSettings && (
          <div className="sendbird-app__settingspanel-wrap">
            <SBChannelSettings
              channelUrl={currentChannelUrl}
              onCloseClick={() => {
                setShowSettings(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default withSendBird(CustomizedApp);
