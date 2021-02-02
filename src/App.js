import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


import Navigation from './components/Navigation'
import Home from './components/Home'
import Form from './components/Forms/Checkout'
import RedirForm from './components/Forms/ForwardedCheckout'
import MyProfile from './components/Profile/MyProfile'
import PriceCalculator from './components/PriceCalculator'
import Success from './components/OrderStatus/orderSuccess'
import Failure from './components/OrderStatus/orderFailure'
import MyOrders from './components/MyOrders/MyOrders'
import OrderDetail from './components/OrderDetail'
import Inventory from './components/Inventory/Inventory'
import Help from './components/Help/Help'
import SignUp from './components/Auth/SignUp/signupform.js'
import Login from './components/Auth/Login/loginform'
import {connect} from 'react-redux';
import Welcome from './components/Auth/Welcome/welcomePage';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword'



import UserManager from './components/UserManager/userManager'
import ShowUser from './components/UserManager/ShowUser'
import AddUser from './components/UserManager/AddUser'
import EditUser from './components/UserManager/EditUser'
import ModifyRoleAccesses from './components/UserManager/ModifyRoleAccess'

import KYC from './components/KYC/KYCPage'
import KYCPanel from './components/KYC/KYCPanel'
import BasicInfoIndex from './components/KYC/BasicInfoKyc/BasicInfoIndex'



import Preference from './components/Preference/PreferencePage'
import { Auth ,API} from "aws-amplify";
import { useEffect, useState } from 'react';
import Spinner from './components/UI/Spinner';
import * as actions from './store/actions/index'
import { AppContext } from './libs/contextLibs'



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0,0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
}));

function App(props) {
  const classes = useStyles();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating,setIsAuthenticating] = useState(true);


  //const [data, setData] = useState([]);
  // const callAPIGateway = async () => {
  //   try{
  //   const customerEmail = "prashantkumarsingh9423@gmail.com"
  //   const result = await API.get("GoFlexeOrderPlacement", `/customerorder/customer/${customerEmail}`)
  //   console.log(result);
  //   console.log("Set data ato : ", result)
  //   const credentials = await Auth.currentCredentials();
  //   console.log(Auth.essentialCredentials(credentials))}
  //   catch(e){
  //     console.log("PKSING"+e)
  //   }
  // }

  

 
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
      const user= await Auth.currentUserInfo()
      console.log(user)
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }
  if(isAuthenticating){
    return(
      <Spinner />
    );
  }
  if(!isAuthenticated){
    return (
      <div className={classes.root}>
          <Welcome />
          <main
        className={classes.content}
      >
        <div className={classes.toolbar} />
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Switch>
          
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path='/resetPassword' component={ResetPassword} />
          <Redirect to='/signup' />
         
        </Switch>
        </AppContext.Provider>
        </main>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Navigation />
      </AppContext.Provider>
      
      <main
        className={classes.content}
      >
        <div className={classes.toolbar} />
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Switch>
          {/* Home page (DashBoard Content) */}
          <Route exact path="/" component={Home} />
          {/* Order Form */}
          <Route exact path="/orders" component={Form} />
          <Route exact path="/ordersRedir" component={RedirForm} />
          <Route exact path="/myorders" component={MyOrders} />
          <Route exact path="/orderSuccess" component={Success} />
          <Route exact path="/orderFailure" component={Failure} />
          <Route exact path="/profile" component={MyProfile} />
          <Route exact path="/inventory-manager" component={Inventory} />
          <Route exact path="/help" component={Help} />
          <Route exact path='/userManager' component={UserManager} />
          <Route exact path='/adduser' component={AddUser} />
          <Route exact path='/modifyRoleAccesses' component={ModifyRoleAccesses} />
          <Route exact path='/kyc' component={KYC} />
          <Route exact path='/kycPanel' component={KYCPanel} />
          <Route exact path='/preference' component={Preference} />
          <Route path='/order/:id' render={(props) => {
                    return ( <OrderDetail {...props } /> )
                }} />
          <Route path='/user/:id' render={(props) => {
                    return ( <ShowUser {...props } /> )
                }} />
          <Route path='/editUser/:id' render={(props) => {
                    return ( <EditUser {...props } /> )
                }} />
          {/* Price Calculator */}
          <Route exact path="/price-calculator" component={PriceCalculator} />
          <Route exact path='/resetPassword' component={ResetPassword} />
          <Redirect to='/' />
        </Switch>
        </AppContext.Provider>
      </main>
    </div>
  );
}



const mapStateToProps=state=>{
  return{
      hasLogged:state.login.hasLogged
  }
}

const mapDispatchToProps=dispatch=>{
  return {
      setLogged:(Val)=>dispatch(actions.setLoggedState(Val)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
