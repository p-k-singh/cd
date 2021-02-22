import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import OrderDetails from "./OrderDetails/OrderDetails";
import CompleteDetails from "./OrderDetails/CompleteDetails";
import PaymentIndex from "./Payments/PaymentIndex";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Details(props, id) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(props);
  //console.log('addresss'+props.fromAddress);
  return (
    <div className={classes.root}>
      <AppBar style={{ background: "#fff", color: "black" }} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Product Details" {...a11yProps(0)} />
          <Tab label="Payment details" {...a11yProps(1)} />
          <Tab label="Tracking Details" {...a11yProps(2)} />
          <Tab label="Complete Details" {...a11yProps(3)} />
          <Tab label="Audit" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <OrderDetails value={props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PaymentIndex orderId={id} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Pricing
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CompleteDetails orderId={id} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Audit
      </TabPanel>
    </div>
  );
}

const Home = (props) => {
  // const [id,setId] = useState(0);
  const [allDetails, setAllDetails] = useState(null);
  const [paramsId, setParamsId] = useState();
  useEffect(() => {
    const {
      match: { params },
    } = props;
    console.log(params.id);
    setParamsId(params.id);

    // setId(params.id);
    const url =
      "https://t2v0d33au7.execute-api.ap-south-1.amazonaws.com/Staging01/customerorder/" +
      params.id;
    //console.log(url);
    axios
      .get(url)
      .then((resp) => {
        console.log(resp.data.Item);
        setAllDetails(resp.data.Item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>{Details(allDetails, paramsId)}</div>;
};

export default Home;
