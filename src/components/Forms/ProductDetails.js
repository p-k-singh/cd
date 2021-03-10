// import React,{useState} from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import InputLabel from '@material-ui/core/InputLabel';
// import Select from '@material-ui/core/Select';
// import {connect} from 'react-redux';
// import * as actions from '../../store/actions/index';
// import constants from '../../Constants/constants'

// import {
//     TextField,
//     Grid,
//     InputAdornment,
//     FormControl,
//     FormControlLabel,
//     Checkbox,
//     Switch
// } from '@material-ui/core';
// const useStyles = makeStyles(theme => ({
//     root: {
//         // minWidth: 275,
//     },
//     title: {
//         fontSize: 20,
//         height: 50,
//         padding: 10,
//         paddingLeft: 55,
//         borderBottomStyle:'solid',
//         borderWidth:"1px",
//         borderRadius:'5px'
//     },
//     // form: {
//     //     paddingLeft: '10%',
//     //     paddingRight: '10%',
//     //     [theme.breakpoints.down('sm')]: {
//     //         padding:'0%',
//     //     },

//     // },
//     radioButton: {
//         marginTop: '5%',
//         [theme.breakpoints.down('sm')]: {
//             margin: '10%',
//         },
//     },

//     formHeadings: {
//         margin: 20,
//         marginBottom: 0
//     },
//     formControl: {
//         margin: theme.spacing(0),
//         minWidth: 120,
//       },
//     selectEmpty: {
//         marginTop: theme.spacing(2),
//     },
// }));

// const ProductDimensions = (props) => {
//     const classes = useStyles();

//     //State Variables for form fields
//     /*const [numberOfUnits, setNumberOfUnits]=useState(0);
//     const [weightPerUnit, setWeightPerUnit]=useState(0);
//     const [unit, setUnit]=useState('');
//     const [height, setHeight]=useState(0);
//     const [width, setWidth]=useState(0);
//     const [length, setLength]=useState(0);*/
//    // const [switchToggler,setSwitchToggler] = useState(true)

//     // const handleSwitchTogglerChange = (event) => {
//     //     setSwitchToggler(!switchToggler)
//     // }

//     const onNumberOfUnitsChangeController=(event)=>{
//         var noOfUnits=event.target.value;
//         noOfUnits = noOfUnits<0?0:noOfUnits
//         props.setNoOfUnitsDispatcher(noOfUnits);
//     }

//     const onWeightPerUnitChangeController=(event)=>{
//         var perUnitWeight=event.target.value;
//         perUnitWeight = perUnitWeight<0?0:perUnitWeight
//         props.setWeightPerUnitDispatcher(perUnitWeight);
//     }

//     const onHeightChangeController=(event)=>{
//         var heightOfProduct=event.target.value;
//         heightOfProduct = heightOfProduct<0?0:heightOfProduct
//         props.setHeightDispatcher(heightOfProduct);
//     }

//     const onWidthChangeController=(event)=>{
//         var widthOfProduct=event.target.value;
//         widthOfProduct = widthOfProduct<0?0:widthOfProduct
//         props.setWidthDispatcher(widthOfProduct);
//     }
//     const onLengthChangeController=(event)=>{
//         var lengthOfProduct=event.target.value;
//         lengthOfProduct = lengthOfProduct<0?0:lengthOfProduct
//         props.setLengthDispatcher(lengthOfProduct);
//     }

//     const unitChangeController=(event)=>{
//         var unitOfProduct=event.target.value;
//         props.setUnitDispatcher(unitOfProduct);
//     }
//     const onMeasureableChangeController=()=>{
//        // alert(!props.measureable)
//        props.setMeasureable(!props.measureable)
//         // if(props.measureable==='true'){
//         //     props.setMeasureable('false')
//         // }
//         // else{
//         //     props.setMeasureable('true')
//         //     //alert(props.measureable)
//         // }
//     }
//     const onTotalWeightChangeController=(event)=>{
//         var totalWeight = event.target.value
//         props.setTotalWeight(totalWeight)
//     }
//     const onDensityChangeController=(event)=>{
//         var density = event.target.value
//         props.setDensity(density)
//     }

//     const vases = () => {
//         return(
//           <React.Fragment>
//             <Typography className={classes.formHeadings} >Value Added Services</Typography>
//               <Grid container spacing={3} style={{ padding: 50, paddingTop: 20 ,paddingBottom: 30 }}>
//                 {constants.vas.map((vas)=>{
//                   return(
//                     <Grid item xs={12} sm={4}>
//                     <FormControlLabel
//                     control={
//                       <Checkbox
//                         //checked={state.checkedB}
//                         //onChange={handleChange}
//                         name={vas.name}
//                         color="primary"
//                       />

//                     }
//                     label={vas.name}
//                   />
//                   </Grid>
//                   )
//                 })}

//             </Grid>
//           </React.Fragment>
//         )
//       }

// const Measureable = <React.Fragment>
//      <Typography className={classes.formHeadings}>Product Weight and Unit</Typography>
//                 <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             required
//                             type="number"
//                             id="units"
//                             name="units"
//                             label="No of Units"
//                             fullWidth
//                             value={props.noOfUnits}
//                             autoComplete="units"
//                             onChange={(event)=>onNumberOfUnitsChangeController(event)}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             type="number"
//                             id="weight"
//                             name="weight"
//                             label="Weight per unit"
//                             fullWidth
//                             value={props.weightPerUnit}
//                             autoComplete="Weight"
//                             onChange={(event)=>onWeightPerUnitChangeController(event)}
//                             InputProps={{
//                                 endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
//                             }}

//                         />
//                     </Grid>

//                 </Grid>
//                 <Typography className={classes.formHeadings}>Dimensions per unit</Typography>
//                 <Grid container spacing={3} style={{ padding: 30, paddingTop:10 }}>
//                     <Grid item xs={12} sm={6}>
//                             <FormControl className={classes.formControl}>
//                                 <InputLabel htmlFor="age-native-simple">Unit</InputLabel>
//                                 <Select
//                                     native
//                                     //value="inches"
//                                     onChange={unitChangeController}
//                                     inputProps={{
//                                         name: 'age',
//                                         id: 'age-native-simple',
//                                     }}
//                                 >
//                                      {constants.dimensionOptions.map((d) => <option value={d.value}>{d.name}</option>)}
//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             required
//                             type="number"
//                             id="height"
//                             name="height"
//                             label="Height"
//                             fullWidth
//                             value={props.height}
//                             autoComplete="Height"
//                             onChange={(event)=>onHeightChangeController(event)}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             type="number"
//                             id="width"
//                             name="width"
//                             label="Width"
//                             fullWidth
//                             value={props.width}
//                             autoComplete="width"
//                             onChange={(event)=>onWidthChangeController(event)}
//                         />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             required
//                             type="number"
//                             id="length"
//                             name="length"
//                             label="Length"
//                             value={props.length}
//                             fullWidth
//                             onChange={(event)=>onLengthChangeController(event)}
//                             autoComplete="Length"
//                         />
//                     </Grid>
//                 </Grid>
// </React.Fragment>

// const notMeasureable = <React.Fragment>
//     <Typography className={classes.formHeadings} >Product Details</Typography>
//     {/*test*/}
//     <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
//     <Grid item xs={12} sm={6}>
//     <TextField
//     required
//     type="number"
//     id="totalWeight"
//     name="totalWeight"
//     label="Total Weight(in Tons)"
//     value={props.totalWeight}
//     onChange={(event)=>onTotalWeightChangeController(event)}
//     fullWidth

//     />
//     </Grid>
//     <Grid item xs={12} sm={6}>
//     <TextField
//     type="number"
//     id="density"
//     name="density"
//     label="Weight per cubic meter"
//     fullWidth
//     value={props.density}
//     onChange={(event)=>onDensityChangeController(event)}
//     InputProps={{
//     endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
//     }}
//     />
//     </Grid>
// </Grid>
// </React.Fragment>

//     return (
//         <CardContent style={{ padding: 0 }}>
//             <Typography className={classes.title} gutterBottom >
//                 Product Details
//         </Typography>
//             <form className={classes.form}>
//             <FormControlLabel
//                 style={{margin:20}}
//                 control={
//                 <Switch
//                 checked={props.measureable}
//                 onChange={()=>onMeasureableChangeController()}
//                 name="checkedB"
//                 color="primary"
//                     />
//                     }
//                 label="(Measureable Dimensions)"
//             />

//             {props.measureable===true?Measureable:notMeasureable}

//                 {vases()}
//             </form>
//         </CardContent>
//     )
// }

// const mapStateToProps=state=>{
//     return{
//         height:state.order.height,
//         width:state.order.width,
//         length:state.order.length,
//         unit:state.order.unit,
//         noOfUnits:state.order.noOfUnits,
//         weightPerUnit:state.order.weightPerUnit,
//         measureable:state.order.measureable,
//         totalWeight:state.order.totalWeight,
//         density:state.order.density
//     }
//   }

//   const mapDispatchToProps=dispatch=>{
//     return {
//         setHeightDispatcher:(h)=>dispatch(actions.setHeight(h)),
//         setWidthDispatcher:(w)=>dispatch(actions.setWidth(w)),
//         setLengthDispatcher:(l)=>dispatch(actions.setLength(l)),
//         setUnitDispatcher:(unitOfMeasurement)=>dispatch(actions.setUnit(unitOfMeasurement)),
//         setNoOfUnitsDispatcher:(numberUnits)=>dispatch(actions.setNumberOfUnits(numberUnits)),
//         setWeightPerUnitDispatcher:(weightUnit)=>dispatch(actions.setWeightPerUnit(weightUnit)),
//         setMeasureable:(isMeasureable)=>dispatch(actions.setMeasureable(isMeasureable)),
//         setTotalWeight:(totalWeight)=>dispatch(actions.setTotalWeight(totalWeight)),
//         setDensity:(density)=>dispatch(actions.setDensity(density))
//     };
//   }

// export default connect(mapStateToProps,mapDispatchToProps)(ProductDimensions);
import Tooltip from "@material-ui/core/Tooltip";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import constants from "../../Constants/constants";
import DeleteIcon from "@material-ui/icons/Delete";
import Spinner from "../UI/Spinner";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InfoIcon from "@material-ui/icons/Info";
import {
  TextField,
  Grid,
  FormHelperText,
  Card,
  Checkbox,
  Button,
  IconButton,
  Divider,
  Switch,
} from "@material-ui/core";
import { Auth, API } from "aws-amplify";
import { Multiselect } from "multiselect-react-dropdown";
// import Autocomplete from "@material-ui/lab/Autocomplete";
const useStyles = makeStyles({
  root: {
    elevation: 0,
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
const ProductDetails = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [allProducts, setAllProducts] = useState([]);

  const [calculating, setCalculating] = useState(false);

  const capabilityOptions = {
    options: constants.inventoryFeatures,
  };
  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
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
                label: response[i].productName,
                value: response[i],
                isNew: false,
              });
            }
            setAllProducts(items);
            console.log(items);
            // setLoading(false)
          })
          .catch((error) => {
            console.log(error);
            // setLoading(false)
          });
      })
      .catch((err) => {
        //setLoading(false)
      });
  }, []);

  useEffect(() => {}, []);

  const handleItemDeleted = (i) => {
    var items = props.chosenProducts.slice();
    items.splice(i, 1);
    props.setChosenProducts(items);
  };
  const addproduct = () => {
    var items = props.chosenProducts.slice();
    items.push(null);
    props.setChosenProducts(items);
  };
  const onProductTypeChange = (event, i) => {
    console.log(event);
    var items = props.chosenProducts.slice();
    items[i].value.productType = event;
    props.setChosenProducts(items);
  };
  const onCategoryChange = (event, i) => {
    console.log(event);
    var items = props.chosenProducts.slice();
    items[i].value.categories = event;
    props.setChosenProducts(items);
  };
  const handleMeasurableChange = (i) => {
    var items = props.chosenProducts.slice();
    items[i].value.measurable = !items[i].value.measurable;
    props.setChosenProducts(items);
  };
  const unitChangeController = (event, i) => {
    var items = props.chosenProducts.slice();
    items[i].value.unit = event;
    props.setChosenProducts(items);
  };
  const onWeightPerUnitChangeController = (event, i) => {
    var items = props.chosenProducts.slice();
    if (event.target.value < 0) {
      items[i].value.weightPerUnit = 0;
    } else {
      items[i].value.weightPerUnit = event.target.value;
    }
    props.setChosenProducts(items);
  };
  const onHeightChangeController = (event, i) => {
    var items = props.chosenProducts.slice();
    if (event.target.value < 0) {
      items[i].value.height = 0;
    } else {
      items[i].value.height = event.target.value;
    }
    props.setChosenProducts(items);
  };
  const onWidthChangeController = (event, i) => {
    var items = props.chosenProducts.slice();
    if (event.target.value < 0) {
      items[i].value.width = 0;
    } else {
      items[i].value.width = event.target.value;
    }
    props.setChosenProducts(items);
  };
  const onLengthChangeController = (event, i) => {
    var items = props.chosenProducts.slice();
    if (event.target.value < 0) {
      items[i].value.length = 0;
    } else {
      items[i].value.length = event.target.value;
    }
    props.setChosenProducts(items);
  };
  const onDensityChangeController = (event, i) => {
    var items = props.chosenProducts.slice();
    if (event.target.value < 0) {
      items[i].value.density = 0;
    } else {
      items[i].value.density = event.target.value;
    }
    props.setChosenProducts(items);
  };

  const onNoOfUnitsChange = (event, i) => {
    var items = props.chosenProducts.slice();
    if (items[i] === null) return;
    if (event.target.value < 0) {
      items[i].noOfUnits = 0;
    } else {
      items[i].noOfUnits = event.target.value;
    }

    props.setChosenProducts(items);
  };
  const onTotalWeightChange = (event, i) => {
    var items = props.chosenProducts.slice();
    if (items[i] === null) return;
    if (event.target.value < 0) {
      items[i].totalWeight = 0;
    } else {
      items[i].totalWeight = event.target.value;
    }
    props.setChosenProducts(items);
  };
  const handlePlaceOrderClick = () => {};
  const handleChange = (newValue, i) => {
    //console.log(newValue)
    var items = props.chosenProducts.slice();
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
        };
        items[i] = temp;
      }
    }
    props.setChosenProducts(items);
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
            InputLabelProps={{ shrink: true }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            fullWidth
            value={props.chosenProducts[i].value.weightPerUnit}
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
            value={props.chosenProducts[i].value.height}
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
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            id="width"
            name="width"
            label="Width"
            fullWidth
            value={props.chosenProducts[i].value.width}
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
            value={props.chosenProducts[i].value.length}
            fullWidth
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
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
            value={props.chosenProducts[i].value.unit}
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
            label="Total Weight in Kg"
            fullWidth
            InputLabelProps={{ shrink: true }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            value={props.chosenProducts[i].totalWeight}
            onChange={(event) => onTotalWeightChange(event, i)}
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}

            // InputProps={{
            //   endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            // }}
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
        style={{
          paddingTop: 30,
        }}
      >
        <Grid item xs={12} sm={3}>
          <TextField
            type="text"
            id="weightPerunit"
            name="weightPerunit"
            label="Weight Per Unit"
            fullWidth
            disabled
            InputLabelProps={{ shrink: true }}
            value={props.chosenProducts[i].value.weightPerUnit}
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
        </Grid>
        <Grid item xs={12} sm={8}></Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="text"
            id="length"
            name="lenght"
            label="Length of a unit"
            fullWidth
            disabled
            value={props.chosenProducts[i].value.length}
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
            label="Width of a unit"
            fullWidth
            disabled
            value={props.chosenProducts[i].value.width}
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
            label="Height of a unit"
            fullWidth
            disabled
            value={props.chosenProducts[i].value.height}
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="text"
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 5);
            }}
            id="unit"
            name="unit"
            label="Unit"
            fullWidth
            disabled
            value={props.chosenProducts[i].value.unit.label}
            variant="outlined"
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
        <Grid item xs={12} sm={4}>
          <TextField
            type="text"
            id="Total Weight"
            name="Total Weight"
            label="Total Weight"
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled
            value={`${props.chosenProducts[i].totalWeight} kg`}
            variant="outlined"
            size="small"
            style={{ backgroundColor: "#fff" }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );

  var list = props.chosenProducts.map((e, i) => (
    <div
    //   style={
    //     i % 2 === 1
    //       ? { backgroundColor: "#f9f9fb" }
    //       : { backgroundColor: "#fff" }
    //   }
    >
      {i !== 0 && <Divider style={{ marginBottom: 30, marginTop: 30 }} />}
      {/* <Typography gutterBottom style={{marginLeft:30,marginBottom:30,marginTop:30}}>
            <h5>Product {i + 1}</h5> <IconButton onClick={() => handleItemDeleted(i)}>
            <DeleteIcon style={{ fontSize: "30" }} />
          </IconButton>
          </Typography> */}
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
            value={props.chosenProducts[i]}
            onChange={(newValue) => handleChange(newValue, i)}
            options={allProducts}
            placeholder="Product Name"
            styles={selectStyles}
          />
        </Grid>
        {/* Type of the product */}
        <Grid item xs={12} sm={4}>
          <Select
            styles={selectStyles}
            value={
              props.chosenProducts[i] === null ||
              props.chosenProducts[i].value.productType === null
                ? null
                : props.chosenProducts[i].value.productType
            }
            isDisabled={
              props.chosenProducts[i] === null || !props.chosenProducts[i].isNew
            }
            onChange={(event) => onProductTypeChange(event, i)}
            isSearchable
            placeholder="Product Type"
            name="color"
            options={constants.typesOfProducts}
          />
        </Grid>
        {props.chosenProducts[i] === null ||
        props.chosenProducts[i].value.measurable ? (
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              size="small"
              id="outlined-basic"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 5);
              }}
              label="No. of units"
              variant="outlined"
              value={
                props.chosenProducts[i] === null
                  ? 0
                  : props.chosenProducts[i].noOfUnits
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
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 5);
              }}
              id="outlined-basic"
              label="Total Weight"
              variant="outlined"
              value={props.chosenProducts[i].totalWeight}
              onChange={(event) => onTotalWeightChange(event, i)}
            /> */}
          </Grid>
        )}
        <Grid item xs={12} sm={12}>
          <Select
            fullWidth
            //defaultValue={[colourOptions[2], colourOptions[3]]}
            isMulti
            styles={selectStyles}
            name="categories"
            value={
              props.chosenProducts[i] === null ||
              props.chosenProducts[i].value.categories === null
                ? null
                : props.chosenProducts[i].value.categories
            }
            options={constants.inventoryCategory}
            placeholder="Category(Select Multiple)"
            isDisabled={
              props.chosenProducts[i] === null || !props.chosenProducts[i].isNew
            }
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
        {props.chosenProducts[i] === null ? (
          <React.Fragment></React.Fragment>
        ) : props.chosenProducts[i].isNew === true ? (
          <React.Fragment>
            {/* <FormControlLabel
                style={{ margin: 20 }}
                control={
                <Switch
                    checked={props.chosenProducts[i].value.measurable}
                    onChange={()=>handleMeasurableChange(i)}
                    name="checkedB"
                    color="primary"
                />
                }
                label="(Measureable Dimensions)"
                /> */}
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
              style={{
                fontSize: 14,
                marginTop: 20,
                marginBottom: 20,
                marginLeft: 20,
              }}
              alignItems="center"
              spacing={1}
            >
              <Grid item>Total Weight</Grid>
              <Grid item>
                <AntSwitch
                  checked={props.chosenProducts[i].value.measurable}
                  onChange={() => handleMeasurableChange(i)}
                  name="checkedC"
                />
              </Grid>
              <Grid item>No. Of Units</Grid>
            </Grid>
            {props.chosenProducts[i].value.measurable === true
              ? measureablePerUnit(i)
              : notMeasureable(i)}
          </React.Fragment>
        ) : props.chosenProducts[i].value.measurable === true ? (
          fixedMeasurable(i)
        ) : (
          fixedNotMeasurable(i)
        )}
        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </div>
  ));

  //   if (loading === true) {
  //     return (
  //       <React.Fragment>
  //         <h1>Loading your product details</h1>
  //         <Spinner />
  //       </React.Fragment>
  //     );
  //   }

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
      {/* <Card  className={classes.root}> */}
      <CardContent style={{ padding: 0 }}>
        <Typography fullWidth className={classes.title} gutterBottom>
          Product Details
        </Typography>
        <form>
          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
          ></Grid>
          {list}
          <Button
            style={{
              backgroundColor: "#f9a825",
              marginTop: 10,
              marginLeft: 30,
            }}
            onClick={() => addproduct()}
          >
            Add product
          </Button>
          <Divider style={{ margin: 20 }} />
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
    </div>
  );
};
export default ProductDetails;
