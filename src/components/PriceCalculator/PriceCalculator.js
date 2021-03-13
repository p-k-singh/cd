import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import constants from "../../Constants/constants";
import DeleteIcon from "@material-ui/icons/Delete";
import Spinner from "../UI/Spinner";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { connect } from "react-redux";
import { InputAdornment } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { Redirect, withRouter } from "react-router-dom";
import * as actions from "../../store/actions/index";
import "../../Globalcss/globalcss.css";
import {
  TextField,
  Checkbox,
  Grid,
  Select as MaterialSelect,
  Card,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Divider,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { Auth, API } from "aws-amplify";
import { Multiselect } from "multiselect-react-dropdown";
// import Autocomplete from "@material-ui/lab/Autocomplete";
const useStyles = makeStyles({
  root: {
    // minHeight:900
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    borderBottomStyle: "solid",
    borderWidth: "1px",
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
  formControl: {
    marginTop: "1%",
    width: "50%",
  },
});
const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);
const PriceCalculator = (props) => {
  const classes = useStyles();

  const [user, setUser] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [chosenProducts, setChosenProducts] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [pickuppin, setpickuppin] = useState();
  const [destinationpin, setdestinationpin] = useState();
  const [pickupZipValidator, setPickupZipValidator] = useState("");
  const [deliverZipValidator, setDeliverZipValidator] = useState("");
  const [negativeValueValidator, setnegativeValueValidator] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [PickupData, setPickupData] = useState([]);
  const [DeliveryData, setDeliveryData] = useState([]);
  const [pickupArea, setPickupArea] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");

  const capabilityOptions = {
    options: constants.inventoryFeatures,
  };
  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };
  const onDistanceChangeController = (event) => {
    props.setDistanceRange(event);
  };

  useEffect(() => {
    Auth.currentUserInfo()
      .then((user) => {
        setUser(user);
        API.get(
          "GoFlexeOrderPlacement",
          `/inventory?type=owner&ownerId=${user.username}`
        )
          .then((response) => {
            // Add your code here
            //setAllProducts(response)

            var items = allProducts.slice();
            //console.log(Array.isArray(response))
            for (var i = 0; i < response.length; i++) {
              items.push({
                productId: response[i].productId,
                label: response[i].productName,
                value: response[i],
                isNew: false,
              });
            }
            setAllProducts(items);
            console.log(items);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {}, []);
  const emptyPinValidator = (string) => {
    if (string === "" || string == null) {
      return false;
    }
    return true;
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

    setdestinationpin(destinationPinCode);
  };
  const onPickupZipChangeController = (event) => {
    var pickupPinCode = parseInt(event.target.value, 10);
    var greater = 999999,
      smaller = 100000;
    var check = 1;
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
    if (pickupPinCode < smaller || pickupPinCode > greater) {
      setPickupZipValidator("Must be of 6 digits");
      check = 0;
    }
    if (pickupPinCode < 0) {
      setPickupZipValidator("Cannot be negative");
      check = 0;
    }
    if (check === 1) {
      setPickupZipValidator("");
    }
    setpickuppin(pickupPinCode);
  };

  const handleItemDeleted = (i) => {
    var items = chosenProducts.slice();
    items.splice(i, 1);
    setChosenProducts(items);
  };
  const addproduct = () => {
    var items = chosenProducts.slice();
    items.push(null);
    setChosenProducts(items);
  };
  const onProductTypeChange = (event, i) => {
    console.log(event);
    var items = chosenProducts.slice();
    items[i].value.productType = event;
    setChosenProducts(items);
  };
  const onCategoryChange = (event, i) => {
    console.log(event);
    var items = chosenProducts.slice();
    items[i].value.categories = event;
    setChosenProducts(items);
  };
  const handleMeasurableChange = (i) => {
    var items = chosenProducts.slice();
    items[i].value.measurable = !items[i].value.measurable;
    setChosenProducts(items);
  };
  const onPickupAreaChangeController = (event) => {
    setPickupArea(event.target.value);
  };
  const onDeliveryAreaChangeController = (event) => {
    setDeliveryArea(event.target.value);
  };
  const unitChangeController = (event, i) => {
    var items = chosenProducts.slice();
    items[i].value.unit = event;
    setChosenProducts(items);
  };
  const onWeightPerUnitChangeController = (event, i) => {
    var items = chosenProducts.slice();

    if (event.target.value < 0) {
      items[i].value.weightPerUnit = 0;
    } else {
      items[i].value.weightPerUnit = event.target.value;
    }
    setChosenProducts(items);
  };
  const onHeightChangeController = (event, i) => {
    var items = chosenProducts.slice();
    if (event.target.value < 0) {
      items[i].value.height = 0;
    } else {
      items[i].value.height = event.target.value;
    }

    setChosenProducts(items);
  };
  const onWidthChangeController = (event, i) => {
    var items = chosenProducts.slice();
    if (event.target.value < 0) {
      items[i].value.width = 0;
    } else {
      items[i].value.width = event.target.value;
    }
    setChosenProducts(items);
  };
  const onLengthChangeController = (event, i) => {
    var items = chosenProducts.slice();
    if (event.target.value < 0) {
      items[i].value.length = 0;
    } else {
      items[i].value.length = event.target.value;
    }
    setChosenProducts(items);
  };
  const onDensityChangeController = (event, i) => {
    var items = chosenProducts.slice();
    if (event.target.value < 0) {
      items[i].value.density = 0;
    } else {
      items[i].value.density = event.target.value;
    }
    setChosenProducts(items);
  };
  const calculatePrice = () => {
    const msg = myValidator(chosenProducts);
    if (msg !== "") {
      alert(msg);
      return;
    }
    if (pickupZipValidator !== "") {
      alert("Pickup zip must be of 6 digits.");
      return;
    }
    if (deliverZipValidator !== "") {
      alert("Destination zip must be of 6 digits.");
      return;
    }
    if (
      emptyPinValidator(destinationpin) === false ||
      emptyPinValidator(pickuppin) === false
    ) {
      alert("Zip codes cannot be empty");

      return;
    }
    setCalculating(true);

    var items = [];

    for (var i = 0; i < chosenProducts.length; i++) {
      //var temp=''
      items.push({
        toPin: pickuppin,
        fromPin: destinationpin,
        productName: chosenProducts[i].value.productName,
        productType: chosenProducts[i].value.productType.value,
        length: chosenProducts[i].value.length,
        width: chosenProducts[i].value.width,
        height: chosenProducts[i].value.height,
        weightPerUnit: chosenProducts[i].value.weightPerUnit,
        Unit:
          chosenProducts[i].value.measurable == true
            ? chosenProducts[i].value.unit.value
            : "",
        noOfUnits: chosenProducts[i].noOfUnits,
        measurable: chosenProducts[i].value.measurable,
        density: chosenProducts[i].value.density,
        totalWeight: chosenProducts[i].totalWeight,
        distanceRange: props.distanceRange.value,
      });
    }
    var params = JSON.stringify(items);
    // alert(`/pricing?items=`+params)
    // return
    console.log(params);
    var exactParam = `?items=${params}&useCase=price`;
    //console.log(exactParam)
    //return
    API.get("GoFlexeOrderPlacement", `/pricing` + exactParam)
      .then((resp) => {
        console.log(resp);
        setShowPrice(true);
        setEstimatedPrice(resp.estimatedPrice);
        setCalculating(false);
      })
      .catch((err) => {
        setCalculating(false);
        alert("Error calculating price, Try again Later");
        console.log(err);
      });
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
      //   msg = "Weight Per Cubic meter cannot be empty";
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

  const onNoOfUnitsChange = (event, i) => {
    var items = chosenProducts.slice();
    if (chosenProducts[i] === null) return;
    if (event.target.value < 0) {
      items[i].noOfUnits = 0;
    } else {
      items[i].noOfUnits = event.target.value;
    }
    setChosenProducts(items);
  };
  const onTotalWeightChange = (event, i) => {
    var items = chosenProducts.slice();
    if (event.target.value < 0) {
      items[i].totalWeight = 0;
    } else {
      items[i].totalWeight = event.target.value;
    }
    setChosenProducts(items);
  };
  const handlePlaceOrderClick = () => {
    props.setPickupPinDispatcher(pickuppin);
    props.setDestinationPinDispatcher(destinationpin);
    props.setChosenProducts(chosenProducts);
    setRedirect(true);
  };
  const handleChange = (newValue, i) => {
    var items = chosenProducts.slice();
    if (newValue === null) {
      items[i] = null;
    } else {
      if (newValue.__isNew__ === true) {
        var temp = {
          value: {
            productName: newValue.value,
            productType: null,
            categories: null,
            measurable: true,
            length: null,
            width: null,
            height: null,
            weightPerUnit: null,
            density: null,
            unit: { label: "Inches", value: "inches" },
            location: "",
            pincode: "",
            productId: "",
          },
          isNew: true,
          label: newValue.label,
          noOfUnits: 0,
          totalWeight: 0,
        };
        items[i] = temp;
      } else {
        var temp = {
          value: newValue.value,
          isNew: false,
          label: newValue.label,
          noOfUnits: 0,
          totalWeight: 0,
          productId: newValue.productId,
        };
        items[i] = temp;
      }
    }
    setChosenProducts(items);
    console.log(items);
    // console.log(newValue)
  };
  //   const onquantityChangeController = (event, i) => {
  //     var items = products.slice();
  //     items[i].quantity = event.target.value;
  //     setproducts(items);
  //   };
  /*IF the product is measureable with length width height */
  var measureablePerUnit = (i) => (
    <React.Fragment>
      <Grid container spacing={3} style={{ padding: 50, paddingTop: 10 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            id="weightPerUnit"
            name="weightPerUnit"
            label="Weight Per Unit(in Kg)"
            fullWidth
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            value={chosenProducts[i].value.weightPerUnit}
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
            autoComplete="weightPerUnit"
            onChange={(event) => onWeightPerUnitChangeController(event, i)}
          />
        </Grid>
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            id="height"
            name="height"
            label="Height"
            fullWidth
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            value={chosenProducts[i].value.height}
            autoComplete="Height"
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
            onChange={(event) => onHeightChangeController(event, i)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            id="width"
            name="width"
            label="Width"
            fullWidth
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            value={chosenProducts[i].value.width}
            autoComplete="width"
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
            onChange={(event) => onWidthChangeController(event, i)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            id="length"
            name="length"
            label="Length"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            value={chosenProducts[i].value.length}
            fullWidth
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
            onChange={(event) => onLengthChangeController(event, i)}
            autoComplete="Length"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Select
            styles={selectStyles}
            className="basic-single"
            classNamePrefix="Unit"
            isSearchable
            name="unit"
            placeholder="Unit"
            value={chosenProducts[i].value.unit}
            onChange={(event) => unitChangeController(event, i)}
            options={constants.lengthDimensions}
          />
          {/* </FormControl> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );

  var notMeasureable = (i) => (
    <React.Fragment>
      {/*test*/}
      <Grid
        container
        spacing={3}
        style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            id="TotalWeight"
            name="TotalWeight"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            label="Total Weight"
            fullWidth
            value={chosenProducts[i].totalWeight}
            onChange={(event) => onTotalWeightChange(event, i)}
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );

  var fixedMeasurable = (i) => (
    <React.Fragment>
      <Grid
        container
        spacing={4}
        style={{ paddingTop: 30, paddingLeft: 30, paddingRight: 30 }}
      >
        <Grid item xs={12} sm={3}>
          <TextField
            type="text"
            id="weightPerunit"
            name="weightPerunit"
            label="Weight Per Unit"
            fullWidth
            onChange={(event) => onWeightPerUnitChangeController(event, i)}
            value={chosenProducts[i].value.weightPerUnit}
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
        </Grid>
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <Select
            styles={selectStyles}
            className="basic-single"
            classNamePrefix="Unit"
            isSearchable
            name="unit"
            placeholder="Unit"
            value={chosenProducts[i].value.unit}
            onChange={(event) => unitChangeController(event, i)}
            options={constants.lengthDimensions}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="text"
            id="length"
            name="lenght"
            label="Length"
            fullWidth
            onChange={(event) => onLengthChangeController(event, i)}
            value={chosenProducts[i].value.length}
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="text"
            id="width"
            name="width"
            label="Width"
            fullWidth
            value={chosenProducts[i].value.width}
            onChange={(event) => onWidthChangeController(event, i)}
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="text"
            id="height"
            name="height"
            label="Height"
            fullWidth
            value={chosenProducts[i].value.height}
            variant="outlined"
            onChange={(event) => onHeightChangeController(event, i)}
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );

  var fixedNotMeasurable = (i) => (
    <React.Fragment>
      <Grid
        container
        spacing={4}
        style={{ paddingTop: 30, paddingLeft: 30, paddingRight: 30 }}
      >
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            id="TotalWeight"
            name="TotalWeight"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            label="Total Weight"
            fullWidth
            value={chosenProducts[i].totalWeight}
            onChange={(event) => onTotalWeightChange(event, i)}
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );

  var list = chosenProducts.map((e, i) => (
    <div>
      {i !== 0 && <Divider style={{ marginBottom: 30, marginTop: 30 }} />}
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ padding: 30 }}
      >
        <Grid item>
          <h5>Product {i + 1}</h5>
        </Grid>
        <Grid item>
          {i == 0 ? (
            ""
          ) : (
            <IconButton onClick={() => handleItemDeleted(i)}>
              <DeleteIcon style={{ fontSize: "30" }} />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={4} style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Grid item xs={12} sm={4}>
          <CreatableSelect
            isClearable
            value={chosenProducts[i]}
            onChange={(newValue) => handleChange(newValue, i)}
            options={allProducts}
            placeholder="Product Name"
            styles={selectStyles}
          />
        </Grid>
        {/* Type of the product */}
        <Grid item xs={12} sm={4}>
          {chosenProducts[i] === null || !chosenProducts[i].isNew ? (
            <TextField
              type="text"
              id="Product Type"
              name="Product Type"
              label="Product Type"
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled
              value={
                chosenProducts[i] === null ||
                chosenProducts[i].value.productType === null
                  ? null
                  : chosenProducts[i].value.productType
              }
              variant="outlined"
              size="small"
              style={{ backgroundColor: "#fff" }}
            />
          ) : (
            <Select
              styles={selectStyles}
              value={
                chosenProducts[i] === null ||
                chosenProducts[i].value.productType === null
                  ? null
                  : chosenProducts[i].value.productType
              }
              isDisabled={
                chosenProducts[i] === null || !chosenProducts[i].isNew
              }
              onChange={(event) => onProductTypeChange(event, i)}
              isSearchable
              placeholder="Product Type"
              name="color"
              options={constants.typesOfProducts}
            />
          )}
        </Grid>
        {chosenProducts[i] === null || chosenProducts[i].value.measurable ? (
          <Grid item xs={12} sm={4}>
            <TextField
              error={negativeValueValidator !== ""}
              helperText={
                negativeValueValidator === "" ? " " : negativeValueValidator
              }
              fullWidth
              type="number"
              size="small"
              id="outlined-basic"
              label="No. of units"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 5);
              }}
              variant="outlined"
              value={
                chosenProducts[i] === null ? 0 : chosenProducts[i].noOfUnits
              }
              onChange={(event) => onNoOfUnitsChange(event, i)}
            />
          </Grid>
        ) : (
          <Grid item xs={12} sm={4}>
            {/* <TextField
              fullWidth
              type="number"
              size="small"
              id="outlined-basic"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 5);
              }}
              label="Total Weight"
              variant="outlined"
              value={chosenProducts[i].totalWeight}
              onChange={(event) => onTotalWeightChange(event, i)}
            /> */}
          </Grid>
        )}
        <Grid item xs={12} sm={11}>
          <Select
            //defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            styles={selectStyles}
            name="categories"
            value={
              chosenProducts[i] === null ||
              chosenProducts[i].value.categories === null
                ? null
                : chosenProducts[i].value.categories
            }
            options={constants.inventoryCategory}
            placeholder="Category(Select Multiple)"
            isDisabled={chosenProducts[i] === null || !chosenProducts[i].isNew}
            className="basic-multi-select"
            onChange={(event) => onCategoryChange(event, i)}
            classNamePrefix="select"
          />
        </Grid>

        {/* <Grid item xs={12} sm={1}>
            <IconButton onClick={() => handleItemDeleted(i)}>
            <DeleteIcon style={{ fontSize: "30" }} />
          </IconButton>
        </Grid> */}
        {chosenProducts[i] === null ? (
          <React.Fragment></React.Fragment>
        ) : chosenProducts[i].isNew === true ? (
          <React.Fragment>
            <Grid
              component="label"
              container
              style={{ fontSize: 18, marginTop: 20, marginBottom: 20 }}
              alignItems="center"
              spacing={1}
            >
              <Grid item>Total Weight</Grid>
              <Grid item>
                <AntSwitch
                  checked={chosenProducts[i].value.measurable}
                  onChange={() => handleMeasurableChange(i)}
                  name="checkedC"
                />
              </Grid>
              <Grid item>No. Of Units</Grid>
            </Grid>
            {chosenProducts[i].value.measurable === true
              ? measureablePerUnit(i)
              : notMeasureable(i)}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography
              style={{
                fontSize: 18,
                marginTop: 20,
                marginBottom: 10,
                marginLeft: 20,
              }}
            >
              Product Dimensions
            </Typography>
            <Grid
              component="label"
              container
              style={{ fontSize: 18, marginTop: 20, marginBottom: 20 }}
              alignItems="center"
              spacing={1}
            >
              <Grid item>Total Weight</Grid>
              <Grid item>
                <AntSwitch
                  checked={chosenProducts[i].value.measurable}
                  onChange={() => handleMeasurableChange(i)}
                  name="checkedC"
                />
              </Grid>
              <Grid item>No. Of Units</Grid>
            </Grid>
            {chosenProducts[i].value.measurable === true
              ? fixedMeasurable(i)
              : fixedNotMeasurable(i)}
          </React.Fragment>
        )}
        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </div>
  ));

  if (loading === true) {
    return (
      <React.Fragment>
        <h1>Loading your product details</h1>
        <Spinner />
      </React.Fragment>
    );
  }
  if (redirect) {
    return <Redirect to="/ordersRedir" />;
  }
  if (calculating === true) {
    return (
      <div class="jumbotron text-center">
        <p class="lead">
          <strong>Calculating estimated cost</strong>
        </p>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardContent style={{ padding: 0 }}>
          <Typography fullWidth className={classes.title} gutterBottom>
            Price Calculator
          </Typography>
          <form>
            <Grid
              container
              spacing={3}
              style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
            ></Grid>
            {list}
            <Button
              className="AllButtons"
              style={{
                marginTop: 10,
                marginLeft: 20,
              }}
              onClick={() => addproduct()}
            >
              Add product
            </Button>
            <Divider style={{ margin: 20 }} />
            <Typography className={classes.formHeadings}>
              Location Details
            </Typography>
            <Grid
              container
              spacing={3}
              style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
            >
              <Grid item xs={12} sm={4}>
                <TextField
                  required
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
                  label="Pickup Zip"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={pickuppin}
                  onChange={(event) => onPickupZipChangeController(event)}
                  autoComplete="Pickup postal-code"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  error={deliverZipValidator !== ""}
                  helperText={
                    deliverZipValidator === ""
                      ? DeliveryData == ""
                        ? ""
                        : DeliveryData[0].District +
                          ", " +
                          DeliveryData[0].State
                      : deliverZipValidator
                  }
                  type="number"
                  id="destinationzip"
                  name="destinationzip"
                  variant="outlined"
                  size="small"
                  label="Destination Zip"
                  fullWidth
                  value={destinationpin}
                  onChange={(event) => onDestinationZipChangeController(event)}
                  autoComplete="Destination postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                {/* <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">Distance</InputLabel>
                  <MaterialSelect
                    native
                    value={DistanceRange}
                    onChange={(event) => onDistanceChangeController(event)}
                    inputProps={{
                      name: "age",
                      id: "age-native-simple",
                    }}
                  >
                    {constants.DistanceOptions.map((d) => (
                      <option value={d.value}>{d.name}</option>
                    ))}
                  </MaterialSelect>
                </FormControl> */}
                <Select
                  styles={selectStyles}
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
              {PickupData.length !== 0 ? (
                <Grid item xs={12} sm={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="age-native-simple">
                      Pickup Locality
                    </InputLabel>
                    <MaterialSelect
                      autoWidth={true}
                      fullWidth
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

              {DeliveryData.length !== 0 ? (
                <Grid item xs={12} sm={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="age-native-simple">
                      Destination Locality
                    </InputLabel>
                    <MaterialSelect
                      native
                      onChange={(event) =>
                        onDeliveryAreaChangeController(event)
                      }
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
                  </FormControl>
                </Grid>
              ) : (
                <p></p>
              )}
            </Grid>
          </form>
          <Typography className={classes.formHeadings}>
            Value Added Services
          </Typography>
          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
          >
            {constants.vas.map((vas) => {
              return (
                <Grid item xs={12} sm={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        //checked={state.checkedB}
                        //onChange={handleChange}
                        name={vas.name}
                        color="primary"
                      />
                    }
                    label={vas.name}
                  />
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
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
            className="AllButtons"
            style={{
              marginTop: 10,
              marginLeft: 20,
            }}
            onClick={() => calculatePrice()}
          >
            Calculate
          </Button>
        </div>
        {showPrice === true && (
          <Card className={classes.root}>
            <Divider />
            <Grid>
              <Button
                sm={6}
                style={{
                  float: "right",
                  marginTop: "10px",
                  marginRight: "30px",
                  backgroundColor: "#f9a825",
                }}
                variant="contained"
                //color="primary"
                onClick={() => handlePlaceOrderClick()}
              >
                Place order
              </Button>
            </Grid>
            <div
              style={{ textAlign: "center", fontSize: "18px", padding: "20px" }}
            >
              Estimated price is : {estimatedPrice}
            </div>
          </Card>
        )}
      </Card>
      {/* //if(showPrice===true) */}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    distanceRange: state.order.distanceRange,
    // height:state.order.height,
    // width:state.order.width,
    // length:state.order.length,
    // unit:state.order.unit,
    // noOfUnits:state.order.noOfUnits,
    // weightPerUnit:state.order.weightPerUnit,
    // pickupPin:state.order.pickupPin,
    // destinationPin:state.order.destinationPin,
    // measureable:state.order.measureable,
    // totalWeight:state.order.totalWeight,
    // density:state.order.density
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setHeightDispatcher:(h)=>dispatch(actions.setHeight(h)),
    // setWidthDispatcher:(w)=>dispatch(actions.setWidth(w)),
    // setLengthDispatcher:(l)=>dispatch(actions.setLength(l)),
    // setUnitDispatcher:(unitOfMeasurement)=>dispatch(actions.setUnit(unitOfMeasurement)),
    // setNoOfUnitsDispatcher:(numberUnits)=>dispatch(actions.setNumberOfUnits(numberUnits)),
    // setWeightPerUnitDispatcher:(weightUnit)=>dispatch(actions.setWeightPerUnit(weightUnit)),
    setPickupPinDispatcher: (pPin) => dispatch(actions.setPickupPin(pPin)),
    setDestinationPinDispatcher: (dPin) =>
      dispatch(actions.setDestinationPin(dPin)),
    setDistanceRange: (distanceRange) =>
      dispatch(actions.setDistanceRange(distanceRange)),
    // setMeasureable:(isMeasureable)=>dispatch(actions.setMeasureable(isMeasureable)),
    // setTotalWeight:(totalWeight)=>dispatch(actions.setTotalWeight(totalWeight)),
    // setDensity:(density)=>dispatch(actions.setDensity(density)),
    setChosenProducts: (chosenProducts) =>
      dispatch(actions.setChosenProducts(chosenProducts)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PriceCalculator)
);
