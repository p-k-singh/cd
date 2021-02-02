import React,{useEffect, useState} from 'react'
import Spinner from '../../UI/Spinner'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import {Auth,API} from 'aws-amplify'
// import axios from 'axios'
import {Link} from 'react-router-dom'
import {
    TextField,
    Grid,
    Button,
    Breadcrumbs
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


const CompanyKYC = (props) => {
   
    const classes = useStyles()
    const [aadharDoc,setAadharDoc] = useState()

    const submitKYC =  () => {
        
    }
    const fun = (page) => {
        //alert(JSON.stringify(props))
        props.changePage(page)
    }
    const onAadharProofChange = (event) => {
        setAadharDoc(event.target.files[0])
    }
    
        return(
            <div style={{overflow:'hidden'}} >
                <Breadcrumbs style={{marginBottom:'10px'}} aria-label="breadcrumb">
        <Link color="inherit" onClick={() => fun('')}>
            KYC
        </Link>
            <Typography color="textPrimary">Basic Info KYC</Typography>
    </Breadcrumbs>
                <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                            Pending KYC
                        </Typography>
                        <form>
                          
                <Typography className={classes.formHeadings} >Personal Details</Typography>
                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                    
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="text"
                            id="name"
                            name="name"
                            label="Enter Your Name"
                            fullWidth                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            id="phone"
                            name="phone"
                            label="Phone Number"
                            fullWidth                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="email"
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth                            
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="number"
                            id="aadhar"
                            name="aadhar"
                            label="Aadhar number"
                            fullWidth                            
                        />
                    </Grid>
                    
                    <Typography className={classes.formHeadings} >Documents Upload</Typography>
                        <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                         <Grid item xs={12} >
                        <label>Aadhar Proof: </label>
                        <input   style={{marginLeft:'15px'}} type="file" onChange={(event) => onAadharProofChange(event)}  /> 
                        </Grid>
                        
                        </Grid>


                    </Grid>                    
                
                <Button 
                    onClick={submitKYC}
                    className="row"
                    variant='contained' style={{float:'right',backgroundColor:'#f9a825', marginBottom:'10px'}}
            >Submit KYC</Button>
            
            
        </form>
            </div>
        );
    
}
export default CompanyKYC