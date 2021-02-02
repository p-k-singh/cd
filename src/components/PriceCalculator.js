import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Spinner from './UI/Spinner';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import * as actions from '../store/actions/index';
import {connect} from 'react-redux';
import { Redirect,withRouter } from 'react-router-dom'
import constants from '../Constants/constants'
import {API} from 'aws-amplify'
import {
  TextField,
  Grid,
  Card,
  FormControl,
  FormControlLabel,
  Switch,
  InputLabel,
  Button,
  InputAdornment
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
     minWidth: 275,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    color: 'white'
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0
  }
});

const PriceCalculator = (props) => {
  const classes = useStyles();

  //State Variables for form fields
  const [height,setHeight]=useState();
  const [width,setWidth]=useState();
  const [breadth]=useState();
  const [length,setLength] = useState();
  const [pickuppin, setpickuppin] = useState();
  const [unit,setUnit]=useState('centimeters');
//   const [volWeight,setVolWeight]=useState(0);
  const [destinationpin, setdestinationpin] = useState();
  const [loader,setLoader]=useState(false);
  const [estimatedPrice,setEstimatedPrice]=useState(0);
  const [showPrice,setShowPrice]=useState(false);
  const [noOfUnits,setNoOfUnits] = useState();
  const [weightPerUnit,setWeightPerUnit] = useState();
  const [redirect,setRedirect] = useState(false);

  const [pickupZipValidator,setPickupZipValidator] = useState('');
  const [deliverZipValidator,setDeliverZipValidator] = useState('');

  const [switchToggler,setSwitchToggler] = useState(true)

  const handleSwitchTogglerChange = (event) => {
      setSwitchToggler(!switchToggler)
  }
  /*const [dis,setDis]=useState(true);
  const [validatePickupPin,setValidatePickUpPin]=useState(false);
  const [validateDestinationPin,setValidateDestinationPin]=useState(false);
  const [validateHeight,setValidateHeight]=useState(false);
  const [validateBreadth,setValidateBreadth]=useState(false);
  const [validateWidth,setValidateWidth]=useState(false);*/


/*
  function validatePIN (pin) {
    return /^(\d{4}|\d{6})$/.test(pin);
    }

  function validateDimensions(dimension)
  {
      return /^\d+(\.\d{1,2})?$/.test(dimension);
  }*/

//   function roundHalf(num) { return (Math.round(num*2)/2).toFixed(1); }

  const unitChangeController=(event)=>{
        var unitOfProduct=event.target.value;
        setUnit(unitOfProduct);
        // if(unitOfProduct==="centimeters")
        //     setVolWeight(parseFloat(width)*parseFloat(height)*parseFloat(breadth)/5000);
        // else if(unitOfProduct==="inches")
        //     setVolWeight(parseFloat(width)*parseFloat(height)*parseFloat(breadth)/138.4);
    }

  const onPickupZipChangeController=(event)=>{
    var pickupPinCode=parseInt(event.target.value,10);
    var greater = 999999,smaller = 100000;
    var check = 1;
    if(pickupPinCode<smaller || pickupPinCode>greater){
      setPickupZipValidator('Must be of 6 digits')
      check=0
    }
    if(pickupPinCode<0){
      setPickupZipValidator('Cannot be negative')
      check=0
    }
    if(check===1){
      setPickupZipValidator('')
    }
      setpickuppin(pickupPinCode);
  }

  

  const onDestinationZipChangeController=(event)=>{
    var destinationPinCode=parseInt(event.target.value,10);
    var greater = 999999,smaller = 100000;
    var check = 1;
    if(destinationPinCode<smaller || destinationPinCode>greater){
      setDeliverZipValidator('Must be of 6 digits')
      check=0
    }
    if(destinationPinCode<0){
      setDeliverZipValidator('Cannot be negative')
      check=0
    }
    if(check===1){
      setDeliverZipValidator('')
    }
    
      setdestinationpin(destinationPinCode);
  }
  
  const onHeightChangeController=(event)=>{
        var heightOfProduct=event.target.value;
        heightOfProduct = heightOfProduct<0?0:heightOfProduct
        setHeight(heightOfProduct);
        // if(unit=="centimeters")
        //     setVolWeight(parseFloat(heightOfProduct)*parseFloat(width)*parseFloat(breadth)/5000);
        // else if(unit=="inches")
        //     setVolWeight(parseFloat(heightOfProduct)*parseFloat(width)*parseFloat(breadth)/138.4);

    }

    const onWidthChangeController=(event)=>{
        var widthOfProduct=event.target.value;
        widthOfProduct = widthOfProduct<0?0:widthOfProduct
        setWidth(widthOfProduct);
        // if(unit=="centimeters")
        //     setVolWeight(parseFloat(widthOfProduct)*parseFloat(height)*parseFloat(breadth)/5000);
        // else if(unit=="inches")
        //     setVolWeight(parseFloat(widthOfProduct)*parseFloat(height)*parseFloat(breadth)/138.4);

    }
    // const onBreadthChangeController=(event)=>{
    //     var breadthOfProduct=event.target.value;
    //     setBreadth(breadthOfProduct);
    //     if(unit=="centimeters")
    //         setVolWeight(parseFloat(breadthOfProduct)*parseFloat(width)*parseFloat(height)/5000);
    //     else if(unit=='inches')
    //         setVolWeight(parseFloat(breadthOfProduct)*parseFloat(width)*parseFloat(height)/138.4);
    // }
    const handlePlaceOrderClick = () =>{
       
        props.setWidthDispatcher(width);
        props.setLengthDispatcher(length);
        props.setUnitDispatcher(unit);
        props.setNoOfUnitsDispatcher(noOfUnits);
        props.setWeightPerUnitDispatcher(weightPerUnit);
        props.setPickupPinDispatcher(pickuppin)
        props.setDestinationPinDispatcher(destinationpin)
        props.setHeightDispatcher(height);
        setRedirect(true);
    }


    const onNumberOfUnitsChangeController = (event) => {
        var no = event.target.value
        no = no<0?0:no
        setNoOfUnits(no);
    }
    const onWeightPerUnitChangeController = (event) => {
        var weight = event.target.value
        weight = weight<0?0:weight
        setWeightPerUnit(weight);
    }
    const onLengthChangeController = (event) => {
        var length = event.target.value
        length = length<0?0:length
        setLength(length);
    }


  const handleCalculateClick=()=>{
        if(deliverZipValidator!=='' || pickupZipValidator!==''){
            alert('Please Fill correct Pin Codes')
            return
        }
        setLoader(true);
      //  var params={
      //     height:height,
      //     width:width,
      //     length:length,
      //     toPin:destinationpin,
      //     fromPin:pickuppin,
      //     measureable:switchToggler
      // }
      var params =`height=${height}&width=${width}&length=${length}&toPin=${destinationpin}&fromPin=${pickuppin}&measureable=${switchToggler}`
        API
        .get("GoFlexeOrderPlacement", `/pricing?`+params)
        .then(resp=>{
          console.log(resp);
          setShowPrice(true);
          setEstimatedPrice(resp.estimatedPrice);
          setLoader(false);
      })
      .catch(err=>{
          setLoader(false);
          setShowPrice(true)
          console.log(err);
      })
        // const url='https://2n3n7swm8f.execute-api.ap-south-1.amazonaws.com/draft0/pricing'
        // axios.get(url,{
            
        // })
        // .then(resp=>{
        //     console.log(resp.data);
        //     setShowPrice(true);
        //     setEstimatedPrice(resp.data.estimatedPrice);
        //     setLoader(false);
        // })
        // .catch(err=>{
        //     setLoader(false);
        //     setShowPrice(true)
        //     console.log(err);
        // })
  }
  var measureablePerUnit = <React.Fragment>
      <Typography className={classes.formHeadings} >Product Details</Typography>
        {/*test*/}
        <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
        <Grid item xs={12} sm={6}>
        <TextField
        required
        type="number"
        id="units"
        name="units"
        label="No of Units"
        fullWidth
        value={noOfUnits}
        autoComplete="units"
        onChange={(event)=>onNumberOfUnitsChangeController(event)}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
        type="number"
        id="weight"
        name="weight"
        label="Weight per unit"
        fullWidth
        value={weightPerUnit}
        autoComplete="Weight"
        onChange={(event)=>onWeightPerUnitChangeController(event)}
        InputProps={{
        endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
        }}

        />
        </Grid>

        </Grid>
        <Typography className={classes.formHeadings}>Dimensions per unit</Typography>
        <Grid container spacing={3} style={{ padding: 50, paddingTop:10 }}>
        <Grid item xs={12} sm={6}>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Unit</InputLabel>
        <Select
            native
            //value="inches"
            onChange={unitChangeController}
            inputProps={{
                name: 'age',
                id: 'age-native-simple',
            }}
        >
            {constants.dimensionOptions.map((d) => <option value={d.value}>{d.name}</option>)}
            
        </Select>
        </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
        <TextField
        required
        type="number"
        id="height"
        name="height"
        label="Height"
        fullWidth
        value={height}
        autoComplete="Height"
        onChange={(event)=>onHeightChangeController(event)}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
        type="number"
        id="width"
        name="width"
        label="Width"
        fullWidth
        value={width}
        autoComplete="width"
        onChange={(event)=>onWidthChangeController(event)}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
        required
        type="number"
        id="length"
        name="length"
        label="Length"
        value={length}
        fullWidth
        onChange={(event)=>onLengthChangeController(event)}
        autoComplete="Length"
        />
        </Grid>
        </Grid>

  </React.Fragment>
  var notMeasureable = <React.Fragment>
  <Typography className={classes.formHeadings} >Product Details</Typography>
    {/*test*/}
    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
    <Grid item xs={12} sm={6}>
    <TextField
    required
    type="number"
    id="units"
    name="units"
    label="Total Weight(in Tons)"
    fullWidth
    
    autoComplete="units"
    />
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
    type="number"
    id="weight"
    name="weight"
    label="Weight per cubic meter"
    fullWidth
    
    autoComplete="Weight"
    InputProps={{
    endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
    }}
    />
    </Grid>
</Grid>

</React.Fragment>
    var content= <Card className={classes.root}>
                    <CardContent style={{ padding: 0 }}>
                        <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                            Price Calculator
                        </Typography>
                        <form>
                        <FormControlLabel
                            style={{margin:20}}
                            control={
                            <Switch
                                checked={switchToggler}
                                onChange={handleSwitchTogglerChange}
                                name="checkedB"
                                color="primary"
                            />
                            }
                            label="(Measureable Dimensions)"
                        />
                                
                            {switchToggler===true ? measureablePerUnit : notMeasureable}
                                        <Typography className={classes.formHeadings} >Location Details</Typography>
                                        <Grid container spacing={3} style={{ padding: 50, paddingTop: 20 ,paddingBottom: 30 }}>
                                            <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                error={pickupZipValidator !== ''}
                                                helperText={pickupZipValidator === '' ? ' ' : pickupZipValidator}
                                                type="number"
                                                id="pickupzip"
                                                name="pickupzip"
                                                label="Pickup Zip"
                                                fullWidth
                                                value={pickuppin}
                                                onChange={(event)=>onPickupZipChangeController(event)}
                                                autoComplete="Pickup postal-code"
                                                />
                                            </Grid>
                                    

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                required
                                                error={deliverZipValidator !== ''}
                                                helperText={deliverZipValidator === '' ? ' ' : deliverZipValidator}
                                                type="number"
                                                id="destinationzip"
                                                name="destinationzip"
                                                label="Destination Zip"
                                                fullWidth
                                                value={destinationpin}
                                                onChange={(event)=>onDestinationZipChangeController(event)}
                                                autoComplete="Destination postal-code"
                                                />
                                            </Grid>
                                        </Grid>
                                </form>
                    </CardContent>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            margin: 20
                        }}>
                            <Button
                            
                                    variant="contained"
                                    style={{backgroundColor:'#FF8C00'}}
                                    onClick={handleCalculateClick}
                                >
                                    Calculate
                                </Button>
                    </div>

                </Card>;
                
                if(loader===true)
                {
                    content=<div class="jumbotron text-center">
                                <p class="lead"><strong>Calculating estimated cost</strong></p>
                                <Spinner/>
                            </div>
                }

                var priceContent=null;
                if(showPrice===true)
                {
                     priceContent=
                    <Card className={classes.root}>  
                    <Grid>
                        <Button
                        sm={6}
                     style={{float:'right',marginTop:'10px',marginRight:'30px',backgroundColor:'#FF8C00'}}
                     variant="contained"
                     color="primary"
                     onClick={handlePlaceOrderClick}
                     >Place order</Button>
                        </Grid>  
                        <div
                          style={{textAlign:'center',fontSize:'18px',padding:'20px'}}
                         >Estimated price is : {estimatedPrice}</div>
                        
                    </Card>;
                   
                     
                }

    if(redirect){
        return(
            <Redirect to='/ordersRedir' />
        )
    }
  return (
    <div>
        {content}
        {priceContent}
    </div>   
  )
}
const mapStateToProps=state=>{
    return{
        height:state.order.height,
        width:state.order.width,
        length:state.order.length,
        unit:state.order.unit,
        noOfUnits:state.order.noOfUnits,
        weightPerUnit:state.order.weightPerUnit,
        pickupPin:state.order.pickupPin,
        destinationPin:state.order.destinationPin

    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return {
        setHeightDispatcher:(h)=>dispatch(actions.setHeight(h)),
        setWidthDispatcher:(w)=>dispatch(actions.setWidth(w)),
        setLengthDispatcher:(l)=>dispatch(actions.setLength(l)),
        setUnitDispatcher:(unitOfMeasurement)=>dispatch(actions.setUnit(unitOfMeasurement)),
        setNoOfUnitsDispatcher:(numberUnits)=>dispatch(actions.setNumberOfUnits(numberUnits)),
        setWeightPerUnitDispatcher:(weightUnit)=>dispatch(actions.setWeightPerUnit(weightUnit)),
        setPickupPinDispatcher:(pPin)=>dispatch(actions.setPickupPin(pPin)),
        setDestinationPinDispatcher:(dPin)=>dispatch(actions.setDestinationPin(dPin)),
    };
  }

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PriceCalculator));
