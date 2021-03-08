import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API, Auth } from "aws-amplify";
import { Card, Button } from "@material-ui/core";
import LocationDetails from "./LocationDetails";
import OrderSummary from "./OrderSummary";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actions from "../../store/actions/index";
import Spinner from "../UI/Spinner";
// /combinedView?orderId=
const useStyles = makeStyles((theme) => ({
  root: {
    // minWidth: 275,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    color: "white",
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
  paper: {
    position: "absolute",
    width: 900,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    marginTop: "1%",
  },
}));

function ForwardedCheckout(props) {
  const classes = useStyles();
  //Handle Page Change
  const [activeStep, setactiveStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
   const [OrderId, setOrderId] = useState(0);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <LocationDetails />;
      // case 1:
      //      return <ProductDetails/>
      // case 2:
      //      return <CustomerDetails/>
      case 1:
        return <OrderSummary setEstimatedPrice={setEstimatedPrice} />;
      default:
        throw new Error("Unknown step");
    }
  }
  const pinValidator = (pin) => {
    var greater = 999999,
      smaller = 100000;
    if (pin >= smaller && pin <= greater) {
      return true;
    }
    return false;
  };

  const dateValidator = (dates) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    dd = parseInt(dd, 10);
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    mm = parseInt(mm, 10);
    var yyyy = today.getFullYear();
    yyyy = parseInt(yyyy, 10);
    //console.log(pickupDate)
    var year = parseInt(dates.substring(0, 4), 10);
    var month = parseInt(dates.substring(5, 7), 10);
    var date = parseInt(dates.substring(8, 10), 10);
    //console.log(year+''+month+''+date)
    var invalid = 0;
    if (year < yyyy || year > 9999) {
      invalid = 1;
    }
    if (year === yyyy) {
      if (month < mm) {
        invalid = 1;
      } else {
        if (month === mm) {
          if (date < dd) {
            invalid = 1;
          }
        }
      }
    }
    if (invalid === 1) {
      return false;
    }
    return true;
  };
  const emptyStringValidator = (string) => {
    if (string === "" || string == null) {
      return false;
    }
    return true;
  };

  const handleNextClick = () => {
    if (emptyStringValidator(props.pickupPin) === false) {
      alert("Pickup Zip cannot be empty");

      return;
    }
    if (emptyStringValidator(props.destinationPin) === false) {
      alert("Destination Zip cannot be empty");

      return;
    }
    if (emptyStringValidator(props.pickupAddress) === false) {
      alert("Pickup Address cannot be empty");

      return;
    }
    if (emptyStringValidator(props.destinationAddress) === false) {
      alert("Destination Address cannot be empty");

      return;
    }

    if (pinValidator(props.pickupPin) === false) {
      alert("Please Enter Correct Pickup Pincode");

      return;
    }
    if (pinValidator(props.destinationPin) === false) {
      alert("Please Enter Correct Destination Pincode");

      return;
    }
    if (dateValidator(props.pickupDate) === false) {
      alert("Incorrect Pickup date");

      return;
    }
    if (dateValidator(props.deliveryDate) === false) {
      alert("Incorrect Delivery date");

      return;
    }
    setactiveStep(activeStep + 1);
  };
  const handleBackClick = () => {
    setactiveStep(activeStep - 1);
  };

  const handlePlaceOrderClick = async () => {
    setLoading(true);
    var currentUser = await Auth.currentUserInfo();
    var owner = currentUser.username;
    var data;

    //console.log(props.chosenProducts)
    //var newProductIds;
    /**Place New products in Inventory */
    var item = props.chosenProducts.slice();
    for (var i = 0; i < item.length; i++) {
      if (item[i].isNew === true) {
        data = {
          owner: owner,
          productName: item[i].value.productName,
          productType: item[i].value.productType,
          unit: item[i].value.unit,
          height: item[i].value.height,
          width: item[i].value.width,
          length: item[i].value.length,
          weightPerUnit: item[i].value.weightPerUnit,
          location: "-",
          categories: item[i].value.categories,
          measurable: item[i].value.measurable,
          density: item[i].value.density,
          pincode: "-",
        };

        const payload = {
          body: data,
        };
        API.post("GoFlexeOrderPlacement", `/inventory`, payload).catch(
          (error) => {
            console.log(error);
          }
        );
      }
    }

    var items = [];
    for (var i = 0; i < item.length; i++) {
      var temp = {
        productName: item[i].value.productName,
        productType: item[i].value.productType,
        unit: item[i].value.unit,
        height: item[i].value.height,
        width: item[i].value.width,
        length: item[i].value.length,
        weightPerUnit: item[i].value.weightPerUnit,
        measurable: item[i].value.measurable,
        categories: item[i].value.categories,
        density: item[i].value.density,
        noOfUnits: item[i].noOfUnits,
        totalWeight: item[i].totalWeight,
      };
      items.push(temp);
    }

    //var currentUser = await Auth.currentUserInfo()
    // console.log('checking user details: '+JSON.stringify(currentUser))
    //var currentUsername=currentUser.username

    var today = new Date();
    data = {
      customerOrders: [
        {
          orderDate: today,
          toAddress: props.destinationAddress,
          fromAddress: props.pickupAddress,
          toPin: props.destinationPin,
          fromPin: props.pickupPin,
          customerEmail: owner,
          pickupdate: props.pickupDate,
          deliveryDate: props.deliveryDate,
          pickupSlot: props.pickupSlot,
          additionalNote: props.additionalNote,
          items: items,
          estimatedPrice: estimatedPrice,
        },
      ],
    };
    const payload = {
      body: data,
    };
    API.post("GoFlexeOrderPlacement", `/customerorder`, payload)
      .then((response) => {
         setOrderId(response[0].OrderId);
        console.log(response);
        setLoading(false);
        setSuccess(true);
        props.onresetState();
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
        setFailure(true);
      });
  };

  let redirect = null;
  if (success === true) {
    redirect = <Redirect to={`/orderSuccess/${OrderId}`}></Redirect>;
  } else if (failure === true) {
    redirect = <Redirect to="/orderFailure"></Redirect>;
  }
  let content = (
    <Card className={classes.root}>
      {redirect}
      {getStepContent(activeStep)}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          margin: 20,
        }}
      >
        {activeStep !== 0 && (
          <Button
            variant="contained"
            color="default"
            onClick={handleBackClick}
            style={{ marginRight: "5px" }}
          >
            Back
          </Button>
        )}

        {/* Button for confirm page */}
        {activeStep === 0 && (
          <Button variant="contained" color="primary" onClick={handleNextClick}>
            Order
          </Button>
        )}
        {/* Button for placing order */}
        {activeStep === 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handlePlaceOrderClick}
          >
            Confirm Order
          </Button>
        )}
      </div>
    </Card>
  );

  if (loading === true) {
    content = (
      <div class="jumbotron text-center">
        <h1 class="display-4">Thank You!</h1>
        <p class="lead">
          <strong>For Placing Your Order</strong>{" "}
        </p>
        <Spinner />
      </div>
    );
  }
  return <div>{content}</div>;
}

const mapStateToProps = (state) => {
  return {
    name: state.order.name,
    pickupAddress: state.order.pickupAddress,
    pickupPin: state.order.pickupPin,
    destinationAddress: state.order.destinationAddress,
    destinationPin: state.order.destinationPin,
    height: state.order.height,
    width: state.order.width,
    length: state.order.length,
    noOfUnits: state.order.noOfUnits,
    weightPerUnit: state.order.weightPerUnit,
    unit: state.order.unit,
    phone: state.order.phone,
    email: state.order.email,
    companyName: state.order.companyName,
    pickupDate: state.order.pickupDate,
    deliveryDate: state.order.deliveryDate,
    pickupSlot: state.order.pickupSlot,
    additionalNote: state.order.additionalNote,
    chosenProducts: state.order.chosenProducts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onresetState: () => dispatch(actions.resetState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForwardedCheckout);
