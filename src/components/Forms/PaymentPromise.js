import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Select from "react-select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InfoIcon from "@material-ui/icons/Info";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import {
  TextField,
  Grid,
  FormHelperText,
  Card,
  Checkbox,
  Button,
  IconButton,
  Divider,
  Switch,
} from "@material-ui/core";
import constants from "../../Constants/constants";
import {
  InputLabel,
  Select as MaterialSelect,
  TextareaAutosize,
} from "@material-ui/core";
const useStyles = makeStyles({
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
});

const PaymentPromise = (props) => {
  const useStyles = makeStyles({
    root: {
      elevation: 0,
      // minHeight:900
    },
    title: {
      fontSize: 20,
      height: 50,
      padding: 10,
      paddingLeft: 55,
      borderBottomStyle: "solid",
      borderWidth: "1px",
    },
    formHeadings: {
      margin: 20,
      marginBottom: 0,
    },
    formControl: {
      marginTop: "1%",
      width: "50%",
    },
  });
  const classes = useStyles();
  const [paymentOption, setPaymentOption] = useState("fullPayment");
  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
    //alert(event.target.value);
  };

  return (
    <CardContent>
      <Typography className={classes.title}>Value Added Services</Typography>
      <Grid
        container
        spacing={3}
        style={{ padding: 50, paddingTop: 20, paddingBottom: 30 }}
      >
        {constants.vas.map((vas) => {
          return (
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
          );
        })}
      </Grid>
      <CardContent style={{ padding: 10 }}>
        <Typography fullWidth className={classes.title} gutterBottom>
          Payments
        </Typography>
        <form style={{ padding: 10 }}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              style={{ width: "auto" }}
              aria-label="position"
              name="position"
              onChange={(event) => handlePaymentOptionChange(event)}
              value={paymentOption}
            >
              <FormLabel component="legend">
                Choose your payment Promise:
              </FormLabel>
              <Grid
                container
                spacing={0}
                style={{ padding: 20, paddingBottom: 30 }}
              >
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    value="ImmediatePayment"
                    control={<Radio color="primary" />}
                    label="Immediate Payment"
                  />
                  {paymentOption === "ImmediatePayment" && (
                    <FormHelperText>
                      For Immediate Payment, We will do negotitation on your
                      behalf to give you a discounted price.
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    value="30DaysCycle"
                    control={<Radio color="primary" />}
                    label="30 Days Cycle"
                  />
                  {paymentOption === "30DaysCycle" && (
                    <FormHelperText>Pay in 30 Days.</FormHelperText>
                  )}
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </form>
      </CardContent>
    </CardContent>
  );
};

export default PaymentPromise;
