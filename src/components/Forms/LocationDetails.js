import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Select from "react-select";
import constants from "../../Constants/constants";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select as MaterialSelect,
  TextareaAutosize,
} from "@material-ui/core";
const useStyles = makeStyles({
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
});

const BuyerDetails = (props) => {
  const classes = useStyles();

  const [pickupArea, setPickupArea] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [pickupZipValidator, setPickupZipValidator] = useState("");
  const [deliverZipValidator, setDeliverZipValidator] = useState("");
  const [pickupDateValidator, setPickupDateValidator] = useState("");
  const [deliveryDateValidator, setDeliveryDateValidator] = useState("");
  const [PickupData, setPickupData] = useState([]);
  const [DeliveryData, setDeliveryData] = useState([]);

  useEffect(() => {
    //alert('topin'+props.pickupPin+'from pin'+props.destinationPin)
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    props.setPickupDateDispatcher(today);
    props.setDeliveryDateDispatcher(today);
    //console.log(props.chosenProducts)
  }, []);
  const onPickupChangeController = (event) => {
    var pickupAddress = event.target.value;
    props.setPickupAddressDispatcher(pickupAddress);
  };

  const onPickupDateChangeController = (event) => {
    var pickupDate = event.target.value;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    dd = parseInt(dd, 10);
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    mm = parseInt(mm, 10);
    var yyyy = today.getFullYear();
    yyyy = parseInt(yyyy, 10);
    //console.log(pickupDate)
    var year = parseInt(pickupDate.substring(0, 4), 10);
    var month = parseInt(pickupDate.substring(5, 7), 10);
    var date = parseInt(pickupDate.substring(8, 10), 10);
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
    if (invalid === 1) setPickupDateValidator("Invalid Date");
    else setPickupDateValidator("");
    props.setPickupDateDispatcher(pickupDate);
  };

  const onDeliveryDateChangeController = (event) => {
    var deliverDate = event.target.value;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    dd = parseInt(dd, 10);
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    mm = parseInt(mm, 10);
    var yyyy = today.getFullYear();
    yyyy = parseInt(yyyy, 10);
    //console.log(pickupDate)
    var year = parseInt(deliverDate.substring(0, 4), 10);
    var month = parseInt(deliverDate.substring(5, 7), 10);
    var date = parseInt(deliverDate.substring(8, 10), 10);
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
    if (invalid === 1) setDeliveryDateValidator("Invalid Date");
    else setDeliveryDateValidator("");
    props.setDeliveryDateDispatcher(event.target.value);
  };
  const onPickupZipChangeController = (event) => {
    var pickupPinCode = parseInt(event.target.value, 10);
    if (pickupPinCode < 0) {
      setPickupZipValidator("Cannot be a negative value");
      props.setPickupPinDispatcher(pickupPinCode);
      return;
    } else {
      setPickupZipValidator("");
    }
    var count = 0,
      temp = pickupPinCode;
    while (temp > 0) {
      count++;
      temp = Math.floor(temp / 10);
    }
    if (count == 6) {
      const api_url = "https://api.postalpincode.in/pincode/" + pickupPinCode;

      // Defining async function
      async function getapi(url) {
        // Storing response

        const response = await fetch(url);

        // Storing data in form of JSON
        var data = await response.json();
        console.log(data);
        setPickupData(
          data !== null && data[0].PostOffice !== null ? data[0].PostOffice : ""
        );
      }
      // Calling that async function
      getapi(api_url);
    }
    if (count !== 6) {
      setPickupZipValidator("Must be of six digits");
    } else {
      setPickupZipValidator("");
    }
    props.setPickupPinDispatcher(pickupPinCode);
  };
  const onDestinationZipChangeController = (event) => {
    var destinationPinCode = parseInt(event.target.value, 10);
    var greater = 999999,
      smaller = 100000;
    var check = 1;
    var count = 0,
      temp = destinationPinCode;
    while (temp > 0) {
      count++;
      temp = Math.floor(temp / 10);
    }
    if (count == 6) {
      const api_url =
        "https://api.postalpincode.in/pincode/" + destinationPinCode;

      // Defining async function
      async function getapi(url) {
        // Storing response

        const response = await fetch(url);

        // Storing data in form of JSON
        var data = await response.json();
        console.log(data);
        setDeliveryData(
          data !== null && data[0].PostOffice !== null ? data[0].PostOffice : ""
        );
      }
      // Calling that async function
      getapi(api_url);
    }
    if (destinationPinCode < smaller || destinationPinCode > greater) {
      setDeliverZipValidator("Must be of 6 digits");
      check = 0;
    }
    if (destinationPinCode < 0) {
      setDeliverZipValidator("Cannot be negative");
      check = 0;
    }
    if (check === 1) {
      setDeliverZipValidator("");
    }
    props.setDestinationPinDispatcher(destinationPinCode);
  };
  const onDestinationChangeController = (event) => {
    var destinationAddress = event.target.value;
    props.setDestinationAddressDispatcher(destinationAddress);
  };

  const onTimeSlotChangeController = (event) => {
    props.setPickupSlotDispatcher(event);
  };
  const onDistanceChangeController = (event) => {
    props.setDistanceRange(event);
   
  };
  const onPickupAreaChangeController = (event) => {
    setPickupArea(event.target.value);
  };
  const onDeliveryAreaChangeController = (event) => {
    setDeliveryArea(event.target.value);
  };

  const onAdditionalNoteChangeController = (event) => {
    props.setAdditionalNoteDispatcher(event.target.value);
  };

  return (
    <CardContent style={{ padding: 0 }}>
      <Typography className="TypographyTitle" gutterBottom>
        Location Details
      </Typography>
      <form>
        <Typography className={classes.formHeadings}>
          Location Preference
        </Typography>

        <Grid
          container
          spacing={3}
          style={{
            paddingLeft: 20,
            paddingTop: 20,
            paddingBottom: 30,
            paddingRight: 20,
          }}
        >
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="pickupaddress"
              name="pickupaddress"
              label="Pick up address"
              variant="outlined"
              size="small"
              fullWidth
              value={props.pickupAddress}
              onChange={(event) => onPickupChangeController(event)}
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              required
              variant="outlined"
              size="small"
              error={pickupZipValidator !== ""}
              helperText={
                pickupZipValidator === ""
                  ? PickupData == ""
                    ? ""
                    : PickupData[0].District + ", " + PickupData[0].State
                  : pickupZipValidator
              }
              type="number"
              id="pickupzip"
              name="pickupzip"
              InputLabelProps={{ shrink: true }}
              label="Pickup Zip"
              fullWidth
              value={props.pickupPin}
              onChange={(event) => onPickupZipChangeController(event)}
              autoComplete="Pickup postal-code"
            />
          </Grid>
          {PickupData.length !== 0 ? (
            <Grid item xs={12} sm={2}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="age-native-simple">Locality</InputLabel>
                <MaterialSelect
                  native
                  onChange={(event) => onPickupAreaChangeController(event)}
                  value={pickupArea}
                  inputProps={{
                    name: "age",
                    id: "age-native-simple",
                  }}
                >
                  {PickupData.map((d) => (
                    <option>{d.Name}</option>
                  ))}
                </MaterialSelect>
              </FormControl>
            </Grid>
          ) : (
            <p></p>
          )}

          <Grid item xs={12} sm={3}>
            <TextField
              required
              error={pickupDateValidator !== ""}
              helperText={
                pickupDateValidator === "" ? " " : pickupDateValidator
              }
              id="pickupdate"
              name="pickupdate"
              label="Pickup Date(mm/dd/yyyy)"
              fullWidth
              variant="outlined"
              size="small"
              type="date"
              // defaultValue='2021-01-01'
              value={props.pickupDate}
              onChange={(event) => onPickupDateChangeController(event)}
              autoComplete="shipping address-line1"
            />
          </Grid>

          <Grid item xs={12} sm={10}></Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              id="destinationaddress"
              name="destinationaddress"
              label="Destination address*"
              fullWidth
              variant="outlined"
              size="small"
              value={props.destinationAddress}
              onChange={(event) => onDestinationChangeController(event)}
              autoComplete="shipping address-line2"
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              required
              variant="outlined"
              size="small"
              error={deliverZipValidator !== ""}
              helperText={
                deliverZipValidator === ""
                  ? DeliveryData == ""
                    ? ""
                    : DeliveryData[0].District + ", " + DeliveryData[0].State
                  : deliverZipValidator
              }
              type="number"
              id="destinationzip"
              name="destinationzip"
              label="Destination Zip"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={props.destinationPin}
              onChange={(event) => onDestinationZipChangeController(event)}
              autoComplete="Destination postal-code"
            />
          </Grid>
          {DeliveryData.length !== 0 ? (
            <Grid item xs={12} sm={2}>
              {/* <Select
                className="basic-single"
                classNamePrefix="Distance"
                isSearchable
                value={deliveryArea}
                name="Distance"
                defaultValue={({
                  value: DeliveryData[0].Name,
                  label: DeliveryData[0].Name,
                })}
                placeholder="Distance"
                onChange={(event) => onDeliveryAreaChangeController(event)}
                options={DeliveryData.map((d) => ({
                  value: d.Name,
                  label: d.Name,
                }))}
              /> */}
              <MaterialSelect
                native
                size="small"
                onChange={(event) => onDeliveryAreaChangeController(event)}
                value={deliveryArea}
                inputProps={{
                  name: "age",
                  id: "age-native-simple",
                }}
              >
                {DeliveryData.map((d) => (
                  <option>{d.Name}</option>
                ))}
              </MaterialSelect>
            </Grid>
          ) : (
            <p></p>
          )}
          <Grid item xs={12} sm={3}>
            <TextField
              error={deliveryDateValidator !== ""}
              variant="outlined"
              size="small"
              helperText={
                deliveryDateValidator === "" ? " " : deliveryDateValidator
              }
              id="deliverydate"
              name="deliverydate"
              label="Desired Delivery date"
              fullWidth
              type="date"
              value={props.deliveryDate}
              onChange={(event) => onDeliveryDateChangeController(event)}
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              className="basic-single"
              classNamePrefix="Pickup Slot"
              isSearchable
              name="Pickup Slot"
              placeholder="Pickup Slot"
              value={props.pickupSlot}
              onChange={(event) => onTimeSlotChangeController(event)}
              options={constants.timeSlots}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              className="basic-single"
              classNamePrefix="Distance"
              isSearchable
              name="Distance"
              placeholder="Distance"
              value={props.distanceRange}
              onChange={(event) => onDistanceChangeController(event)}
              options={constants.DistanceOptions}
            />
          </Grid>
        </Grid>
        <Typography className={classes.formHeadings}>
          Additional Note
        </Typography>

        <Grid
          container
          spacing={3}
          style={{ padding: 20, paddingTop: 20, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={5}>
            <TextareaAutosize
              style={{ minWidth: 375 }}
              aria-label="minimum height"
              value={props.additionalNote}
              onChange={(event) => onAdditionalNoteChangeController(event)}
              rowsMin={6}
              rowsMax={12}
              placeholder="Share if Any..."
            />
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

const mapStateToProps = (state) => {
  return {
    pickupAddress: state.order.pickupAddress,
    pickupPin: state.order.pickupPin,
    destinationAddress: state.order.destinationAddress,
    destinationPin: state.order.destinationPin,
    pickupDate: state.order.pickupDate,
    deliveryDate: state.order.deliveryDate,
    pickupSlot: state.order.pickupSlot,
    additionalNote: state.order.additionalNote,
    chosenProducts: state.order.chosenProducts,
    distanceRange: state.order.distanceRange,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPickupAddressDispatcher: (pAddress) =>
      dispatch(actions.setPickupAddress(pAddress)),
    setDestinationAddressDispatcher: (dAddress) =>
      dispatch(actions.setDestinationAddress(dAddress)),
    setPickupPinDispatcher: (pPin) => dispatch(actions.setPickupPin(pPin)),
    setDestinationPinDispatcher: (dPin) =>
      dispatch(actions.setDestinationPin(dPin)),
    setPickupDateDispatcher: (pdate) => dispatch(actions.setPickupDate(pdate)),
    setDeliveryDateDispatcher: (ddate) =>
      dispatch(actions.setDeliveryDate(ddate)),
    setPickupSlotDispatcher: (slot) => dispatch(actions.setPickupSlot(slot)),
    setDistanceRange: (distanceRange) =>
      dispatch(actions.setDistanceRange(distanceRange)),
    setAdditionalNoteDispatcher: (note) =>
      dispatch(actions.setAdditionalNote(note)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyerDetails);
