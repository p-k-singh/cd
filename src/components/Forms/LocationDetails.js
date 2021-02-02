import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import constants from '../../Constants/constants'
import {
  TextField,
  Grid, FormControl,
  InputLabel,
  Select,
  TextareaAutosize
} from '@material-ui/core'
const useStyles = makeStyles({
  root: {
    // minWidth: 275,
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

const BuyerDetails = (props) => {
  
  const classes = useStyles();
  const [pickupZipValidator,setPickupZipValidator] = useState('');
  const [deliverZipValidator,setDeliverZipValidator] = useState('');
  const [pickupDateValidator,setPickupDateValidator] = useState('');
  const [deliveryDateValidator,setDeliveryDateValidator] = useState('')

  useEffect(()=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today =yyyy +'-'+mm+'-'+dd ;

    props.setPickupDateDispatcher(today)
    props.setDeliveryDateDispatcher(today)
  },[])
  const onPickupChangeController=(event)=>{
      var pickupAddress=event.target.value;
      props.setPickupAddressDispatcher(pickupAddress)
  }
  const onPickupDateChangeController=(event)=>{
    var pickupDate=event.target.value;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    dd=parseInt(dd,10)
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    mm=parseInt(mm,10)
    var yyyy = today.getFullYear();
    yyyy=parseInt(yyyy,10)
    //console.log(pickupDate)
    var year = parseInt(pickupDate.substring(0,4),10)
    var month = parseInt(pickupDate.substring(5,7),10)
    var date = parseInt(pickupDate.substring(8,10),10)
    //console.log(year+''+month+''+date)
    var invalid = 0;
    if(year<yyyy || year>9999){
      invalid = 1;
    }
    if(year===yyyy){
      if(month<mm){
        invalid = 1
      }
      else{
        if(month===mm){
          if(date<dd){
            invalid=1;
          }
        }
      }
    }
    if(invalid===1)
      setPickupDateValidator('Invalid Date')
    else
      setPickupDateValidator('')
    props.setPickupDateDispatcher(pickupDate)
    
}

const onDeliveryDateChangeController = (event) => {
  var deliverDate=event.target.value;
  var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    dd=parseInt(dd,10)
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    mm=parseInt(mm,10)
    var yyyy = today.getFullYear();
    yyyy=parseInt(yyyy,10)
    //console.log(pickupDate)
    var year = parseInt(deliverDate.substring(0,4),10)
    var month = parseInt(deliverDate.substring(5,7),10)
    var date = parseInt(deliverDate.substring(8,10),10)
    //console.log(year+''+month+''+date)
    var invalid = 0;
    if(year<yyyy || year>9999){
      invalid = 1;
    }
    if(year===yyyy){
      if(month<mm){
        invalid = 1
      }
      else{
        if(month===mm){
          if(date<dd){
            invalid=1;
          }
        }
      }
    }
    if(invalid===1)
    setDeliveryDateValidator('Invalid Date')
    else
    setDeliveryDateValidator('')
  props.setDeliveryDateDispatcher(event.target.value)
}
  const onPickupZipChangeController=(event)=>{
      var pickupPinCode=parseInt(event.target.value,10);
      if(pickupPinCode<0){
        setPickupZipValidator('Cannot be a negative value')
        props.setPickupPinDispatcher(pickupPinCode);
        return
      }
      else{
        setPickupZipValidator('')
      }
      var count=0,temp=pickupPinCode
      while(temp>0){
        count++;
        temp=Math.floor(temp/10)
      }
      if(count!==6){
        setPickupZipValidator('Must be of six digits')
      }
      else{
        setPickupZipValidator('')
      }
      props.setPickupPinDispatcher(pickupPinCode);
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
    props.setDestinationPinDispatcher(destinationPinCode);
}
  const onDestinationChangeController=(event)=>{
      var destinationAddress=event.target.value;
      props.setDestinationAddressDispatcher(destinationAddress);
  }

  
  const onTimeSlotChangeController = (event) => {
    props.setPickupSlotDispatcher(event.target.value)
  }
  const onAdditionalNoteChangeController = (event) => {
    props.setAdditionalNoteDispatcher(event.target.value)
  }
  return (
    <CardContent style={{ padding: 0 }}>
      <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
        Location Details
        </Typography>
      <form>
        <Typography className={classes.formHeadings} >Location Preference</Typography>

        <Grid container 
         spacing={3} style={{ paddingLeft:20, paddingTop: 20 ,paddingBottom: 30 }}
        >

          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="pickupaddress"
              name="pickupaddress"
              label="Pick up address"
              fullWidth
              value={props.pickupAddress}
              onChange={(event)=>onPickupChangeController(event)}
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
          <TextField
              required
              error={pickupZipValidator !== ''}
              helperText={pickupZipValidator === '' ? ' ' : pickupZipValidator}
              type="number"
              id="pickupzip"
              name="pickupzip"
              label="Pickup Zip"
              fullWidth
              value={props.pickupPin}
              onChange={(event)=>onPickupZipChangeController(event)}
              autoComplete="Pickup postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              error={pickupDateValidator !== ''}
              helperText={pickupDateValidator === '' ? ' ' : pickupDateValidator}
              id="pickupdate"
              name="pickupdate"
             label='Pickup Date(dd/mm/yyyy)'
              fullWidth
              type='date'
              // defaultValue='2021-01-01'
              value={props.pickupDate}
              onChange={(event)=>onPickupDateChangeController(event)}
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Pickup Slot</InputLabel>
                                <Select
                                    native
                                    value={props.pickupSlot}
                                    onChange={(event) => onTimeSlotChangeController(event)}
                                    inputProps={{
                                        name: 'age',
                                        id: 'age-native-simple',
                                    }}
                                >
                                    {constants.timeSlots.map((d) => <option value={d.value}>{d.name}</option>)}
                                    
                                </Select>
                            </FormControl>
                        </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              id="destinationaddress"
              name="destinationaddress"
              label="Destination address"
              fullWidth
              value={props.destinationAddress}
              onChange={(event)=>onDestinationChangeController(event)}
              autoComplete="shipping address-line2"
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
               required
               error={deliverZipValidator !== ''}
              helperText={deliverZipValidator === '' ? ' ' : deliverZipValidator}
               type="number"
               id="destinationzip"
               name="destinationzip"
               label="Destination Zip"
               fullWidth
               value={props.destinationPin}
               onChange={(event)=>onDestinationZipChangeController(event)}
               autoComplete="Destination postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              error={deliveryDateValidator !== ''}
              helperText={deliveryDateValidator === '' ? ' ' : deliveryDateValidator}
              id="deliverydate"
              name="deliverydate"
              label='Desired Delivery date'
              fullWidth
              type='date'
              value={props.deliveryDate}
              onChange={(event)=>onDeliveryDateChangeController(event)}
              autoComplete="shipping address-line1"
            />
          </Grid>
        </Grid>
        <Typography className={classes.formHeadings} >Additional Note</Typography>

        <Grid container  spacing={3} style={{ padding:50, paddingTop: 20 ,paddingBottom: 30 }}>
        <TextareaAutosize style={{minWidth:400}} 
        aria-label="minimum height"
        value={props.additionalNote}
        onChange={(event) => onAdditionalNoteChangeController(event)}
         rowsMin={6} rowsMax={12} 
        placeholder="Share if Any..." 
        />
        </Grid>
      </form>
    </CardContent>
  )
}

const mapStateToProps=state=>{
  return{
    pickupAddress:state.order.pickupAddress,
    pickupPin:state.order.pickupPin,
    destinationAddress:state.order.destinationAddress,
    destinationPin:state.order.destinationPin,
    pickupDate:state.order.pickupDate,
    deliveryDate:state.order.deliveryDate,
    pickupSlot:state.order.pickupSlot,
    additionalNote:state.order.additionalNote
  }
}

const mapDispatchToProps=dispatch=>{
  return {
      setPickupAddressDispatcher:(pAddress)=>dispatch(actions.setPickupAddress(pAddress)),
      setDestinationAddressDispatcher:(dAddress)=>dispatch(actions.setDestinationAddress(dAddress)),
      setPickupPinDispatcher:(pPin)=>dispatch(actions.setPickupPin(pPin)),
      setDestinationPinDispatcher:(dPin)=>dispatch(actions.setDestinationPin(dPin)),
      setPickupDateDispatcher:(pdate)=>dispatch(actions.setPickupDate(pdate)),
      setDeliveryDateDispatcher:(ddate)=>dispatch(actions.setDeliveryDate(ddate)),
      setPickupSlotDispatcher:(slot)=>dispatch(actions.setPickupSlot(slot)),
      setAdditionalNoteDispatcher:(note)=>dispatch(actions.setAdditionalNote(note))
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(BuyerDetails);
