import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import axios from 'axios';
import { Card, Button } from "@material-ui/core";
import LocationDetails from "./LocationDetails";
import ProductDetails from "./ProductDetails";
import OrderSummary from "./OrderSummary";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actions from "../../store/actions/index";
import Spinner from "../UI/Spinner";
import { Auth } from "aws-amplify";
// /serviceorder/acceptance?orderId=""&providerId=""
import PaymentPromise from "./PaymentPromise";
import { API } from "aws-amplify";

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

function SimpleCard(props) {
  const classes = useStyles();
  //Handle Page Change
  const [activeStep, setactiveStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chosenProducts, setChosenProducts] = useState([null]);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [OrderId, setOrderId] = useState(0);

  function getStepContent(step, chosenProducts, setChosenProducts) {
    switch (step) {
      case 0:
        return <LocationDetails />;
      case 1:
        return (
          <ProductDetails
            chosenProducts={chosenProducts}
            setChosenProducts={setChosenProducts}
          />
        );
      case 2:
        return <PaymentPromise />;
      case 3:
        return <OrderSummary setEstimatedPrice={setEstimatedPrice} />;
      default:
        throw new Error("Unknown step");
    }
  }

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
    if (props.distanceRange.length == 0) {
      alert("Please Specify Distance Range");
      return;
    }
    setactiveStep(activeStep + 1);
  };
  const handleNext2Click = () => {
    setactiveStep(activeStep + 1);
  };
  const handleBackClick = () => {
    setactiveStep(activeStep - 1);
  };

  const emptyStringValidator = (string) => {
    if (string === "" || string == null) {
      return false;
    }
    return true;
  };

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

  const myValidator = (arr) => {
    var msg = "";
    arr.map((item) => {
      if (item === null) {
        msg = "Product details cannot be empty";
        return;
      }
      if (item.value.measurable === true && item.noOfUnits == 0) {
        msg = " Number of Units cannot be 0";
        return;
      }

      if (
        (item.value.measurable === true && item.value.height == null) ||
        (item.value.measurable === true && item.value.height == 0) ||
        (item.value.measurable === true && item.value.height == "")
      ) {
        msg = "Product Height cannot be empty";
        return;
      }
      if (
        (item.value.measurable === true && item.value.length == null) ||
        (item.value.measurable === true && item.value.length == 0) ||
        (item.value.measurable === true && item.value.length == "")
      ) {
        msg = "Product Length cannot be empty";
        return;
      }
      if (
        (item.value.measurable === true && item.value.width == null) ||
        (item.value.measurable === true && item.value.width == 0) ||
        (item.value.measurable === true && item.value.width == "")
      ) {
        msg = "Product width cannot be empty";
        return;
      }
      if (
        (item.value.measurable === true && item.value.weightPerUnit == null) ||
        (item.value.measurable === true && item.value.weightPerUnit == 0) ||
        (item.value.measurable === true && item.value.weightPerUnit == "")
      ) {
        msg = "WeightPerUnit cannot be empty";
        return;
      }
      if (
        (item.value.measurable === true && item.value.unit == null) ||
        (item.value.measurable === true && item.value.unit == "")
      ) {
        msg = "Measurement unit cannot be empty";
        return;
      }
      // if (
      //   (item.value.measurable == null || item.value.measurable == false) &&
      //   (item.value.density == 0 || item.value.density == null)
      // ) {
      //   msg = "Total Weight cannot be empty";
      //   return;
      // }
      if (
        (item.value.measurable == null || item.value.measurable == false) &&
        item.totalWeight == 0
      ) {
        msg = "Total Weight cannot be 0";
        return;
      }
      if (item.value.productType == null) {
        msg = "Product Type cannot be empty";
        return;
      }
      if (item.value.categories == null) {
        msg = "Product Category cannot be empty";
        return;
      }
    });

    return msg;
  };

  const handlePreOrderClick = () => {
    const msg = myValidator(chosenProducts);
    if (msg !== "") {
      alert(msg);
      return;
    }
    props.setGlobalChosenProducts(chosenProducts);
    setactiveStep(activeStep + 1);
  };
  // const handlePlaceOrderClick= async ()=>{
  //     setLoading(true);
  //     // const url='https://2n3n7swm8f.execute-api.ap-south-1.amazonaws.com/draft0/customerorder'
  //     var currentUser = await Auth.currentUserInfo()
  //     var currentUsername=currentUser.username
  //     var today = new Date()
  //     const data={
  //         customerOrders:[
  //             {
  //                 orderDate:today,
  //                 toAddress:props.destinationAddress,
  //                 fromAddress:props.pickupAddress,
  //                 toPin:props.destinationPin,
  //                 fromPin:props.pickupPin,
  //                 customerEmail:currentUsername,
  //                 noOfUnits:parseInt(props.noOfUnits),
  //                 weightPerUnit:parseFloat(props.weightPerUnit),
  //                 height:parseFloat(props.height),
  //                 width:parseFloat(props.width),
  //                 breadth:parseFloat(props.length),
  //                 unit:props.unit,
  //                 pickupdate:props.pickupDate,
  //                 deliveryDate:props.deliveryDate,
  //                 pickupSlot:props.pickupSlot,
  //                 additionalNote:props.additionalNote
  //             }]
  //     }

  //     // const customerEmail = "prashantkumarsingh9423@gmail.com"
  //     const payload = {
  //         body: data
  //     }
  //     // /serviceorder/acceptance?orderId=""&providerId=""
  //     API
  //     .post("GoFlexeOrderPlacement", `/customerorder`, payload)
  //     .then(response => {
  //         // Add your code here
  //         console.log(response);
  //         setLoading(false)
  //         setSuccess(true)
  //         props.onresetState();
  //     })
  //     .catch(error => {
  //         console.log(error.response);
  //         setLoading(false)
  //         setFailure(true)
  //     });

  // }

  const handlePlaceOrderClick = async () => {
    setLoading(true);
    var currentUser = await Auth.currentUserInfo();
    var owner = currentUser.username;
    var data;

    console.log(chosenProducts);
    //var newProductIds;
    /**Place New products in Inventory */
    var item = chosenProducts.slice();
    for (var i = 0; i < item.length; i++) {
      if (item[i].isNew === true) {
        data = {
          owner: owner,
          productName: item[i].value.productName,
          productType: item[i].value.productType,
          unit:
            item[i].value.measurable == true ? item[i].value.unit.value : "",
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
        productType: item[i].value.productType.value,
        unit: item[i].value.measurable == true ? item[i].value.unit.value : "",
        height: item[i].value.height,
        width: item[i].value.width,
        length: item[i].value.length,
        weightPerUnit: item[i].value.weightPerUnit,
        measurable: item[i].value.measurable,
        categories: item[i].value.categories.value,
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
          distanceRange: props.distanceRange,
        },
      ],
    };
    const payload = {
      body: data,
    };
    console.log(data);
    API.post("GoFlexeOrderPlacement", `/customerorder`, payload)
      .then((response) => {
        setOrderId(response[0].OrderId);

        // Add your code here
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
      {getStepContent(activeStep, chosenProducts, setChosenProducts)}
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
        {activeStep < 1 && (
          <Button variant="contained" color="primary" onClick={handleNextClick}>
            Proceed to Fill Product Details
          </Button>
        )}
        {/* Button for confirm page */}
        {activeStep === 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreOrderClick}
          >
            Next
          </Button>
        )}
        {activeStep === 2 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreOrderClick}
          >
            Order
          </Button>
        )}
        {/* Button for placing order */}
        {activeStep === 3 && (
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
    distanceRange: state.order.distanceRange,
    estimatedPrice: state.order.estimatedPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onresetState: () => dispatch(actions.resetState()),
    setGlobalChosenProducts: (chosenProducts) =>
      dispatch(actions.setChosenProducts(chosenProducts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleCard);
