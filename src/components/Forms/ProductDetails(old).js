import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import constants from '../../Constants/constants'

import {
    TextField,
    Grid,
    InputAdornment,
    FormControl,
    FormControlLabel,
    Checkbox,
    Switch
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
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
    // form: {
    //     paddingLeft: '10%',
    //     paddingRight: '10%',
    //     [theme.breakpoints.down('sm')]: {
    //         padding:'0%',
    //     },
    
    // },
    radioButton: {
        marginTop: '5%',
        [theme.breakpoints.down('sm')]: {
            margin: '10%',
        },
    },
    
    formHeadings: {
        margin: 20,
        marginBottom: 0
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
      },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ProductDimensions = (props) => {
    const classes = useStyles();

    //State Variables for form fields
    /*const [numberOfUnits, setNumberOfUnits]=useState(0);
    const [weightPerUnit, setWeightPerUnit]=useState(0);
    const [unit, setUnit]=useState('');
    const [height, setHeight]=useState(0);
    const [width, setWidth]=useState(0);
    const [length, setLength]=useState(0);*/
   // const [switchToggler,setSwitchToggler] = useState(true)

    // const handleSwitchTogglerChange = (event) => {
    //     setSwitchToggler(!switchToggler)
    // }
    
    const onNumberOfUnitsChangeController=(event)=>{
        var noOfUnits=event.target.value;
        noOfUnits = noOfUnits<0?0:noOfUnits
        props.setNoOfUnitsDispatcher(noOfUnits);
    }

    const onWeightPerUnitChangeController=(event)=>{
        var perUnitWeight=event.target.value;
        perUnitWeight = perUnitWeight<0?0:perUnitWeight
        props.setWeightPerUnitDispatcher(perUnitWeight);
    }

    const onHeightChangeController=(event)=>{
        var heightOfProduct=event.target.value;
        heightOfProduct = heightOfProduct<0?0:heightOfProduct
        props.setHeightDispatcher(heightOfProduct);
    }

    const onWidthChangeController=(event)=>{
        var widthOfProduct=event.target.value;
        widthOfProduct = widthOfProduct<0?0:widthOfProduct
        props.setWidthDispatcher(widthOfProduct);
    }
    const onLengthChangeController=(event)=>{
        var lengthOfProduct=event.target.value;
        lengthOfProduct = lengthOfProduct<0?0:lengthOfProduct
        props.setLengthDispatcher(lengthOfProduct);
    }

    const unitChangeController=(event)=>{
        var unitOfProduct=event.target.value;
        props.setUnitDispatcher(unitOfProduct);
    }
    const onMeasureableChangeController=()=>{
       // alert(!props.measureable)
       props.setMeasureable(!props.measureable)
        // if(props.measureable==='true'){
        //     props.setMeasureable('false')
        // }
        // else{
        //     props.setMeasureable('true')
        //     //alert(props.measureable)
        // }
    }
    const onTotalWeightChangeController=(event)=>{
        var totalWeight = event.target.value
        props.setTotalWeight(totalWeight)
    }
    const onDensityChangeController=(event)=>{
        var density = event.target.value
        props.setDensity(density)
    }

    const vases = () => {
        return(
          <React.Fragment>
            <Typography className={classes.formHeadings} >Value Added Services</Typography>
              <Grid container spacing={3} style={{ padding: 50, paddingTop: 20 ,paddingBottom: 30 }}>   
                {constants.vas.map((vas)=>{
                  return(
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
                  )
                })}
                
            </Grid>
          </React.Fragment>
        )
      }
  
const Measureable = <React.Fragment>
     <Typography className={classes.formHeadings}>Product Weight and Unit</Typography>
                <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            type="number"
                            id="units"
                            name="units"
                            label="No of Units"
                            fullWidth
                            value={props.noOfUnits}
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
                            value={props.weightPerUnit}
                            autoComplete="Weight"
                            onChange={(event)=>onWeightPerUnitChangeController(event)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                            }}

                        />
                    </Grid>
                    
                </Grid>
                <Typography className={classes.formHeadings}>Dimensions per unit</Typography>
                <Grid container spacing={3} style={{ padding: 30, paddingTop:10 }}>
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
                            value={props.height}
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
                            value={props.width}
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
                            value={props.length}
                            fullWidth
                            onChange={(event)=>onLengthChangeController(event)}
                            autoComplete="Length"
                        />
                    </Grid>
                </Grid>
</React.Fragment>

const notMeasureable = <React.Fragment>
    <Typography className={classes.formHeadings} >Product Details</Typography>
    {/*test*/}
    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
    <Grid item xs={12} sm={6}>
    <TextField
    required
    type="number"
    id="totalWeight"
    name="totalWeight"
    label="Total Weight(in Tons)"
    value={props.totalWeight}
    onChange={(event)=>onTotalWeightChangeController(event)}
    fullWidth
    
    />
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
    type="number"
    id="density"
    name="density"
    label="Weight per cubic meter"
    fullWidth
    value={props.density}
    onChange={(event)=>onDensityChangeController(event)}
    InputProps={{
    endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
    }}
    />
    </Grid>
</Grid>
</React.Fragment>
    
    return (
        <CardContent style={{ padding: 0 }}>
            <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                Product Details
        </Typography>
            <form className={classes.form}>
            <FormControlLabel
                style={{margin:20}}
                control={
                <Switch
                checked={props.measureable}
                onChange={()=>onMeasureableChangeController()}
                name="checkedB"
                color="primary"
                    />
                    }
                label="(Measureable Dimensions)"
            />

            {props.measureable===true?Measureable:notMeasureable}
               
                {vases()}
            </form>
        </CardContent>
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
        measureable:state.order.measureable,
        totalWeight:state.order.totalWeight,
        density:state.order.density
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
        setMeasureable:(isMeasureable)=>dispatch(actions.setMeasureable(isMeasureable)),
        setTotalWeight:(totalWeight)=>dispatch(actions.setTotalWeight(totalWeight)),
        setDensity:(density)=>dispatch(actions.setDensity(density))
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(ProductDimensions);
