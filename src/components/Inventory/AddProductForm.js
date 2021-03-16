import React, { useState } from "react";
import Select from "react-select";
import "../../Globalcss/globalcss.css";
import {
  TextField,
  FormControlLabel,
  Grid,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Switch,
  InputAdornment,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Auth, API } from "aws-amplify";
import Spinner from "../UI/Spinner";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Multiselect } from "multiselect-react-dropdown";
import constants from "../../Constants/constants";
const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  // title: {
  //   fontSize: 20,
  //   height: 50,
  //   padding: 10,
  //   paddingLeft: 55,
  //   color: "white",
  // },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
  formControl: {
    marginTop: "1%",
  },
  container: {
    justifyContent: "space-between",
    flexDirection: "column",
    display: "flex",
  },
  btnHolder: {
    justifyContent: "flex-end",
    display: "flex",
    marginRight: "30px",
    marginBottom: "30px",
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
const AddProductForm = (props) => {
  const classes = useStyles();
  const [newProductName, setNewProductName] = useState("");
  const [newProductType, setNewProductType] = useState("");
  const [unit, setUnit] = useState({ label: "Inches", value: "inches" });
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [length, setLength] = useState();
  const [weightPerUnit, setWeightPerunit] = useState();
  const [location, setLocation] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pinCode, setPinCode] = useState();
  const [density, setDensity] = useState();
  const [switchToggler, setSwitchToggler] = useState(true);

  /**Errors Validator */
  const [pinValidator, setPinValidator] = useState("");
  const [lengthValidator, setLengthValidator] = useState("");
  const [widthValidator, setWidthValidator] = useState("");
  const [heightValidator, setHeightValidator] = useState("");
  const [weightPerUnitValidator, setWeightPerUnitValidator] = useState("");
  const [fillDimensions, setFillDimensions] = useState(false);

  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  const handleTypeChange = (event) => {
    setNewProductType(event);
  };
  const handleSwitchTogglerChange = (event) => {
    setSwitchToggler(!switchToggler);
  };
  const onPinChangeController = (event) => {
    var pickupPinCode = parseInt(event.target.value, 10);
    var greater = 999999,
      smaller = 100000;
    var check = 1;
    if (pickupPinCode < smaller || pickupPinCode > greater) {
      setPinValidator("Must be of 6 digits");
      check = 0;
    }
    if (pickupPinCode < 0) {
      setPinValidator("Cannot be negative");
      check = 0;
    }
    if (check === 1) {
      setPinValidator("");
    }
    setPinCode(event.target.value);
  };
  const onHeightChangeController = (event) => {
    if (event.target.value < 0) {
      setHeightValidator("Height cannot be negative");
    } else {
      setHeightValidator("");
    }
    setHeight(event.target.value);
  };
  const onWidthChangeController = (event) => {
    if (event.target.value < 0) {
      setWidthValidator("Width cannot be negative");
    } else {
      setWidthValidator("");
    }
    setWidth(event.target.value);
  };
  const onLengthChangeController = (event) => {
    if (event.target.value < 0) {
      setLengthValidator("Length cannot be negative");
    } else {
      setLengthValidator("");
    }
    setLength(event.target.value);
  };
  const onCategoryChange = (event) => {
    setCategories(event);
  };
  const unitChangeController = (event) => {
    setUnit(event);
  };
  const onProductNameChange = (event) => {
    setNewProductName(event.target.value);
  };

  const onWeightPerUnitChangeController = (event) => {
    if (event.target.value < 0) {
      setWeightPerUnitValidator("Weight Per unit cannot be negative");
    } else {
      setWeightPerUnitValidator("");
    }
    setWeightPerunit(event.target.value);
  };
  const onLocationChangeController = (event) => {
    setLocation(event.target.value);
  };
  // const onDensityChangeController = (event) => {
  //   if (event.target.value < 0) {
  //     setDensity(0);
  //   } else {
  //     setDensity(event.target.value);
  //   }
  // };

  const submit = async () => {
    if (newProductName == "") {
      alert("Product Name can't be empty");
      return;
    }
    if (newProductType == "") {
      alert("Product Type can't be empty");
      return;
    }
    if (categories == null || categories == "") {
      alert("Product Category can't be empty");
      return;
    }
    if (
      (fillDimensions === true && weightPerUnit == null) ||
      (fillDimensions === true && height == null) ||
      (fillDimensions === true && length == null) ||
      (fillDimensions === true && width == null)
    ) {
      alert("Product Dimensions can't be empty");
      return;
    }
    if (fillDimensions === true && unit === "") {
      alert("Select measurement Unit for your Product");
      return;
    }
    // if (fillDimensions === false && density == null) {
    //   alert("Density cannot be empty");
    //   return;
    // }
    if (fillDimensions === true && lengthValidator !== "") {
      alert(lengthValidator);
      return;
    }
    if (fillDimensions === true && widthValidator !== "") {
      alert(widthValidator);
      return;
    }
    if (fillDimensions === true && heightValidator !== "") {
      alert(heightValidator);
      return;
    }
    if (fillDimensions === true && weightPerUnitValidator !== "") {
      alert(weightPerUnitValidator);
      return;
    }

    setLoading(true);
    var currentUser = await Auth.currentUserInfo();
    var owner = currentUser.username;
    var data;
    var location = "India";
    var pinCode = "123456";

    data = {
      owner: owner,
      productName: newProductName,
      productType: newProductType.value,
      unit: unit.value,
      height: height,
      width: width,
      length: length,
      weightPerUnit: weightPerUnit,
      location: location,
      categories: categories,
      measurable: switchToggler,
      density: density,
      pincode: pinCode,
    };

    const payload = {
      body: data,
    };
    API.post("GoFlexeOrderPlacement", `/inventory`, payload)
      .then((response) => {
        // Add your code here
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
    console.log(data);
    setLoading(false);
    props.toggleForm();
  };

  if (loading === true) {
    return <Spinner />;
  }

  /*IF the product is measureable with length width height */
  var measureablePerUnit = (
    <React.Fragment>
      <Grid container spacing={3} style={{ padding: 50, paddingTop: 20 }}>
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            error={weightPerUnitValidator !== ""}
            helperText={
              weightPerUnitValidator === "" ? " " : weightPerUnitValidator
            }
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            id="weightPerUnit"
            name="weightPerUnit"
            label="Weight Per Unit(Kg)"
            fullWidth
            value={weightPerUnit}
            variant="outlined"
            size="small"
            // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            autoComplete="weightPerUnit"
            onChange={(event) => onWeightPerUnitChangeController(event)}
          />
        </Grid>
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            error={heightValidator !== ""}
            helperText={heightValidator === "" ? " " : heightValidator}
            id="height"
            name="height"
            label="Height"
            fullWidth
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            value={height}
            autoComplete="Height"
            variant="outlined"
            size="small"
            // style={{backgroundColor:'#fff'}}
            onChange={(event) => onHeightChangeController(event)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            error={widthValidator !== ""}
            helperText={widthValidator === "" ? " " : widthValidator}
            id="width"
            name="width"
            label="Width"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            fullWidth
            value={width}
            autoComplete="width"
            variant="outlined"
            size="small"
            // style={{backgroundColor:'#fff'}}
            onChange={(event) => onWidthChangeController(event)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            error={lengthValidator !== ""}
            helperText={lengthValidator === "" ? " " : lengthValidator}
            id="length"
            name="length"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            label="Length"
            value={length}
            fullWidth
            variant="outlined"
            size="small"
            // style={{backgroundColor:'#fff'}}
            onChange={(event) => onLengthChangeController(event)}
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
            value={unit}
            placeholder="Unit"
            onChange={(event) => unitChangeController(event)}
            options={constants.lengthDimensions}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
  // var notMeasureable = (
  //   <React.Fragment>
  //     {/*test*/}
  //     <Grid
  //       container
  //       spacing={3}
  //       style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
  //     >
  //       {/* <Grid item xs={12} sm={6}>
  //         <TextField
  //           required
  //           type="number"
  //           id="totalWeight"
  //           name="totalWeight"
  //           label="Total Weight(in Tons)"
  //           value={totalWeight}
  //           onChange={(event) => onTotalWeightChangeController(event)}
  //           fullWidth
  //         />
  //       </Grid> */}
  //       <Grid item xs={12} sm={6}>
  //         <TextField
  //           type="number"
  //           id="TotalWeight"
  //           name="TotalWeight"
  //           onInput={(e) => {
  //             e.target.value = Math.max(0, parseInt(e.target.value))
  //               .toString()
  //               .slice(0, 5);
  //           }}
  //           label="Total Weight"
  //           fullWidth
  //           value={density}
  //           variant="outlined"
  //           size="small"
  //           onChange={(event) => onDensityChangeController(event)}
  //           InputProps={{
  //             endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
  //           }}
  //         />
  //       </Grid>
  //     </Grid>
  //   </React.Fragment>
  // );
  return (
    <div style={{ overflow: "hidden" }}>
      <Typography
        fullWidth
        style={{ fontSize: 18, paddingLeft: 30 }}
        gutterBottom
      >
        Product Details
      </Typography>
      <form>
        <Grid
          container
          spacing={3}
          style={{
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 20,
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="text"
              id="productName"
              name="productName"
              label="Enter Product Name"
              value={newProductName}
              variant="outlined"
              size="small"
              // style={{backgroundColor:'#fff'}}
              onChange={(event) => onProductNameChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              styles={selectStyles}
              className="basic-single"
              classNamePrefix="select"
              onChange={(event) => handleTypeChange(event)}
              isSearchable
              name="productType"
              placeholder="Product Type"
              options={constants.typesOfProducts}
            />
          </Grid>
          {/* <Grid item xs={12} sm={8}>
            <Multiselect
              style={{
                borderLeft: "0px",
                overflow: "hidden",
                multiselectContainer: { height: "75px" },
              }}
              options={capabilityOptions.options} // Options to display in the dropdown
              onSelect={onMultiSelect} // Function will trigger on select event
              onRemove={onMultiRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              placeholder="Features(Select Many)"
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <Select
              //defaultValue={[colourOptions[2], colourOptions[3]]}
              isMulti
              styles={selectStyles}
              name="categories"
              options={constants.inventoryCategory}
              placeholder="Category(Select Multiple)"
              className="basic-multi-select"
              onChange={(event) => onCategoryChange(event)}
              classNamePrefix="select"
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          style={{
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 40,
          }}
        ></Grid>
        <IconButton
          style={{ padding: 0, marginLeft: 40, outline: "none" }}
          aria-label="expand row"
          size="small"
          onClick={() =>
            fillDimensions == true
              ? setFillDimensions(false)
              : setFillDimensions(true)
          }
        >
          Add Dimensions (optional){" "}
          {fillDimensions == true ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </IconButton>

        {fillDimensions == true ? measureablePerUnit : <br />}
        {/* <Typography className={classes.formHeadings}>Dimensions</Typography> */}
        {/* <FormControlLabel
          style={{ margin: 20 }}
          control={
            <Switch
              checked={switchToggler}
              onChange={handleSwitchTogglerChange}
              name="checkedB"
              color="primary"
            />
          }
          label="(Measureable Dimensions)"
        /> */}
        {/* <Typography
          fullWidth
          style={{ paddingTop: 30, fontSize: 17, paddingLeft: 30 }}
          gutterBottom
        >
          Dimensions
        </Typography> */}
        {/* <Grid
          component="label"
          container
          style={{
            fontSize: 14,
            marginTop: 20,
            marginBottom: 20,
            paddingLeft: 30,
          }}
          alignItems="center"
          spacing={1}
        >
          <Grid item>Total Weight</Grid>
          <Grid item>
            <AntSwitch
              checked={switchToggler}
              onChange={() => handleSwitchTogglerChange()}
              name="checkedC"
            />
          </Grid>
          <Grid item>No. Of Units</Grid>
        </Grid> */}

        <Button
          onClick={submit}
          className="row AllButtons"
          variant="contained"
          style={{
            float: "right",

            marginBottom: "10px",
          }}
        >
          Submit
        </Button>
        <Button
          onClick={() => props.toggleForm()}
          className="row"
          variant="contained"
          color="default"
          style={{
            float: "right",
            marginRight: "10px",
            marginBottom: "50px",
          }}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};
export default AddProductForm;
