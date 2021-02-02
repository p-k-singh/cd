import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import {
    TextField,
    Grid,
    InputAdornment
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
    },
    formControl: {
        marginTop:'1%'
    }
});

const ProductDetails = (props) => {
    const classes = useStyles();

    //State Variables for form fields

    /*const [name, setName] = useState('');
    const [phoneNumber, setphoneNumber] = useState(0);
    const [email, setemail] = useState('');
    const [companyName, setcompanyName] = useState('');*/

    const onNameChangeController=(event)=>{
        var nameOfCustomer=event.target.value;
        props.setName(nameOfCustomer);
    }
    const onPhoneChangeController=(event)=>{
        var numberOfPhone=event.target.value;
        props.setPhoneDispatcher(numberOfPhone);
    }

    const onEmailChangeController=(event)=>{
        var emailAddress=event.target.value;
        props.setEmailDispatcher(emailAddress);
    }

    const onCompanyNameChangeController=(event)=>{
        var nameOfCompany=event.target.value;
        props.setCompanyNameDispatcher(nameOfCompany);
    }

    
    
    return (
        <CardContent style={{ padding: 0 }}>
            <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                Customer Details
            </Typography>
            <form>
                <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    id="Name"
                    name="Name"
                    label="Name"
                    fullWidth
                    value={props.name}
                    autoComplete="given-name"
                    onChange={(event)=>onNameChangeController(event)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    type="number"
                    id="Phone"
                    name="Phone"
                    label="Phone Number"
                    fullWidth
                    value={props.phone}
                    autoComplete="Phone"
                    onChange={(event)=>onPhoneChangeController(event)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                    }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    value={props.email}
                    autoComplete="email"
                    onChange={(event)=>onEmailChangeController(event)}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                    id="company name"
                    name="company name"
                    label="Company Name"
                    fullWidth
                    value={props.companyName}
                    onChange={(event)=>onCompanyNameChangeController(event)}
                    autoComplete="shipping company name"
                    />
                </Grid>
                
                </Grid>
                           
                
            </form>
        </CardContent>
    )
}

const mapStateToProps=state=>{
    return{
        name:state.order.name,
        pickupAddress:state.order.pickupAddress,
        pickupPin:state.order.pickupPin,
        destinationAddress:state.order.destinationAddress,
        destinationPin:state.order.destinationPin,
        height:state.order.height,
        width:state.order.width,
        length:state.order.length,
        noOfUnits:state.order.noOfUnits,
        weightPerUnit:state.order.weightPerUnit,
        unit:state.order.unit,
        phone:state.order.phone,
        email:state.order.email,
        companyName:state.order.companyName
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        setName:(name)=>dispatch(actions.setCustomerName(name)),
        setEmailDispatcher:(email)=>dispatch(actions.setEmail(email)),
        setPhoneDispatcher:(phone)=>dispatch(actions.setPhoneNumber(phone)),
        setCompanyNameDispatcher:(compName)=>dispatch(actions.setCompanyName(compName))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails);
