import React, { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Auth, API } from "aws-amplify";
import "../../../Globalcss/globalcss.css";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField, Grid, Button, Breadcrumbs } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
    color: "white",
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
});

const AccountInfoForm = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [myState, setMyState] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
  });
  const submitKYC = () => {
    if (myState.accountHolderName == "") {
      alert("Account Holder's Name cannot be empty");
      return;
    }
    if (myState.accountNumber == "") {
      alert("Account Number cannot be empty");
      return;
    }
    if (myState.ifscCode == "") {
      alert("IFS code cannot be empty");
      return;
    }

    setLoading(true);
    Auth.currentUserInfo()
      .then((userDetails) => {
        const payload = {
          body: {
            id: userDetails.username,
            type: "customer",
            kycInformation: {
              accountInfo: {
                accountHolderName: myState.accountHolderName,
                accountNumber: myState.accountNumber,
                ifscCode: myState.ifscCode,
              },
            },
          },
        };
        API.post(
          "GoFlexeOrderPlacement",
          "/kyc/info?type=" + "customer",
          payload
        )
          .then((resp) => console.log(resp))
          .catch((err) => console.log(err));

        fun();
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  const fun = () => {
    //alert(JSON.stringify(props))
    props.loadData();
  };
  const fieldsChange = (event) => {
    setMyState({ ...myState, [event.target.name]: event.target.value });
  };
  if (loading === true) {
    return <Spinner />;
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <form>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          {/* <Grid item xs={12} sm={12}>
            <Typography className={classes.formHeadings} fullWidth>
              Company Details=
            </Typography>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              id="accountHolderName"
              name="accountHolderName"
              value={myState.accountHolderName}
              onChange={(event) => fieldsChange(event)}
              label="Account Holder's Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              id="accountNumber"
              inputProps={{ maxLength: 18 }}
              name="accountNumber"
              label="Account Number"
              value={myState.accountNumber}
              onChange={(event) => fieldsChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              inputProps={{ maxLength: 11 }}
              id="ifscCode"
              name="ifscCode"
              value={myState.ifscCode}
              onChange={(event) => fieldsChange(event)}
              label="IFSC Code"
              fullWidth
            />
          </Grid>
        </Grid>

        <Button
          onClick={submitKYC}
          className="row AllButtons"
          variant="contained"
          style={{ float: "right", marginBottom: "10px" }}
        >
          Submit KYC
        </Button>
      </form>
    </div>
  );
};
export default AccountInfoForm;
