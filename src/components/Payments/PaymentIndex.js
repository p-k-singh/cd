import React, { useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Upload from "./Upload/Upload";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import Spinner from "../UI/Spinner";
import {
  Select,
  InputLabel,
  MenuItem,
  Grid,
  Card,
  FormHelperText,
  Divider,
  TextField,
  Button,
} from "@material-ui/core";
import ShowDetails from "./ShowDetails";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    //color: 'white',
    borderBottomStyle: "solid",
    borderWidth: "1px",
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 120,
  },
});

// {
//   "queryStringParameters": {
//     "orderId": "154"
//   },
//   "httpMethod": "POST",
//   "body": {
//     "invokeType": "external",
//     "orderId": "154",
//     "totalAmount": "1200",
//     "paymentOption": "partialPayment",
//     "paymentMode": "accountTransfer",
//     "paymentModeDetails": {
//       "referenceId": "idMe"
//     },
//     "paymentOptionDetails": {
//       "paymentRatio": 30
//     }
//   }
// }

const PaymentIndex = (props) => {
  const classes = useStyles();
  const [paymentOption, setPaymentOption] = useState("fullPayment");
  //const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentRatio, setPaymentRatio] = useState("50-50");
  const [paymentMode, setPaymentMode] = useState("accountTransfer");
  const [data, setData] = useState(null);
  const [referenceId, setReferenceId] = useState();
  const [nameOfPayer, setNameOfPayer] = useState();
  const [phoneOfPayer, setPhoneOfPayer] = useState();
  // const [fetchData,setFetchData] = useState(0);

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
    //alert(event.target.value);
  };
  const handleRatioChange = (event) => {
    setPaymentRatio(event.target.value);
  };
  const handlePaymentMode = (event) => {
    setPaymentMode(event.target.value);
    // alert(event.target.value)
  };

  /**Payment Submit functions */

  const handleAccountTransfer = () => {
    var paymentModeDetails;
    if (paymentOption === "fullPayment") {
      paymentModeDetails = {
        referenceId: referenceId,
      };
    } else if (paymentOption === "partialPayment") {
      paymentModeDetails = {
        referenceId: referenceId,
        paymentRatio: paymentRatio,
      };
    } else if (paymentOption === "CreditBased") {
      paymentModeDetails = {
        referenceId: referenceId,
        paymentDelay: paymentRatio,
      };
    } else if (paymentOption === "Subscription") {
      paymentModeDetails = {
        referenceId: referenceId,
        paymentCycle: paymentRatio,
      };
    }
    const toSendData = {
      paymentOption: paymentOption,
      paymentMode: paymentMode,
      orderId: props.orderId,
      paymentModeDetails: paymentModeDetails,
    };
    const payload = {
      body: toSendData,
    };
    API.post("GoFlexeOrderPlacement", `/customer-payments`, payload)
      .then((resp) => {
        console.log(resp);
        setData({
          paymentId: resp.new.paymentId,
          paymentMode: resp.new.paymentMode,
          paymentOption:
            resp.new.paymentOption === undefined
              ? null
              : resp.new.paymentOption,
          totalAmount: resp.new.totalAmount,
          paymentModeDetails: resp.new.paymentModeDetails,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleCashTransfer = () => {
    var paymentModeDetails = null;

    if (paymentOption === "fullPayment") {
      paymentModeDetails = {
        nameOfPayer: nameOfPayer,
        phoneOfPayer: phoneOfPayer,
      };
    } else if (paymentOption === "partialPayment") {
      paymentModeDetails = {
        paymentRatio: paymentRatio,
        nameOfPayer: nameOfPayer,
        phoneOfPayer: phoneOfPayer,
      };
    } else if (paymentOption === "CreditBased") {
      paymentModeDetails = {
        paymentDelay: paymentRatio,
        nameOfPayer: nameOfPayer,
        phoneOfPayer: phoneOfPayer,
      };
    } else if (paymentOption === "Subscription") {
      paymentModeDetails = {
        paymentCycle: paymentRatio,
        nameOfPayer: nameOfPayer,
        phoneOfPayer: phoneOfPayer,
      };
    }
    const toSendData = {
      paymentOption: paymentOption,
      paymentMode: paymentMode,
      orderId: props.orderId,
      paymentModeDetails: paymentModeDetails,
    };
    const payload = {
      body: toSendData,
    };
    API.post("GoFlexeOrderPlacement", `/customer-payments`, payload)
      .then((resp) => {
        console.log(resp);
        setData({
          paymentModeDetails: resp.new.paymentModeDetails,
          paymentId: resp.new.paymentId,
          paymentMode: resp.new.paymentMode,
          paymentOption:
            resp.new.paymentOption === undefined
              ? null
              : resp.new.paymentOption,
          totalAmount: resp.new.totalAmount,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  /** */

  useEffect(() => {
    //alert(props.orderId)
    if (props.orderId) {
      var param = `?orderId=${props.orderId}`;
      API.get("GoFlexeOrderPlacement", `/customer-payments` + param)
        .then((resp) => {
          console.log(resp);
          //console.log(resp.paymentId)
          setData({
            paymentId: resp.paymentId,
            paymentMode: resp.paymentMode,
            paymentOption:
              resp.paymentOption === undefined ? null : resp.paymentOption,
            totalAmount: resp.totalAmount,
            paymentModeDetails: resp.paymentModeDetails,
          });

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, []);

  //   /
  //   /
  //   /
  //   /
  //   /
  //   /
  //   /
  //  If Not Paid
  // /
  // /
  // /
  // /
  // /

  const fullPayToAccountDashboard = (
    <React.Fragment>
      <Card style={{ padding: 10 }}>
        <Typography style={{ fontSize: 20, marginBottom: 20 }}>
          Total Amount to be paid: {data !== null ? data.totalAmount : "x"} INR
        </Typography>
        {/* <HelpIcon /> */}
        <Typography style={{ fontSize: 18, marginBottom: 8 }}>
          Account Details -
        </Typography>
        <div className="row" style={{ fontSize: 16, marginBottom: 20 }}>
          <div className="col col-xs-12 col-sm-6" style={{ marginBottom: 6 }}>
            Account No: 7814289632
            <Tooltip
              title="Beneficiary’s account number, make the payment to this account."
              placement="top-start"
            >
              <InfoIcon style={{ color: "lightgrey" }} fontSize="small" />
            </Tooltip>
          </div>
          <div className="col col-xs-12 col-sm-8" style={{ paddingBottom: 10 }}>
            Account Holder's Name: GoFlexe Ltd.{" "}
            <Tooltip
              title="Beneficiary’s account name, make the payment to this account."
              placement="top-start"
            >
              <InfoIcon style={{ color: "lightgrey" }} fontSize="small" />
            </Tooltip>
          </div>

          <div className="col col-xs-12 col-sm-6">Bank Name: Yes Bank</div>
          <div className="col col-xs-12 col-sm-6">
            IFSC: BNK0123456{" "}
            <Tooltip
              title="IFSC is short for Indian Financial System Code, represented by an 11 digit character."
              placement="top-start"
            >
              <InfoIcon style={{ color: "lightgrey" }} fontSize="small" />
            </Tooltip>
          </div>
        </div>
        <div className="row">
          <div>
            <p
              style={{
                marginLeft: 20,
                marginRight: 8,
                marginTop: 8,
                fontSize: 18,
              }}
            >
              Reference Id:
            </p>
          </div>
          <div>
            <Tooltip title="Transaction Id for the payment you have done">
              <TextField
                variant="outlined"
                id="standard-size-small"
                size="small"
                value={referenceId}
                onChange={(event) => setReferenceId(event.target.value)}
              />
            </Tooltip>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: 20,
          }}
        >
          <Button
            className="AllButtons"
            variant="contained"
            // style={{backgroundColor:'#FF8C00'}}
            onClick={() => handleAccountTransfer()}
          >
            Submit
          </Button>
        </div>
        <Divider style={{ marginBottom: 20 }} />
        <p>
          Note:Please submit the amount in the following account and paste the
          Reference Id of the transaction in the textbox given above
        </p>
      </Card>
     
    </React.Fragment>
  );

  const cashPayment = (
    <React.Fragment>
      <Card style={{ padding: 10 }}>
        <Typography style={{ fontSize: 20, marginBottom: 20 }}>
          Total Amount to be paid: {data !== null ? data.totalAmount : "x"} INR
        </Typography>
        {/* <HelpIcon /> */}
        <Typography style={{ marginBottom: 10 }}>
          Please provide the name and contact details of the payer
        </Typography>
        <div className="row">
          <div>
            <p
              style={{
                marginLeft: 20,
                marginRight: 8,
                marginTop: 8,
                fontSize: 18,
              }}
            >
              Name:
            </p>
          </div>
          <div>
            <TextField
              variant="outlined"
              id="standard-size-small"
              size="small"
              value={nameOfPayer}
              onChange={(event) => setNameOfPayer(event.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div>
            <p
              style={{
                marginLeft: 20,
                marginRight: 8,
                marginTop: 8,
                fontSize: 18,
              }}
            >
              Phone:
            </p>
          </div>
          <div>
            <TextField
              type="number"
              variant="outlined"
              id="standard-size-small"
              size="small"
              value={phoneOfPayer}
              onChange={(event) => setPhoneOfPayer(event.target.value)}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            margin: 20,
          }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "#FF8C00" }}
            onClick={() => handleCashTransfer()}
          >
            Submit
          </Button>
        </div>

        <Divider style={{ marginBottom: 20 }} />
        <p>
          Note:Please hand over the cash to the delivery personnel at the time
          of delivery
        </p>
      </Card>
    </React.Fragment>
  );

  const OthersPayment = (
    <React.Fragment>
      <Card style={{ padding: 10 }}>
        <Typography style={{ fontSize: 20, marginBottom: 20 }}>
          Total Amount to be paid: {data !== null ? data.totalAmount : "x"} INR
        </Typography>
        {/* <HelpIcon /> */}
        <Upload
          setData={setData}
          orderId={props.orderId}
          paymentOption={paymentOption}
          paymentMode={paymentMode}
          paymentRatio={paymentRatio}
        />

        <Divider style={{ marginBottom: 20, marginTop: 20 }} />
        <p>
          Note:Please upload a picture / screenshot of payment via UPI or
          Cheque.
        </p>
      </Card>
    </React.Fragment>
  );

  const content = (
    <Card className={classes.root}>
      <CardContent style={{ padding: 0 }}>
        <Typography className={classes.title} gutterBottom>
          Payment
        </Typography>
        <form style={{ padding: 10 }}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              style={{ width: "auto" }}
              aria-label="position"
              name="position"
              onChange={(event) => handlePaymentOptionChange(event)}
              value={paymentOption}
            >
              <FormLabel component="legend">
                Selected payment Promise:
              </FormLabel>
              <Grid
                container
                spacing={0}
                style={{ padding: 20, paddingBottom: 30 }}
              >
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    value="ImmediatePayment"
                    control={<Radio color="primary" />}
                    label="Immediate Payment"
                  />
                  {paymentOption === "ImmediatePayment" && (
                    <FormHelperText>
                      For Immediate Payment, We will do negotitation on your
                      behalf to give you a discounted price.
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    value="30DaysCycle"
                    control={<Radio color="primary" />}
                    label="30 Days Cycle"
                  />
                  {paymentOption === "30DaysCycle" && (
                    <FormHelperText>Pay in 30 Days.</FormHelperText>
                  )}
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </form>
        <form style={{ padding: 10 }}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              style={{ width: "auto" }}
              aria-label="position"
              name="position"
              onChange={(event) => handlePaymentOptionChange(event)}
              value={paymentOption}
            >
              <FormLabel component="legend">
                Choose your payment option:
              </FormLabel>
              <Grid
                container
                spacing={0}
                style={{ padding: 20, paddingBottom: 30 }}
              >
                <Grid item xs={12} sm={3}>
                  <FormControlLabel
                    value="fullPayment"
                    control={<Radio color="primary" />}
                    label="Full Payment"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControlLabel
                    value="partialPayment"
                    control={<Radio color="primary" />}
                    label="Partial Payment"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControlLabel
                    value="CreditBased"
                    control={<Radio color="primary" />}
                    label="Credit Based"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControlLabel
                    value="Subscription"
                    control={<Radio color="primary" />}
                    label="Subscription"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {paymentOption === "fullPayment" && (
                    <FormHelperText>
                      Make the full payment of your order.
                      <br />
                      Choose the most suitable payment mode.
                    </FormHelperText>
                  )}
                  {paymentOption === "partialPayment" && (
                    <FormHelperText>
                      Make some of the payment now and the dues at time of
                      delivery.
                      <br />
                      Choose the most suitable payment method.
                    </FormHelperText>
                  )}
                  {paymentOption === "CreditBased" && (
                    <FormHelperText>
                      Make your payment after a few days.
                      <br />
                      Choose the most suitable payment method.
                    </FormHelperText>
                  )}
                  {paymentOption === "Subscription" && (
                    <FormHelperText>
                      Take a subscription plan and pay weekly or monthly.
                      <br />
                      Choose the most suitable payment method.
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>

          <Divider style={{ marginBottom: 20 }} />
          {paymentOption === "CreditBased" && (
            <FormControl
              style={{ marginLeft: 50 }}
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-label">
                Payment Delay
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paymentRatio}
                onChange={handleRatioChange}
                //   value={age}
                //   onChange={handleChange}
              >
                <MenuItem value="7 Days">7 Days</MenuItem>
                <MenuItem value="30 Days">30 Days</MenuItem>
                <MenuItem value="45 Days">45 Days</MenuItem>
              </Select>
              {paymentRatio === "45 Days" && (
                <FormHelperText>Pay the total amount in 45 Days</FormHelperText>
              )}
              {paymentRatio === "30 Days" && (
                <FormHelperText>Pay the total amount in 30 Days</FormHelperText>
              )}
              {paymentRatio === "7 Days" && (
                <FormHelperText>Pay the total amount in 7 Days</FormHelperText>
              )}
            </FormControl>
          )}
          {paymentOption === "Subscription" && (
            <FormControl
              style={{ marginLeft: 50 }}
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-label">
                Payment Cycle
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paymentRatio}
                onChange={handleRatioChange}
                //   value={age}
                //   onChange={handleChange}
              >
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
              </Select>
              {paymentRatio === "Monthly" && (
                <FormHelperText>Pay each Month</FormHelperText>
              )}
              {paymentRatio === "Weekly" && (
                <FormHelperText>Pay each Week</FormHelperText>
              )}
            </FormControl>
          )}
          {paymentOption === "partialPayment" && (
            <FormControl
              style={{ marginLeft: 50 }}
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-label">
                Payment Ratio
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paymentRatio}
                onChange={handleRatioChange}
                //   value={age}
                //   onChange={handleChange}
              >
                <MenuItem value="10%">10%</MenuItem>
                <MenuItem value="30%">30%</MenuItem>
                <MenuItem value="50%">50%</MenuItem>
              </Select>
              {paymentRatio === "50%" && (
                <FormHelperText>
                  Pay 50% now and 50%
                  <br /> at time of delivery
                </FormHelperText>
              )}
              {paymentRatio === "30%" && (
                <FormHelperText>
                  Pay 30% now and 70%
                  <br /> at time of delivery
                </FormHelperText>
              )}
              {paymentRatio === "10%" && (
                <FormHelperText>
                  Pay 10% now and 90%
                  <br /> at time of delivery
                </FormHelperText>
              )}
            </FormControl>
          )}
          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
          >
            <Grid item xs={12} sm={4}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Choose your payment mode
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={paymentMode}
                  onChange={handlePaymentMode}
                >
                  <Tooltip
                    title="Through electronic funds transfer, you can now transfer the required amount in our bank via RTGS/NEFT or net banking."
                    placement="left"
                  >
                    <FormControlLabel
                      value="accountTransfer"
                      control={<Radio color="primary" />}
                      label="Account Transfer"
                    />
                  </Tooltip>
                  <Tooltip
                    title="Pay in cash at the time of delivery."
                    placement="left"
                  >
                    <FormControlLabel
                      value="cash"
                      control={<Radio color="primary" />}
                      label="Cash"
                    />
                  </Tooltip>
                  <Tooltip
                    title="Make payment through your desired method (eg. UPI, cheque, etc.) and provide us with a proof of transaction. "
                    placement="left"
                  >
                    <FormControlLabel
                      value="Others"
                      control={<Radio color="primary" />}
                      label="Others"
                    />
                  </Tooltip>
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              {paymentMode === "accountTransfer" && fullPayToAccountDashboard}
              {paymentMode === "cash" && cashPayment}
              {paymentMode === "Others" && OthersPayment}
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: 20,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: 20,
        }}
      >
        <Link to="/" className="btn btn-primary">
          <Button
            className="AllButtons"
            variant="contained"
            // style={{backgroundColor:'#FF8C00'}}
            // onClick={() => handleAccountTransfer()}
          >
            Pay Later
          </Button>
        </Link>
      </div>
    </Card>
  );

  if (loading === true) {
    return <Spinner />;
  }
  if (data !== null && data.paymentOption !== null) {
    return <ShowDetails data={data} />;
  }
  return <div>{content}</div>;
};
export default PaymentIndex;
