import React, { useEffect, useState } from "react";
/// /inventory      get(id,owner,type)
// /pricing get(length,width,height,toPin,fromPin,weightPerUnit,measureable=true/false,other)
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Button,
  Select,
  Breadcrumbs,
} from "@material-ui/core";
import { Auth, API } from "aws-amplify";
import Spinner from "../UI/Spinner";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Multiselect } from "multiselect-react-dropdown";
import constants from "../../Constants/constants";
import { Link } from "react-router-dom";
import "../../Globalcss/globalcss.css";
const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  // title: {
  //     fontSize: 20,
  //     height: 50,
  //     padding: 10,
  //     paddingLeft: 55,
  //     color: 'white'
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

const AddProductForm = (props) => {
  const classes = useStyles();
  const [newProductName, setNewProductName] = useState(props.row.productName);
  const [newProductType, setNewProductType] = useState(props.row.productType);
  const [unit, setUnit] = useState("centimeters");
  const [height, setHeight] = useState(props.row.height);
  const [width, setWidth] = useState(props.row.width);
  const [length, setLength] = useState(props.row.length);
  const [weightPerUnit, setWeightPerunit] = useState(props.row.weightPerUnit);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const capabilityOptions = {
    options: constants.inventoryFeatures,
  };
  const [lengthValidator, setLengthValidator] = useState("");
  const [widthValidator, setWidthValidator] = useState("");
  const [heightValidator, setHeightValidator] = useState("");
  const [weightPerUnitValidator, setWeightPerUnitValidator] = useState("");

  const onMultiSelect = (selectedList, selectedItem) => {
    // selectedList.map((select) => alert(select.name))
    setFeatures(selectedList);
  };
  const onMultiRemove = (selectedList, removedItem) => {
    // alert(selectedList)
    setFeatures(selectedList);
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
  const unitChangeController = (event) => {
    setUnit(event.target.value);
  };
  const onProductNameChange = (event) => {
    setNewProductName(event.target.value);
  };
  const onProductTypeChange = (event) => {
    setNewProductType(event.target.value);
  };
  const onWeightPerUnitChangeController = (event) => {
    if (event.target.value < 0) {
      setWeightPerUnitValidator("Weight Per unit cannot be negative");
    } else {
      setWeightPerUnitValidator("");
    }
    setWeightPerunit(event.target.value);
  };

  const submitTruck = () => {
    if (newProductName == "") {
      alert("Product Name can't be empty");
      return;
    }

    // if (features == null || features == "") {
    //   alert("Product Features can't be empty");
    //   return;
    // }
    if (
      weightPerUnit == null ||
      height == null ||
      length == null ||
      width == null
    ) {
      alert("Product Dimensions can't be empty");
      return;
    }
    if (unit === "") {
      alert("Select measurement Unit for your Product");
      return;
    }
    if (lengthValidator !== "") {
      alert(lengthValidator);
      return;
    }
     if (widthValidator !== "") {
       alert(widthValidator);
       return;
     }
      if (heightValidator !== "") {
        alert(heightValidator);
        return;
      }
       if (weightPerUnitValidator !== "") {
         alert(weightPerUnitValidator);
         return;
       }
    //   if ( density == null) {
    //     alert("Density cannot be empty");
    //     return;
    //   }

    setLoading(true);
    // alert(props.row.productType)
    const data = {
      owner: props.row.owner,
      productName: newProductName,
      productId: props.row.productId,
      productType: props.row.productType,
      unit: unit,
      height: height,
      width: width,
      length: length,
      weightPerUnit: weightPerUnit,
      location: "ok",
      features: features,
    };
    const payload = {
      body: data,
    };
    API.put("GoFlexeOrderPlacement", `/inventory?type=owner`, payload)
      .then((response) => {
        // Add your code here
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        alert("Please Try again Later");
        setLoading(false);
      });
    console.log(data);
    setLoading(false);
    props.editButtonClicked();
    // var params = `type=owner&owner=${props.row.owner}&location=${location}&productType=${newProductType}&productName=${newProductName}&productId=${props.row.productId}`
  };

  if (loading === true) {
    return <Spinner />;
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <Breadcrumbs style={{ marginBottom: "10px" }} aria-label="breadcrumb">
        <Link
          onClick={() => props.editButtonClicked()}
          color="inherit"
          to="/inventory-manager"
        >
          Inventory
        </Link>
        <Typography color="textPrimary">Edit Product</Typography>
      </Breadcrumbs>
      <Typography fullWidth className="TypographyTitle" gutterBottom>
        Edit Product
      </Typography>
      <form>
        <Grid
          container
          spacing={3}
          style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 10 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="text"
              id="productName"
              name="productName"
              label="Enter Product Name"
              value={newProductName}
              onChange={(event) => onProductNameChange(event)}
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
                <TextField
                    required
                    type="text"
                    id="productType"
                    name="productType"
                    label="Enter Product Type"
                    value={newProductType}
                    onChange={(event) => onProductTypeChange(event)}
                    fullWidth          
                />
            </Grid> */}
          <Grid item xs={12} sm={8}>
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
          </Grid>
        </Grid>

        <Typography className={classes.formHeadings}>
          Dimensions per unit
        </Typography>
        <Grid container spacing={3} style={{ padding: 50, paddingTop: 10 }}>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Unit</InputLabel>
              <Select
                native
                //value="inches"
                onChange={unitChangeController}
                inputProps={{
                  name: "age",
                  id: "age-native-simple",
                }}
              >
                {constants.dimensionOptions.map((d) => (
                  <option value={d.value}>{d.name}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              error={heightValidator !== ""}
              helperText={heightValidator === "" ? " " : heightValidator}
              required
              type="number"
              id="height"
              name="height"
              label="Height"
              fullWidth
              value={height}
              autoComplete="Height"
              onChange={(event) => onHeightChangeController(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={widthValidator !== ""}
              helperText={widthValidator === "" ? " " : widthValidator}
              type="number"
              id="width"
              name="width"
              label="Width"
              fullWidth
              value={width}
              autoComplete="width"
              onChange={(event) => onWidthChangeController(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={lengthValidator !== ""}
              helperText={lengthValidator === "" ? " " : lengthValidator}
              required
              type="number"
              id="length"
              name="length"
              label="Length"
              value={length}
              fullWidth
              onChange={(event) => onLengthChangeController(event)}
              autoComplete="Length"
            />
          </Grid>
        </Grid>
        <Typography className={classes.formHeadings}>Other Details</Typography>
        <Grid container spacing={3} style={{ padding: 50, paddingTop: 10 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={weightPerUnitValidator !== ""}
              helperText={
                weightPerUnitValidator === "" ? " " : weightPerUnitValidator
              }
              type="number"
              id="weightPerUnit"
              name="weightPerUnit"
              label="Weight Per Unit(in Kg)"
              fullWidth
              value={weightPerUnit}
              autoComplete="weightPerUnit"
              onChange={(event) => onWeightPerUnitChangeController(event)}
            />
          </Grid>
        </Grid>

        <Button
          onClick={submitTruck}
          className="row"
          variant="contained"
          style={{
            float: "right",
            backgroundColor: "#f9a825",
            marginBottom: "10px",
          }}
        >
          Submit
        </Button>
        <Button
          onClick={() => props.editButtonClicked()}
          className="row"
          variant="contained"
          color="default"
          style={{ float: "right", marginRight: "10px", marginBottom: "10px" }}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};
export default AddProductForm;
