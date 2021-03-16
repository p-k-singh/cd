import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import constants from "../../Constants/constants";
import { API } from "aws-amplify";
import EditIcon from "@material-ui/icons/Edit";
import PaymentIndex from "../Payments/PaymentIndex";
import { Auth } from "aws-amplify";
import { Card, TextField, Button, Grid } from "@material-ui/core";
import Spinner from "../UI/Spinner";
const useStyles = makeStyles({
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
  formControl: {
    marginTop: "1%",
  },
});

const OrderSummary = (props) => {
  const classes = useStyles();
  const [editName, setEditName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [editContact, setEditContact] = useState(false);
  const [newContact, setNewContact] = useState("");
  const [editCompany, setEditCompany] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [estimatedMoney, setEstimatedMoney] = useState(-1);

  useEffect(() => {
    // var params =`height=${props.height}&width=${props.width}&length=${props.length}&toPin=${props.destinationPin}&fromPin=${props.pickupPin}&measureable=true`
    setLoading(true);
    var items = [];

    for (var i = 0; i < props.chosenProducts.length; i++) {
      //var temp=''
      items.push({
        toPin: props.pickupPin,
        fromPin: props.destinationPin,
        productName: props.chosenProducts[i].value.productName,
        productType: props.chosenProducts[i].value.productType.value,
        length: props.chosenProducts[i].value.length,
        width: props.chosenProducts[i].value.width,
        height: props.chosenProducts[i].value.height,
        weightPerUnit: props.chosenProducts[i].value.weightPerUnit,
        noOfUnits: props.chosenProducts[i].noOfUnits,
        Unit:
          props.chosenProducts[i].value.measurable == true
            ? props.chosenProducts[i].value.unit.value
            : "",
        measurable: props.chosenProducts[i].value.measurable,
        density: props.chosenProducts[i].value.density,
        totalWeight: props.chosenProducts[i].totalWeight,
        distanceRange: props.distanceRange.value,
      });
    }
    var params = JSON.stringify(items);
    var exactParam = `?items=${params}&useCase=price`;
    API.get("GoFlexeOrderPlacement", `/pricing` + exactParam)
      .then((resp) => {
        setEstimatedMoney(resp.estimatedPrice);
        props.setEstimatedPrice(resp.estimatedPrice);
        setLoading(false);
      })
      .catch((err) => {
        setEstimatedMoney("Error: Try Later");
        alert("Error calculating price, Try again Later");
        setLoading(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Auth.currentUserInfo()
      .then((user) => {
        if (user === null || user === undefined) return;
        console.log(user);
        setNewEmail(
          user.attributes.email === undefined ? "" : user.attributes.email
        );
        setNewContact(
          user.attributes.phone_number === undefined
            ? ""
            : user.attributes.phone_number
        );
        setNewName(
          user.attributes.name === undefined ? "" : user.attributes.name
        );
        //  var tempPhone =
        //    user.attributes.phone_number === undefined
        //      ? details.contactNo
        //      : user.attributes.phone_number;
        //  var tempName =
        //    user.attributes.name === undefined
        //      ? details.name
        //      : user.attributes.name;
      })
      .catch();
  }, []);
  //name change
  const onNameChangeController = (event) => {
    var temp = event.target.value;
    setNewName(temp);
  };
  const editNameClicked = () => {
    setEditName(true);
  };

  const onNameSubmitController = () => {
    props.setName(newName);
    setEditName(false);
  };

  //email change
  const onEmailChangeController = (event) => {
    var temp = event.target.value;
    setNewEmail(temp);
  };
  const editEmailClicked = () => {
    setEditEmail(true);
  };
  const onEmailSubmitController = () => {
    props.setEmail(newEmail);
    setEditEmail(false);
  };

  //contact change
  const onContactChangeController = (event) => {
    var temp = event.target.value;
    setNewContact(temp);
  };
  const editContactClicked = () => {
    setEditContact(true);
  };
  const onContactSubmitController = () => {
    props.setPhone(newContact);
    setEditContact(false);
  };
  //company name
  const onCompanyChangeController = (event) => {
    var temp = event.target.value;
    setNewCompany(temp);
  };
  const editCompanyClicked = () => {
    setEditCompany(true);
  };
  const onCompanySubmitController = () => {
    props.setCompany(newCompany);
    setEditCompany(false);
  };

  if (loading == true) {
    return <Spinner />;
  }

  return (
    <Card className={classes.paper}>
      <CardContent style={{ padding: 0, marginTop: 10 }}>
        <Typography className="TypographyTitle" gutterBottom>
          Order Summary
          <tr style={{ float: "right", marginRight: "10%" }}>
            {/* <th scope="row">{constants.estimatedCost+": "}</th> */}
            <td>{constants.estimatedCost + ": "}</td>
            {loading == true ? <Spinner /> : <td>Rs {estimatedMoney}</td>}
          </tr>
        </Typography>
        <table>
          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
          >
            <Grid item xs={12} sm={6}>
              <tr>
                <th scope="row">Pickup Date :</th>
                <td>{props.pickupDate}</td>
              </tr>
            </Grid>
            <Grid item xs={12} sm={6}>
              <tr>
                <th scope="row">Distance :</th>
                <td>
                  {props.distanceRange.value.lowRange}-
                  {props.distanceRange.value.highRange}Kms
                </td>
              </tr>
            </Grid>
            <Grid item xs={12} sm={6}>
              <tr>
                <th scope="row">Delivery Date :</th>
                <td>{props.deliveryDate}</td>
              </tr>
            </Grid>

            <Grid item xs={12} sm={6}>
              <tr>
                <th scope="row">{constants.pickupAddress + ": "}</th>
                <td>
                  {props.pickupAddress}-{props.pickupPin}
                </td>
              </tr>
            </Grid>
            <Grid item xs={12} sm={6}>
              <tr>
                <th scope="row">{constants.destinationAddress + ": "}</th>
                <td>
                  {props.destinationAddress}-{props.destinationPin}
                </td>
              </tr>
            </Grid>

            <Grid item xs={12} sm={6}>
              <tr>
                <th scope="row">{constants.customerName + ": "}</th>
                {editName && (
                  <td>
                    <TextField
                      className={classes.textfield}
                      xs={12}
                      sm={6}
                      value={newName}
                      autoComplete="given-name"
                      onChange={(event) => onNameChangeController(event)}
                    />
                    <Button onClick={onNameSubmitController} color="secondary">
                      Change
                    </Button>
                  </td>
                )}
                {!editName && (
                  <td>
                    {newName} <EditIcon onClick={editNameClicked} />
                  </td>
                )}
              </tr>
            </Grid>
            <Grid item xs={12} sm={6}>
              <tr>
                <th scope="row">{constants.customerEmail + ": "}</th>
                {editEmail && (
                  <td>
                    <TextField
                      className={classes.textfield}
                      xs={12}
                      sm={6}
                      value={newEmail}
                      autoComplete="given-name"
                      onChange={(event) => onEmailChangeController(event)}
                    />
                    <Button onClick={onEmailSubmitController} color="secondary">
                      Change
                    </Button>
                  </td>
                )}
                {!editEmail && (
                  <td>
                    {newEmail} <EditIcon onClick={editEmailClicked} />
                  </td>
                )}
              </tr>
            </Grid>
            <Grid item xs={12} sm={6}>
              <tr>
                <th scope="row">{constants.customerPhoneNumber + ": "}</th>
                {editContact && (
                  <td>
                    <TextField
                      className={classes.textfield}
                      xs={12}
                      sm={6}
                      value={newContact}
                      autoComplete="given-name"
                      onChange={(event) => onContactChangeController(event)}
                    />
                    <Button
                      onClick={onContactSubmitController}
                      color="secondary"
                    >
                      Change
                    </Button>
                  </td>
                )}
                {!editContact && (
                  <td>
                    {newContact} <EditIcon onClick={editContactClicked} />
                  </td>
                )}
              </tr>
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <tr>
                <th scope="row">{constants.companyName + ": "}</th>
                {editCompany && (
                  <td>
                    <TextField
                      className={classes.textfield}
                      xs={12}
                      sm={6}
                      value={newCompany}
                      autoComplete="given-name"
                      onChange={(event) => onCompanyChangeController(event)}
                    />
                    <Button
                      onClick={onCompanySubmitController}
                      color="secondary"
                    >
                      Change
                    </Button>
                  </td>
                )}
                {!editCompany && (
                  <td>
                    {props.companyName}{" "}
                    <EditIcon onClick={editCompanyClicked} />
                  </td>
                )}
              </tr>
            </Grid> */}
          </Grid>
        </table>
        {props.chosenProducts.map((each, index) => (
          <div>
            <Typography
              className={classes.title}
              style={{ color: "black", backgroundColor: "lightgrey" }}
            >
              Product {index + 1}
            </Typography>
            <table>
              <Grid
                container
                spacing={3}
                style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
              >
                <Grid item xs={12} sm={6}>
                  <tr>
                    <th scope="row">{"Product Name : "}</th>
                    <td>{each.value.productName}</td>
                  </tr>
                </Grid>
                {each.value.measurable === true ? (
                  <Grid item xs={12} sm={6}>
                    <tr>
                      <th scope="row">{"No. of Units : "}</th>
                      <td>{each.noOfUnits}</td>
                    </tr>
                  </Grid>
                ) : (
                  <p></p>
                )}
                {/* {each.value.measurable === false ? (
                  <Grid item xs={12} sm={6}>
                    <tr>
                      <th scope="row">{"Total Weight : "}</th>
                      <td>{each.totalWeight}Kg</td>
                    </tr>
                  </Grid>
                ) : (
                  <p></p>
                )} */}
                {each.value.measurable === false ? (
                  <Grid item xs={12} sm={6}>
                    <tr>
                      <th scope="row">{"Total weight : "}</th>
                      <td>{each.totalWeight}Kg</td>
                    </tr>
                  </Grid>
                ) : (
                  <p></p>
                )}
                <Grid item xs={12} sm={6}>
                  <tr>
                    <th scope="row">{"Product Type : "}</th>
                    <td>
                      {each.value.productType.label || each.value.productType}
                    </td>
                  </tr>
                </Grid>
                {each.value.measurable === true ? (
                  <Grid item xs={12} sm={6}>
                    <tr>
                      <th scope="row">{"Dimensions : "}</th>
                      <td>
                        {each.value.height} x {each.value.length} x{" "}
                        {each.value.width}{" "}
                        {each.value.unit.label || each.value.unit}
                      </td>
                    </tr>
                  </Grid>
                ) : (
                  <p></p>
                )}
                <Grid item xs={12} sm={6}>
                  <tr>
                    <th scope="row">{"Category: "}</th>
                    <td>
                      {each.value.categories.map((unit) => unit.label + ",")}{" "}
                    </td>
                  </tr>
                </Grid>
              </Grid>
            </table>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    // name: state.order.name,
    pickupDate: state.order.pickupDate,
    deliveryDate: state.order.deliveryDate,
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
    // phone: state.order.phone,
    // email: state.order.email,
    // companyName: state.order.companyName,
    measureable: state.order.measureable,
    totalWeight: state.order.totalWeight,
    density: state.order.density,
    chosenProducts: state.order.chosenProducts,
    distanceRange: state.order.distanceRange,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setName: (name) => dispatch(actions.setCustomerName(name)),
    // // setEmail: (email) => dispatch(actions.setEmail(email)),
    // setPhone: (phone) => dispatch(actions.setPhoneNumber(phone)),
    // setCompany: (compName) => dispatch(actions.setCompanyName(compName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
