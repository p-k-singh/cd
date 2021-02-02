import React,{useState,useEffect} from 'react'
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import constants from '../../Constants/constants';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../UI/Spinner'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


import {API,Auth} from 'aws-amplify'
import {
    Grid,
    Card,
  } from '@material-ui/core'


  const useStyles = makeStyles((theme) => ({
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
    proot: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 200,
      },
      listSection: {
        backgroundColor: 'inherit',
      },
      ul: {
        backgroundColor: 'inherit',
        padding: 0,
      },
}));

const Complete = (props) => {
    const classes = useStyles()
    const [allDetails,setAllDetails] = useState(null)
    console.log(props.orderId)
    useEffect(async ()=>{
        var currentUser = await Auth.currentUserInfo()
        API
        .get("GoFlexeOrderPlacement", `/combinedview?orderId=${props.orderId}`)
        .then(resp=>{
            console.log(resp)
            setAllDetails(resp)
        })
        
    },[])
    if(allDetails===null){
        return(
            <Spinner />
        )
    }
    return(
        <React.Fragment>
            {allDetails.broadcastOrderData.length>0 && <Card className={classes.root}>
            <CardContent style={{ padding: 0,marginTop:10 }}>
                                <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                    Broadcast Details
                                </Typography>
                                <table>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        
                                        
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row"> Broadcast Order Id :</th>
                                                <td>{allDetails.broadcastOrderData[0].broadcastOrderId}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Customer OrderId :</th>
                                                <td>{allDetails.broadcastOrderData[0].customerOrderId}</td>
                                            </tr>
                                        </Grid>
                                        {/* <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Receipients:</th>
                                                <td>{
                                                        allDetails.broadcastOrderData[0].receipients.map((rec,idx) =>{
                                                            return('('+idx+')'+rec.userName)
                                                        })
                                                    }</td>
                                            </tr>
                                        </Grid> */}
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Status :</th>
                                                <td>{allDetails.broadcastOrderData[0].status}</td>
                                            </tr>
                                        </Grid>
                                        
                                        <Grid item xs={12} sm={6}>
                                        <List className={classes.proot} subheader={<li />}>
                                            {
                                                <li key='receipients' className={classes.listSection}>
                                                <ul className={classes.ul}>
                                                    <ListSubheader>{`Broadcast Reciepients`}</ListSubheader>
                                                    {allDetails.broadcastOrderData[0].receipients.map((item,idx) => (
                                                    <ListItem key={`item--${idx}`}>
                                                        <ListItemText primary={`${idx+1})${item.userName}`} />
                                                    </ListItem>
                                                    ))}
                                                </ul>
                                                </li>
                                            }
                                            </List>
                                        </Grid>
                                        
                                        
                                        
                                    </Grid>
                                </table>
                </CardContent>
            </Card>}
            {allDetails.serviceOrderData.length>0 && <Card className={classes.root}>
            <CardContent style={{ padding: 0,marginTop:10 }}>
                                <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                    Service Provider Details
                                </Typography>
                                <table>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row"> Service Order Id :</th>
                                                <td>{allDetails.serviceOrderData[0].ServiceOrderId}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Customer OrderId :</th>
                                                <td>{allDetails.serviceOrderData[0].customerOrderId}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Display Id:</th>
                                                <td>{allDetails.serviceOrderData[0].displayId}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Service Provider Id :</th>
                                                <td>{allDetails.serviceOrderData[0].serviceProviderId}</td>
                                            </tr>
                                        </Grid>
                                     
                                    </Grid>
                                </table>
                </CardContent>
            </Card>}
        <Card className={classes.root}>
            <CardContent style={{ padding: 0,marginTop:10 }}>
                                <Typography className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                                    Order Details
                                </Typography>
                                <table>
                                    <Grid container spacing={3} style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}>
                                        
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Order Id :</th>
                                                <td>{allDetails.customerOrderData[0].OrderId}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Customer Email :</th>
                                                <td>{allDetails.customerOrderData[0].customerEmail}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Expected Delivery date :</th>
                                                <td>{allDetails.customerOrderData[0].deliveryDate}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <tr>
                                                <th scope="row">Order date:</th>
                                                <td>{allDetails.customerOrderData[0].orderDate}</td>
                                            </tr>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <tr>
                                                <th scope="row"></th>
                                                <td></td>
                                            </tr>
                                        </Grid>
                                        
                                        
                                        
                                    </Grid>
                                </table>
                </CardContent>
            </Card>
            </React.Fragment>
    )
}
export default Complete;