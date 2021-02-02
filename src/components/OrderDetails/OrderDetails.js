import React from 'react'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/constants';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../UI/Spinner'
import {
    Grid,
    Card,
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
const OrderDetails = (props) => {
    const classes=useStyles();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today =yyyy +'-'+mm+'-'+dd ;
    console.log(props)
    if(props===null || props.value===null)
    return(
        <Spinner />
    )
    return (
        <Card className={classes.root}>
            <CardContent style={{ padding: 0,marginTop:10 }}>
                                <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                    Order Details
                                </Typography>
                                <table>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Order Date :</th>
                                                <td>{today}</td>
                                            </tr>
                                        </Grid>
                                        
                                        
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.pickupAddress+" : "}</th>
                                                <td>{props.value.fromAddress},{props.value.fromPin}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.destinationAddress+" : "}</th>
                                                <td>{props.value.toAddress},{props.value.toPin}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.noOfUnits+" : "}</th>
                                                <td>{props.value.noOfUnits}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.weightPerUnit+" : "}</th>
                                                <td>{props.value.weightPerUnit}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row">{constants.DimensionPerUnit+" : "}</th>
                                                <td>{props.value.width} x {props.value.breadth} x {props.value.height} {props.value.unit} </td>
                                            </tr>
                                        </Grid>

                                    </Grid>
                                </table>
                </CardContent>
            </Card>
                    
    )
}
export default OrderDetails
