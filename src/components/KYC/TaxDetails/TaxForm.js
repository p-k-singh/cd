import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Auth, API } from "aws-amplify";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import Spinner from "../../UI/Spinner";
import "../../../Globalcss/globalcss.css";
import InfoIcon from "@material-ui/icons/Info";
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
  const [panDoc, setPanDoc] = useState();
  const [gstDoc, setGSTDoc] = useState();
  const [PanValidator, setPanValidator] = useState("");
  const [GstValidator, setGstValidator] = useState("");
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [myState, setMyState] = useState({
    pan: "",
    gstin: "",
  });
  const fieldsChange = (event) => {
    setPanValidator("");
    setGstValidator("");
    if (event.target.name == "pan" && event.target.value.length < 10) {
      setPanValidator("PAN Number should be of 10 Digits");
    }
    if (event.target.name == "gstin" && event.target.value.length < 15) {
      setGstValidator("Gst Number should be of 15 Digits");
    }
    setMyState({ ...myState, [event.target.name]: event.target.value });
  };
  const submitKYC = () => {
    if (PanValidator !== "" || GstValidator !== "") {
      return;
    }

    if (myState.pan == "") {
      setPanValidator("PAN Details cannot be empty");
      return;
    }
    if (myState.gstin == "") {
      setGstValidator("GSTIN cannot be empty");
      return;
    }

    if (panDoc == null || panDoc == "") {
      alert(" Please upload your PAN Proof");
      return;
    }
    if (gstDoc == null || panDoc == "") {
      alert(" Please upload your GSTIN Proof");
      return;
    }

    setSubmit(true);
    var panLink, gstinLink;
    const metaData = {
      contentType: panDoc.type,
    };
    const payload = {
      body: {
        contentType: panDoc.type,
        metaData: metaData,
      },
    };
    var ext = panDoc.name.split(".").pop();
    API.post(
      "GoFlexeOrderPlacement",
      "/kyc/document?type=" + "customer",
      payload
    )
      .then((initiateResult) => {
        panLink = `uploads/kycdocuments/customer/${initiateResult.fileId}.${ext}`;
        axios
          .put(initiateResult.s3PutObjectUrl, panDoc, {
            headers: {
              "Content-Type": panDoc.type,
            },
          })
          .then((resp) => {
            const metaData = {
              contentType: gstDoc.type,
            };
            const payload = {
              body: {
                contentType: gstDoc.type,
                metaData: metaData,
              },
            };
            var ext = gstDoc.name.split(".").pop();
            API.post(
              "GoFlexeOrderPlacement",
              "/kyc/document?type=" + "customer",
              payload
            )
              .then((initiateResult) => {
                gstinLink = `uploads/kycdocuments/customer/${initiateResult.fileId}.${ext}`;
                axios
                  .put(initiateResult.s3PutObjectUrl, gstDoc, {
                    headers: {
                      "Content-Type": gstDoc.type,
                    },
                  })
                  .then((res) => {
                    Auth.currentUserInfo()
                      .then((userDetails) => {
                        const payload = {
                          body: {
                            id: userDetails.username,
                            type: "customer",
                            kycInformation: {
                              taxInfo: {
                                pan: myState.pan,
                                gstin: myState.gstin,
                                panLink: panLink,
                                gstinLink: gstinLink,
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

  const onPanProofChange = (event) => {
    setPanDoc(event.target.files[0]);
  };
  const onGSTINProofChange = (event) => {
    setGSTDoc(event.target.files[0]);
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
        {/* <Typography className={classes.formHeadings} >Tax Details</Typography> */}
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
              error={PanValidator !== ""}
              helperText={PanValidator === "" ? "" : PanValidator}
              value={myState.pan}
              onChange={(event) => fieldsChange(event)}
              label="Enter PAN Details"
              fullWidth
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="text"
              id="gstin"
              name="gstin"
              error={GstValidator !== ""}
              helperText={GstValidator}
              value={myState.gstin}
              inputProps={{ maxLength: 15 }}
              onChange={(event) => fieldsChange(event)}
              label="GSTIN"
              fullWidth
            />
          </Grid>
        </Grid>

        <Typography className={classes.formHeadings}>
          Documents Upload{" "}
          <Tooltip title="Upload PAN and GST copy" placement="top">
            <InfoIcon style={{ color: "lightgrey" }} fontSize="small" />
          </Tooltip>{" "}
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item xs={12}>
            <label>PAN Proof: </label>
            <input
              style={{ marginLeft: "15px" }}
              type="file"
              onChange={(event) => onPanProofChange(event)}
            />
          </Grid>
          <Grid item xs={12}>
            <label>GSTIN: </label>
            <input
              style={{ marginLeft: "15px" }}
              type="file"
              onChange={(event) => onGSTINProofChange(event)}
            />
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
          </Button>
        )}
      </form>
    </div>
  );
};
export default CompanyKYC;
