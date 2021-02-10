import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import constants from "../../Constants/constants";
import DeleteIcon from "@material-ui/icons/Delete";
import Spinner from "../UI/Spinner";
import {
  TextField,
  Grid,
  Card,
  Button,
  IconButton,
  Divider,
} from "@material-ui/core";
import { Multiselect } from "multiselect-react-dropdown";
import Autocomplete from "@material-ui/lab/Autocomplete";
const useStyles = makeStyles({
  root: {},
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
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

const ProductDetails = (props) => {
  const classes = useStyles();
  const [products, setproducts] = useState([]);

  const [loading, setLoading] = useState("true");

  const capabilityOptions = {
    options: constants.inventoryFeatures,
  };
  const [myproducts, setMyproducts] = useState([]);

  useEffect(() => {}, []);
  useEffect(() => {
    var sum = 0;
    for (var i = 0; i < products.length; i++) {
      if (products[i].details !== null)
        sum += Number(products[i].details.capacity);
    }
  }, [products]);

  const submitButtonHandler = () => {};
  const onproductNumberChanged = (event, value, reason, i) => {
    var items = products.slice();
    items[i].details = value;
    if (value !== null)
      for (var j = 0; j < myproducts.length; j++) {
        if (value.productNumber === myproducts[j].productNumber) {
          items[i].category = myproducts[j].category;
          break;
        }
      }
    else {
      items[i].category = [];
    }
    setproducts(items);
    for (i = 0; i < items.length; i++) {
      if (items[i].details !== null)
        console.log(i + items[i].details.productNumber);
    }
  };
  const onDriverChanged = (event, value, reason, i) => {
    var items = products.slice();
    items[i].details = value;
    if (value !== null) {
      for (var j = 0; j < myproducts.length; j++) {
        if (value.name === myproducts[j].name) {
          items[i].quantity = myproducts[j].quantity;
          break;
        }
      }
    } else {
      items[i].quantity = "";
    }
    setproducts(items);
  };
  const onMultiSelect = (selectedList, selectedItem, i) => {
    var items = products.slice();
    items[i].category = selectedList;
    setproducts(items);
  };
  const onMultiRemove = (selectedList, removedItem, i) => {
    var items = products.slice();
    items[i].category = selectedList;
    setproducts(items);
  };
  const handleItemDeleted = (i) => {
    var items = products.slice();
    items.splice(i, 1);
    setproducts(items);
    var items1 = products.slice();
    items1.splice(i, 1);
    setproducts(items);
    setproducts(items1);
  };
  const addproduct = () => {
    var items1 = products.slice();
    var items2 = products.slice();
    items1.push({
      details: null,
      category: [],
    });
    items2.push({
      details: null,
      quantity: "",
    });
    setproducts(items1);
    setproducts(items2);
  };
  const onquantityChangeController = (event, i) => {
    var items = products.slice();
    items[i].quantity = event.target.value;
    setproducts(items);
  };

  var list = products.map((e, i) => (
    <div
      style={
        i % 2 === 1
          ? { backgroundColor: "#f9f9fb" }
          : { backgroundColor: "#fff" }
      }
    >
      <Divider style={{ marginBottom: 30, marginTop: 30 }} />

      <Grid container spacing={4} style={{ paddingLeft: 50 }}>
        <Grid item xs={12} sm={12}>
          <Typography gutterBottom>
            <h5>Product {i + 1}</h5>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            id={`combo-box-demo${i}`}
            options={myproducts}
            getOptionLabel={(option) =>
              option.productNumber + `(${option.capacity}tons)`
            }
            value={products[i].details}
            onChange={(event, value, reason) =>
              onproductNumberChanged(event, value, reason, i)
            }
            getOptionSelected={(option, value) =>
              option.productNumber === value.productNumber
            }
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Product Name" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Multiselect
            style={{
              searchBox: { minHeight: "55px" },
              multiselectContainer: { height: "80px" },
            }}
            selectedValues={products[i].category} // Preselected value to persist in dropdown
            options={capabilityOptions.options} // Options to display in the dropdown
            onSelect={(list, item) => onMultiSelect(list, item, i)} // Function will trigger on select event
            onRemove={(list, item) => onMultiRemove(list, item, i)} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            placeholder="Select Category"
          />
        </Grid>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            id={`productsList${i}`}
            options={myproducts}
            getOptionLabel={(option) => option.name}
            value={products[i].details}
            onChange={(event, value, reason) =>
              onDriverChanged(event, value, reason, i)
            }
            getOptionSelected={(option, value) => option.name === value.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Product Type" variant="outlined" />
            )}
          />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            
            id="outlined-basic"
            label="Quantity/Weight"
            value={products[i].quantity}
            variant="outlined"
            onChange={(event) => onquantityChangeController(event, i)}
          />
        </Grid>

        <Grid item xs={12} sm={1}>
          <IconButton onClick={() => handleItemDeleted(i)}>
            <DeleteIcon style={{ fontSize: "30" }} />
          </IconButton>
        </Grid>
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

  return (
    <div>
      <Card className={classes.root}>
        <CardContent style={{ padding: 0 }}>
          <Typography
            fullWidth
            className={classes.title}
            gutterBottom
            style={{ backgroundColor: "#66bb6a", color: "white" }}
          >
            Product Details
          </Typography>

          <form>
            <Grid
              container
              spacing={3}
              style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
            ></Grid>

            <Button
              style={{
                backgroundColor: "#f9a825",
                marginTop: 10,
                marginLeft: 50,
              }}
              onClick={() => addproduct()}
            >
              Add product
            </Button>
            {list}
          </form>
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
            color="primary"
            onClick={submitButtonHandler}
          >
            Save
          </Button>
        </div>
      </Card>
    </div>
  );
};
export default ProductDetails;
