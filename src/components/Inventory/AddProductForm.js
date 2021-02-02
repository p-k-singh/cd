import React,{useState} from 'react'
/// /inventory      get(id,owner,type)
// /pricing get(length,width,height,toPin,fromPin,weightPerUnit,measureable=true/false,other)
import {
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Button,
    Select
  } from '@material-ui/core'
import {Auth,API} from 'aws-amplify'
import Spinner from '../UI/Spinner'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Multiselect } from 'multiselect-react-dropdown';
import constants from '../../Constants/constants'
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
    },
    container :{
        justifyContent: 'space-between',
        flexDirection: 'column',
        display: 'flex'
    },
    btnHolder: {
        justifyContent: 'flex-end',
        display: 'flex',
        marginRight:'30px',
        marginBottom:'30px'
      }
});

const AddProductForm = (props) => {
    const classes = useStyles()
    const [newProductName,setNewProductName] = useState('');
    const [newProductType,setNewProductType] = useState('');
    const [unit,setUnit] = useState('centimeters');
    const [height,setHeight] = useState()
    const [width,setWidth] = useState()
    const [length,setLength] = useState()
    const [weightPerUnit,setWeightPerunit] = useState()
    const [location,setLocation] = useState()
    const [features,setFeatures] = useState([])
    const [loading,setLoading] = useState(false)
    const capabilityOptions = {
        options: constants.inventoryFeatures
   
    }
    const onMultiSelect = (selectedList, selectedItem) => {
        // selectedList.map((select) => alert(select.name))
        setFeatures(selectedList)
    }
    const onMultiRemove = (selectedList, removedItem) => {
        // alert(selectedList)
        setFeatures(selectedList)
    }
    const onHeightChangeController = (event) => {
        setHeight(event.target.value)
    }
    const onWidthChangeController = (event) => {
        setWidth(event.target.value)
    }
    const onLengthChangeController = (event) => {
        setLength(event.target.value)
    }
    const unitChangeController = (event) => {
        setUnit(event.target.value)
    }
    const onProductNameChange = (event) => {
        setNewProductName(event.target.value)
    }
    const onProductTypeChange = (event) => {
        setNewProductType(event.target.value)
    }
    const onWeightPerUnitChangeController = (event) => {
        setWeightPerunit(event.target.value)
    }
    const onLocationChangeController = (event) => {
        setLocation(event.target.value)
    }
    const submitTruck = async () => {
        setLoading(true)
        var currentUser = await Auth.currentUserInfo()
        var owner=currentUser.username
        const data={
            owner:owner,
            productName: newProductName,
            productType: newProductType,
            unit: unit,
            height: height,
            width: width,
            length:length,
            weightPerUnit: weightPerUnit,
            location: location,
            features: features
        }
        const payload = {
            body: data
        }
        API
        .post("GoFlexeOrderPlacement", `/inventory`, payload)
        .then(response => {
            // Add your code here
            console.log(response);
            setLoading(false)
        })
        .catch(error => {
            console.log(error.response);
            setLoading(false)
        });
       console.log(data)
        setLoading(false)
        props.toggleForm()
    }
   
    if(loading===true){
        return(
            <Spinner />
        )
    }

    return(
        <div style={{overflow:'hidden'}} >
        <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                    Product Details               
        </Typography>         
                <form>
        <Grid container spacing={3} style={{ paddingLeft: 50,paddingRight:50, paddingTop: 10 }}>
            
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
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={8}>
                <Multiselect
               
                style={{borderLeft:'0px',overflow:'hidden', multiselectContainer:{height:'75px'} }}
                    options={capabilityOptions.options} // Options to display in the dropdown
                    onSelect={onMultiSelect} // Function will trigger on select event
                    onRemove={onMultiRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    placeholder="Features(Select Many)"
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
            <Typography className={classes.formHeadings}>Other Details</Typography>
            <Grid container spacing={3} style={{ padding: 50, paddingTop:10 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="number"
                        id="weightPerUnit"
                        name="weightPerUnit"
                        label="Weight Per Unit(in Kg)"
                        fullWidth
                        value={weightPerUnit}
                        autoComplete="weightPerUnit"
                        onChange={(event)=>onWeightPerUnitChangeController(event)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="text"
                        id="location"
                        name="location"
                        label="Location"
                        value={location}
                        fullWidth
                        onChange={(event)=>onLocationChangeController(event)}
                        autoComplete="Location"
                    />
                </Grid>
            </Grid> 
        
        <Button 
            onClick={submitTruck}
            className="row"
            variant='contained' style={{float:'right',backgroundColor:'#f9a825', marginBottom:'10px'}}
    >Submit</Button>
<Button 
            onClick={() => props.toggleForm()}
            className="row"
            variant='contained' color='default' style={{float:'right',marginRight:'10px', marginBottom:'10px'}}
    >Cancel</Button>
</form>

    </div>
    )
}
export default AddProductForm