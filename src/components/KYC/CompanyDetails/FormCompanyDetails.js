import React, { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Auth, API } from "aws-amplify";
import InfoIcon from "@material-ui/icons/Info";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import "../../../Globalcss/globalcss.css";
import InputAdornment from "@material-ui/core/InputAdornment";
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

const CompanyKYC = (props) => {
  const classes = useStyles();
  const [registrationDoc, setRegistrationDoc] = useState();
  const [PhoneValidator, setPhoneValidator] = useState("");
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [myState, setMyState] = useState({
    registeredName: "",
    registeredAddress: "",
    registeredEmail: "",
    registeredContactNo: "",
  });
  const fieldsChange = (event) => {
    var count = 0,
      temp = event.target.value;
    while (temp > 0) {
      count++;
      temp = Math.floor(temp / 10);
    }
    if (event.target.name == "phone" || count > 10) {
      setPhoneValidator("Phone Number cannot exceed 10 Digits");
    } else {
      setPhoneValidator("");
    }
    if (event.target.name == "phone" || event.target.value < 0) {
      event.target.value = 0;
    }
    setMyState({ ...myState, [event.target.name]: event.target.value });
  };
  const submitKYC = () => {
    if (PhoneValidator !== "") {
      return;
    }
    if (
      myState.registeredName == "" ||
      myState.registeredAddress == "" ||
      myState.registeredEmail == "" ||
      myState.registeredContactNo == ""
    ) {
      alert("Company Details cannot be blank");
      return;
    }
    if (registrationDoc == "" || registrationDoc == null) {
      alert(" Please upload the Registration Certificate");
      return;
    }
    setSubmit(true);
    var docLink;
    const metaData = {
      contentType: registrationDoc.type,
    };
    const payload = {
      body: {
        contentType: registrationDoc.type,
        metaData: metaData,
      },
    };
    var ext = registrationDoc.name.split(".").pop();
    API.post(
      "GoFlexeOrderPlacement",
      "/kyc/document?type=" + "customer",
      payload
    )
      .then((initiateResult) => {
        docLink = `uploads/kycdocuments/customer/${initiateResult.fileId}.${ext}`;
        axios
          .put(initiateResult.s3PutObjectUrl, registrationDoc, {
            headers: {
              "Content-Type": registrationDoc.type,
            },
          })
          .then((resp) => {
            Auth.currentUserInfo()
              .then((userDetails) => {
                const payload = {
                  body: {
                    id: userDetails.username,
                    type: "customer",
                    kycInformation: {
                      companyInfo: {
                        registeredName: myState.registeredName,
                        registeredAddress: myState.registeredAddress,
                        registeredEmail: myState.registeredEmail,
                        registeredContactNo: myState.registeredContactNo,
                        registrationDocLink: docLink,
                      },
                    },
                  },
                };
                API.post(
                  "GoFlexeOrderPlacement",
                  "/kyc/info?type=" + "customer",
                  payload
                )
                  .then((resp) => {
                    console.log(resp);
                    fun();
                  })
                  .catch((err) => {
                    console.log(err);
                    setSubmit(false);
                  });
              })
              .catch((err) => {
                console.log(err);
                setSubmit(false);
              });
          })
          .catch((err) => {
            console.log(err);
            setSubmit(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
      });
  };
  const fun = () => {
    //alert(JSON.stringify(props))
    props.loadData();
  };
  const onRegistrationProofChange = (event) => {
    setRegistrationDoc(event.target.files[0]);
  };
  if (loading === true) {
    return <Spinner />;
  }

  return (
    <div style={{ overflow: "hidden" }}>
      {/* <Typography fullWidth className={classes.title} gutterBottom style={{ backgroundColor: '#66bb6a' }}>
                            Pending KYC
                        </Typography> */}
      <form>
        {/* <Typography className={classes.formHeadings} >Company Details</Typography> */}
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              id="registeredName"
              name="registeredName"
              label="Registered Name"
              value={myState.registeredName}
              onChange={(event) => fieldsChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              id="registeredAddress"
              name="registeredAddress"
              label="Registered Address"
              value={myState.registeredAddress}
              onChange={(event) => fieldsChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="email"
              id="registeredEmail"
              name="registeredEmail"
              label="Offcial Email Id"
              value={myState.registeredEmail}
              onChange={(event) => fieldsChange(event)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              id="registeredContactNo"
              name="registeredContactNo"
              label="Contact number"
              value={myState.registeredContactNo}
              error={PhoneValidator !== ""}
              helperText={PhoneValidator === "" ? "" : PhoneValidator}
              onChange={(event) => fieldsChange(event)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>

          <Typography className={classes.formHeadings}>
            Documents Upload
          </Typography>
          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
          >
            <Grid item xs={12}>
              <Tooltip title="Upload registeration certificate">
                <InfoIcon style={{ color: "lightgrey" }} fontSize="small" />
              </Tooltip>{" "}
              <label>Registration Proof: </label>
              <input
                style={{ marginLeft: "15px" }}
                type="file"
                onChange={(event) => onRegistrationProofChange(event)}
              />
            </Grid>
          </Grid>
        </Grid>
 {submit == true ? (
          <Spinner />
        ) : (
        <Button
          onClick={submitKYC}
          className="row AllButtons"
          variant="contained"
          style={{ float: "right", marginBottom: "10px" }}
        >
          Next
        </Button>)}
      </form>
    </div>
  );
};
export default CompanyKYC;
