import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Button,
  Breadcrumbs,
  IconButton
} from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
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
  const [newProductType, setNewProductType] = useState(
    constants.productTypeMap[props.row.productType]
  );
  const [unit, setUnit] = useState(constants.dimensionsMap[props.row.unit]);
  const [height, setHeight] = useState(props.row.height);
  const [width, setWidth] = useState(props.row.width);
  const [length, setLength] = useState(props.row.length);
  const [weightPerUnit, setWeightPerunit] = useState(props.row.weightPerUnit);
  const [loading, setLoading] = useState(false);
  const [lengthValidator, setLengthValidator] = useState("");
  const [widthValidator, setWidthValidator] = useState("");
  const [heightValidator, setHeightValidator] = useState("");
  const [weightPerUnitValidator, setWeightPerUnitValidator] = useState("");
  const [fillDimensions, setFillDimensions] = useState(false);
  const [categories, setCategories] = useState(props.row.categories);

  //  useEffect(() => {
  //    alert(props.row.productId);
  //      }, []);
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
    setUnit(event)
  };
  const onProductNameChange = (event) => {
    setNewProductName(event.target.value);
  };
  const handleTypeChange = (event) => {
    setNewProductType(event);
  };
  const onCategoryChange = (event) => {
    setCategories(event);
  };
  const onWeightPerUnitChangeController = (event) => {
    if (event.target.value < 0) {
      setWeightPerUnitValidator("Weight Per unit cannot be negative");
    } else {
      setWeightPerUnitValidator("");
    }
    setWeightPerunit(event.target.value);
  };

  const submitProducts = async () => {
    if (newProductName == "") {
      alert("Product Name can't be empty");
      return;
    }
    if (categories == null || categories == "") {
      alert("Product Category can't be empty");
      return;
    }
    if (fillDimensions == true){
      if (
        weightPerUnit == null ||
        weightPerUnit == "" ||
        height == null ||
        height == "" ||
        length == null ||
        length == "" ||
        width == null ||
        width == ""
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
      
    }

    setLoading(true);
    var currentUser = await Auth.currentUserInfo();
    var owner = currentUser.username;
    var data;

    data = {
      owner: owner,
      productId: props.row.productId,
      productName: newProductName,
      productType: newProductType.value,
      unit: unit.value,
      height: height,
      width: width,
      length: length,
      weightPerUnit: weightPerUnit,
      location: "-",
      categories: categories,
      measurable: true,
      pincode: "-",
    };
    const payload = {
      body: data,
    };
    API.put("GoFlexeOrderPlacement", `/inventory`, payload).catch((error) => {
      console.log(error);
    });
    setLoading(false);
    props.editButtonClicked();
  };

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
            onChange={(event) => onLengthChangeController(event)}
            autoComplete="Length"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Select
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
              className="basic-single"
              classNamePrefix="select"
              value={newProductType}
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
              name="categories"
              options={constants.inventoryCategory}
              value={categories}
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

        <Button
          onClick={submitProducts}
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
