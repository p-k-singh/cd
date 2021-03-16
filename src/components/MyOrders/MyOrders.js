/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import "./MyOrders.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TodayIcon from "@material-ui/icons/Today";
import Typography from "@material-ui/core/Typography";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ClassTwoToneIcon from "@material-ui/icons/ClassTwoTone";
import Spinner from "../UI/Spinner";
import { API, Auth } from "aws-amplify";
import CardContent from "@material-ui/core/CardContent";
import { Grid, Card } from "@material-ui/core";

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;

const useStyles = makeStyles((theme) => ({
  "@keyframes blinker": {
    from: { opacity: 1 },
    to: { opacity: 0.2, color: "#3f51b5", fontWeight: "400" },
  },
  button: {
    marginBottom: theme.spacing(1),
  },
  allocationButton: {
    animationName: "$blinker",
    animationDuration: "0.7s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
  },

  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    borderBottomStyle: "solid",
    borderWidth: "1px",
  },
}));

const MyOrders = () => {
  const classes = useStyles();
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    var currentUser = await Auth.currentUserInfo();
    var currentUsername = currentUser.username;
    console.log(currentUsername);
    // var temp = await API.get("GoFlexeOrderPlacement",`/serviceorder?username=${currentUsername}`);
    var temp = await API.get(
      "GoFlexeOrderPlacement",
      `/customerorder/customer/${currentUsername}`
    );
    console.log(temp);

     var i;
      var tempTaskName = "";
     for (i = 0; i < temp.length; i++) {
       await API.get(
         "GoFlexeOrderPlacement",
         `/tracking?type=getProcessByCustomerOrderId&customerOrderId=${temp[i].OrderId}`
       // eslint-disable-next-line no-loop-func
       ).then((resp) => {
         console.log(resp);
         if(resp!== null){
           if(resp.stages !== null){
             resp.stages.forEach((stage) => {
               stage.tasks.forEach((task) => {
                 if (task.status == "PENDING") {
                   tempTaskName = task.name;
                   return;
                 }
               });
             });
           }  }
       });
       temp[i].currentTaskName = tempTaskName;
     }
   
console.log(temp)
    setActiveOrders(temp);
    setLoading(false);
  }, []);

  let orderList = (
    <section className="">
      {activeOrders.map((eachOrder) => (
        <div>
          <Card
            style={{
              margin: 0,
              marginTop: 20,
            }}
          >
            <CardContent
              style={{
                marginTop: 0,
                padding: 16,
              }}
            >
              <Grid container spacing={0}>
                <Grid item xs={2}>
                  <figure
                    style={{
                      marginTop: 0,
                      marginBottom: 0,
                      padding: 10,
                    }}
                  >
                    <img
                      alt="truck"
                      src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iNTEyIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDBiNTljIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOWNmZmFjIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjMwMSIgeDI9IjMwMSIgeTE9IjI3MSIgeTI9IjYxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNjM2ZmZTgiLz48c3RvcCBvZmZzZXQ9Ii45OTczIiBzdG9wLWNvbG9yPSIjZjBmZmY0Ii8+PC9saW5lYXJHcmFkaWVudD48Zz48cGF0aCBkPSJtNTA4Ljk5MyAxNTYuOTkxYy0yLjgzMy0zLjc3Mi03LjI3Ni01Ljk5MS0xMS45OTMtNS45OTFoLTEwNy4yNTdjLTcuMTYzLTQyLjUxMS00NC4yMjctNzUtODguNzQzLTc1cy04MS41OCAzMi40ODktODguNzQzIDc1aC05My4yMzVsLTE5LjYtMTM4LjEwN2MtMS4wNDktNy4zOTYtNy4zOC0xMi44OTMtMTQuODUxLTEyLjg5M2gtNjkuNTcxYy04LjI4NCAwLTE1IDYuNzE2LTE1IDE1czYuNzE2IDE1IDE1IDE1aDU2LjU1bDE5LjU5OSAxMzguMTA0di4wMDEuMDAzbDIyLjY0MyAxNTkuNDk5YzIuNDU3IDE3LjE5NyAxMC44MiAzMi45NzggMjMuNTk4IDQ0LjY4NC0xMC4wMDQgOC4yNi0xNi4zOSAyMC43NTMtMTYuMzkgMzQuNzA5IDAgMjAuNzIzIDE0LjA4NSAzOC4yMDkgMzMuMTgxIDQzLjQxNC0yLjA0NSA1LjEzNy0zLjE4MSAxMC43My0zLjE4MSAxNi41ODYgMCAyNC44MTMgMjAuMTg3IDQ1IDQ1IDQ1czQ1LTIwLjE4NyA0NS00NWMwLTUuMjU4LS45MTUtMTAuMzA1LTIuNTgtMTVoMTI1LjE2Yy0xLjY2NSA0LjY5NS0yLjU4IDkuNzQyLTIuNTggMTUgMCAyNC44MTMgMjAuMTg3IDQ1IDQ1IDQ1czQ1LTIwLjE4NyA0NS00NS0yMC4xODctNDUtNDUtNDVoLTI0MGMtOC4yNzEgMC0xNS02LjcyOS0xNS0xNXM2LjcyOS0xNSAxNS0xNWgyMjQuNzQyYzMzLjMwOSAwIDYyLjk2My0yMi4zNjggNzIuMDk4LTU0LjMzOWw0OC41NjctMTY3LjQ4M2MxLjMxMy00LjUzMS40MTktOS40MTYtMi40MTQtMTMuMTg3eiIgZmlsbD0idXJsKCNTVkdJRF8xXykiLz48Zz48Zz48cGF0aCBkPSJtMzAxIDYxYy01Ny44OTcgMC0xMDUgNDcuMTAzLTEwNSAxMDVzNDcuMTAzIDEwNSAxMDUgMTA1IDEwNS00Ny4xMDMgMTA1LTEwNS00Ny4xMDMtMTA1LTEwNS0xMDV6bTQwLjYwNiAxMDAuNjA3LTQ1IDQ1Yy0yLjkyOCAyLjkyOS02Ljc2NyA0LjM5My0xMC42MDYgNC4zOTNzLTcuNjc4LTEuNDY0LTEwLjYwNi00LjM5NGwtMTUtMTVjLTUuODU4LTUuODU4LTUuODU4LTE1LjM1NSAwLTIxLjIxMyA1Ljg1Ny01Ljg1OCAxNS4zNTUtNS44NTggMjEuMjEzIDBsNC4zOTQgNC4zOTMgMzQuMzk0LTM0LjM5M2M1Ljg1Ny01Ljg1OCAxNS4zNTUtNS44NTggMjEuMjEzIDAgNS44NTcgNS44NTkgNS44NTcgMTUuMzU2LS4wMDIgMjEuMjE0eiIgZmlsbD0idXJsKCNTVkdJRF8yXykiLz48L2c+PC9nPjwvZz48L3N2Zz4="
                    />
                  </figure>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    marginTop: 15,
                    marginBottom: 20,
                  }}
                >
                  <Grid container spacing={0}>
                    <Grid item sm={6} xs={6} style={{}}>
                      <h6
                        style={{
                          marginBottom: 25,
                          marginRight: 40,
                        }}
                      >
                        Name : <span>{eachOrder.items[0].productName}</span>
                      </h6>
                    </Grid>
                    <Grid itemsm={12} xs={6}>
                      <h6>Type : {eachOrder.items[0].productType}</h6>
                    </Grid>
                    <Grid itemsm={12} xs={6}>
                      <h6>
                        Order Date : <span>{eachOrder.pickupDate}</span>
                      </h6>
                    </Grid>
                    <Grid itemsm={12} xs={6}>
                      <h6>
                        Total Amount : ₹
                         {Math.round(Number(eachOrder.estimatedPrice))}
                      </h6>
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid
                  item
                  xs={3}
                  style={{
                    marginTop: 15,
                    marginBottom: 20,
                  }}
                >
                  <h6
                    style={{
                      marginBottom: 25,
                    }}
                  > */}
                {/* date in dd/mm/yyyy format */}
                {/* var today = new Date(eachOrder.pickupdate); 
                    var dd = today.getDate(); var mm = today.getMonth()+1; //January is 0! var yyyy = today.getFullYear(); if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} var today = dd+'/'+mm+'/'+yyyy; document.getElementById("DATE").value = today; */}
                {/* Order Date : <span>{eachOrder.pickupdate}</span>
                  </h6>
                  <h6>Total Amount : {Math.floor(Math.random() * 100000)}</h6>
                </Grid> */}
                <Grid itemsm={12} xs={3}>
                  <Grid container spacing={0}>
                    <Grid item sm={12} xs={5}></Grid>
                    <Grid item sm={12} xs={6}>
                      <Button
                        style={{
                          maxWidth: "150px",
                          minWidth: "150px",
                          maxHeight: "50px",
                          marginTop: 5,
                          marginBottom: 7,
                        }}
                        component={Link}
                        to={`/tracking/${eachOrder.OrderId}`}
                        variant="contained"
                        color="default"
                        //   className={classes.allocationButton}
                        startIcon={<LocalShippingIcon />}
                      >
                        Track
                        {/* {eachOrder.currentTaskName !== null ||
                          eachOrder.currentTaskName !== "" ? eachOrder.currentTaskName:"Waiting For Allocation"} */}
                      </Button>
                      <Button
                        style={{
                          minWidth: "150px",
                          maxWidth: "150px",
                          maxHeight: "50px",
                          marginTop: 7,
                          marginBottom: 5,
                        }}
                        component={Link}
                        to={`order/${eachOrder.OrderId}`}
                        variant="contained"
                        color="default"
                        // className={classes.allocationButton}
                        startIcon={<ClassTwoToneIcon />}
                      >
                        Details
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      ))}
    </section>
  );

  if (loading === true) {
    orderList = (
      <div style={{ marginTop: "100px" }}>
        <Spinner />
      </div>
    );
  }

  if (activeOrders == "") {
    if (loading === true) {
      return (
        <div>
          <Typography className={classes.title} gutterBottom>
            My Active Orders
          </Typography>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div>
          <Typography className={classes.title} gutterBottom>
            My Active Orders
          </Typography>

          <Typography
            style={{ fontSize: 20, height: 50, padding: 10, paddingLeft: 55 }}
          >
            No Orders to Show, Try Placing a New order
          </Typography>
        </div>
      );
    }
  } else {
    return (
      <div>
        <Typography className={classes.title} gutterBottom>
          My Active Orders
        </Typography>

        {orderList}
      </div>
    ); //  block of code to be executed if the condition is false
  }
};

export default MyOrders;
