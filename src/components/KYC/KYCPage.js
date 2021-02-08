import React, { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Auth, API } from "aws-amplify";
import axios from "axios";
import { TextField, Grid, Button } from "@material-ui/core";
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
  const [report, setReport] = useState(null);
  const [pan, setPan] = useState();
  const [accountHolderName, setAccountHolderName] = useState();
  const [accountNumber, setAccountNumber] = useState();
  const [ifscCode, setIfscCode] = useState();
  const [panProof, setPanProof] = useState();
  const [panLink, setPanLink] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadsDone, setUploadsDone] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    setReport({
      status: "pending",
      gstin: "",
      pan: "",
    });
  }, []);

  async function uploadPan() {
    const metaData = {
      contentType: panProof.type,
    };
    const payload = {
      body: {
        contentType: panProof.type,
        metaData: metaData,
      },
    };
    var initiateResult;
    try {
      initiateResult = await API.post(
        "GoFlexeOrderPlacement",
        "/kyc/document?type=" + "customer",
        payload
      );
      axios
        .put(initiateResult.s3PutObjectUrl, panProof, {
          headers: {
            "Content-Type": panProof.type,
          },
        })
        .then((resp) => {
          console.log(resp);
          setPanLink(
            `uploads/kycdocuments/${initiateResult.fileId}.${panProof.type}`
          );
        })
        .catch((err) => {
          console.log(err);
          setUploadsDone(false);
        });
    } catch (err) {
      setPanLink(`fake/link/sinceDocUploadHasfailed`);
      console.log(err);
    }
  }

  const submitKYC = async () => {
    // alert(pan+accountHolderName+accountNumber+ifscCode+panProof.name)
    // setLoading(true)
    await uploadPan();

    if (uploadsDone === false) {
      alert("Please Try Again");
      return;
    }
    const userDetails = await Auth.currentUserInfo();
    const payload = {
      body: {
        id: userDetails.username,
        type: "customer",
        kycInformation: {
          pan: pan,
          accountHolderName: accountHolderName,
          ifscCode: ifscCode,
          panLink: panLink,
          accountNumber: accountNumber,
        },
      },
    };
    await API.post("GoFlexeOrderPlacement", "/kyc/info", payload)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));

    alert("Submitted Successfully");
    setLoading(false);
  };

  const onPanChange = (event) => {
    setPan(event.target.value);
  };
  const onPanProofChange = (event) => {
    setPanProof(event.target.files[0]);
  };
  const onAccountHolderNameChange = (event) => {
    setAccountHolderName(event.target.value);
  };
  const onAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };
  const onIfscCodeChange = (event) => {
    setIfscCode(event.target.value);
  };
  if (report === null) {
    return <Spinner />;
  }
  if (report.status !== "pending") {
    return (
      <div>
        <Typography
          fullWidth
          className={classes.title}
          gutterBottom
          style={{ backgroundColor: "#66bb6a" }}
        >
          No Pending KYC
        </Typography>
      </div>
    );
  }
  if (report.status === "pending") {
    return (
      <div style={{ overflow: "hidden" }}>
        <Typography
          fullWidth
          className={classes.title}
          gutterBottom
          style={{ backgroundColor: "#66bb6a" }}
        >
          Pending KYC
        </Typography>
        <form>
          <Typography className={classes.formHeadings}>PAN Details</Typography>

          {/*test*/}
          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                required
                type="text"
                id="pan"
                name="pan"
                label="Enter PAN"
                fullWidth
                value={pan}
                onChange={(event) => onPanChange(event)}
              />
            </Grid>
          </Grid>
          <Typography className={classes.formHeadings}>
            Account Details
          </Typography>
          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                id="accountHolderName"
                name="accountHolderName"
                label="Account Holder's Name"
                fullWidth
                value={accountHolderName}
                onChange={(event) => onAccountHolderNameChange(event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                id="accountNumber"
                name="accountNumber"
                label="Account Number"
                fullWidth
                value={accountNumber}
                onChange={(event) => onAccountNumberChange(event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                id="ifscCode"
                name="ifscCode"
                label="IFSC Code"
                fullWidth
                value={ifscCode}
                onChange={(event) => onIfscCodeChange(event)}
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Typography className={classes.formHeadings}>
              Documents Upload
            </Typography>
            <Grid
              container
              spacing={3}
              style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
            >
              <Grid item xs={12}>
                <label>Pan Proof: </label>
                <input
                  style={{ marginLeft: "15px" }}
                  type="file"
                  onChange={(event) => onPanProofChange(event)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Button
            onClick={submitKYC}
            className="row"
            variant="contained"
            style={{
              float: "right",
              backgroundColor: "#f9a825",
              marginBottom: "10px",
            }}
          >
            Submit KYC
          </Button>
        </form>
      </div>
    );
  }
};
export default CompanyKYC;
