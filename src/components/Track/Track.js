import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField, Grid, Button, TextareaAutosize } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import RadioGroup from "@material-ui/core/RadioGroup";
import Table from "@material-ui/core/Table";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Done from "@material-ui/icons/Done";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import WarningIcon from "@material-ui/icons/Warning";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import CancelIcon from "@material-ui/icons/Cancel";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Checkbox from "@material-ui/core/Checkbox";
import { API, Auth } from "aws-amplify";
import Feedback from "react-bootstrap/esm/Feedback";
import { Spinner } from "react-bootstrap";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 20,
    height: 50,
    padding: 10,
    paddingLeft: 55,
  },
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
});
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const Track = (props) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const [NewRatings, setRatings] = React.useState(false);
  const [Issue, setIssue] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);
  const [TrackingData, setTrackingData] = React.useState([]);
  let params = null;
  if (props.orderId) {
    params = {
      id: props.orderId,
    };
  } else {
    console.log(props);
    params = {
      id: props.match.params.id,
    };
  }

  const steps = getSteps();
  const [ProductDamaged, setProductDamaged] = React.useState(false);
  const [ProductPilferage, setProductPilferage] = React.useState(false);
  const [ProductSafety, setProductSafety] = React.useState(0);
  const [Safetyhover, setSafetyHover] = React.useState(-1);
  const [ShipmentTime, setShipmentTime] = React.useState(0);
  const [ShipmentTimehover, setShipmentTimeHover] = React.useState(-1);
  const [OverallExperience, setOverallExperience] = React.useState(0);
  const [OverallExperiencehover, setOverallExperienceHover] = React.useState(
    -1
  );
  const [NoOfDamagedProducts, setNoOfDamagedProducts] = React.useState("");
  const onNoOfDamagedProductsChangeController = (event) => {
    setNoOfDamagedProducts(event.target.value);
  };
  const [NoOfMissingProducts, setNoOfMissingProducts] = React.useState("");
  const onNoOfMissingProductsChangeController = (event) => {
    setNoOfMissingProducts(event.target.value);
  };
  const [Feedback, setFeedback] = React.useState("");
  const onFeedbackChangeController = (event) => {
    setFeedback(event.target.value);
  };
  const [DriverDetails, setDriverDetails] = React.useState([]);
  const [TruckNo, setTruckNo] = React.useState("");
  const [count, setCount] = useState(0);
  function FindStage(resp) {
    var temp = 0;
    var i;
    for (i = 0; i < resp.stages.length; i++) {
      if (
        resp.stages[i].status === "INACTIVE" ||
        resp.stages[i].status === "PENDING"
      ) {
        break;
      }
      temp++;
    }
    // alert(temp);
    setCount(temp);
  }

  useEffect(() => {
    console.log(props);
    getTrackingId();
  }, []);

  function getTrackingId() {
    setLoading(true);
    API.get(
      "GoFlexeOrderPlacement",
      `/tracking?type=getProcessByCustomerOrderId&customerOrderId=${params.id}`
    )
      .then((resp) => {
        console.log(resp);
        setTrackingData(resp);
        getTrackingStage(resp);
        getDriverDetails(resp);

        FindStage(resp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  const CompleteDeliveryFeeback = async () => {
    setLoading(true);
    let details = getTrackingIds(TrackingData, "CUSTOMER_FEEDBACK");
    const data = {
      trackingId: TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      status: "NEXT",
    };
    const payload = {
      body: data,
    };
    ApiRequest(payload);
    setLoading(false);
  };

  function ApiRequest(payload) {
    setLoading(true);
    API.patch(
      "GoFlexeOrderPlacement",
      `/tracking?type=changeTaskStatus`,
      payload
    )
      .then((response) => {
        console.log(response);
        setTrackingData(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  }

  const getDriverDetails = (resp) => {
    resp.stages.forEach((stage) => {
      stage.tasks.forEach((task) => {
        if (task.name == "ASSET_ALLOCATION" && task.status == "COMPLETED") {
          setDriverDetails(task.customFields.data.allotedDrivers[0]);
          setTruckNo(task.customFields.data.allotedTrucks[0].value.assetNumber);
          return;
        }
      });
    });
  };

  function getTrackingStage(resp) {
    var count = 0;
    var i;
    for (i = 0; i < resp.stages.length; i++) {
      if (resp.stages[i].status === "COMPLETED") {
        count++;
      }
      setActiveStep(count);
    }
  }
  function getSteps() {
    return [
      "Order Placed",
      "Order Accepted",
      "Pickup in Transit",
      //"Arrived at Pickup Location",
      "Pickup Completed",
      // "Arrived at Drop Location",
      "Shipment Delivered",
    ];
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return `Your Order is placed successfully and is waiting to be accepted by the Service Provider.`;
      case 1:
        return `Your Order has been accepted by the Service Provider,You will get notified once the Driver has left for Pickup.`;
      case 2:
        return (
          <div>
            <p>
              <br />
              The Driver has left for pickup and will arrive at pickup location
              soon.
            </p>
            <p>
              Driver Name:{" "}
              {DriverDetails.length !== 0 ? DriverDetails.value : "x"}
              <br />
              Contact Number:{" "}
              {DriverDetails.length !== 0 ? DriverDetails.phone : "x"}
              <br />
              Truck Number: {TruckNo !== "" ? TruckNo : "x"}
            </p>
          </div>
        );

      // case 3:
      //   return (
      //     <div>
      //       <p>
      //         <br />
      //         Share the below OTP with Driver to Complete Pickup and Start
      //         Dispatch.
      //       </p>
      //       <p>OTP: 394830</p>
      //     </div>
      //   );
      case 3:
        return (
          <div>
            <p>
              <br />
              Driver has left for Delivery and will arrive at drop location
              soon.
            </p>
          </div>
        );
      // case :
      //   return (
      //     <div>
      //       <p>
      //         <br />
      //         Share the below OTP with Driver to complete the Shipment.
      //       </p>
      //       <p>OTP: 394830</p>
      //     </div>
      //   );
      case 4:
        return (
          <div>
            <p style={{ fontSize: 20 }}>Shipment Delivered Successfully</p>
          </div>
        );
      default:
        return "";
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const getTrackingIds = (TrackingData, TaskName) => {
    let details = null;
    TrackingData.stages.forEach((stage) => {
      stage.tasks.forEach((task) => {
        if (task.name == TaskName) {
          details = {
            stageId: stage.stageId,
            taskId: task.taskId,
          };
        }
      });
    });
    return details;
  };
  const SendFeedbackData = async () => {
    setLoading(true);
    let details = getTrackingIds(TrackingData, "CUSTOMER_FEEDBACK");
    const data = {
      trackingId: TrackingData.processId,
      stageId: details.stageId,
      taskId: details.taskId,
      custom: {
        data: {
          ProductDamaged: ProductDamaged,
          ProductPilferage: ProductPilferage,
          NoOfDamagedProducts: NoOfDamagedProducts,
          NoOfMissingProducts: NoOfMissingProducts,
          ProductSafety: ProductSafety,
          ShipmentTime: ShipmentTime,
          OverallExperience: OverallExperience,
          Feedback: Feedback,
        },
        attachments: {},
      },
    };
    const payload = {
      body: data,
    };

    API.patch(
      "GoFlexeOrderPlacement",
      `/tracking?type=updateCustomFields`,
      payload
    )
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
    CompleteDeliveryFeeback();
  };
  if (Loading == true) {
    return <Spinner />;
  }
  if (count == 5) {
    return <h1>Shipment Delivered Successfully</h1>;
  }
  if (NewRatings == true) {
    return (
      <div style={{ overflow: "hidden", marginTop: "20px" }}>
        <Typography
          style={{
            fontSize: 20,
            height: 50,
            padding: 10,
            paddingLeft: 55,
            borderBottomStyle: "solid",
            borderWidth: "1px",
            marginBottom: "20px",
          }}
        >
          Shipment Delivered Successfully
        </Typography>
        <Typography
          style={{
            fontSize: 18,
            height: 50,
            padding: 10,
            paddingLeft: 55,
            marginBottom: "20px",
          }}
        >
          Please Share your Experience:
        </Typography>

        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item sm={6} xs={12}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        onChange={(e) => {
                          setProductDamaged(e.target.checked);
                        }}
                        size="small"
                        color="primary"
                        inputProps={{
                          "aria-label": "secondary checkbox",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingRight: 130,
                      }}
                    >
                      Product Damaged
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item sm={6} xs={12}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox
                        onChange={(e) => {
                          setProductPilferage(e.target.checked);
                        }}
                        size="small"
                        color="primary"
                        inputProps={{
                          "aria-label": "secondary checkbox",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingRight: 130,
                      }}
                    >
                      Product Pilferage
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          {ProductDamaged == true ? (
            <Grid item sm={6} xs={12}>
              <TextField
                type="number"
                required
                value={NoOfDamagedProducts}
                onChange={(event) =>
                  onNoOfDamagedProductsChangeController(event)
                }
                label="Number of Damaged Products"
                fullWidth
              />
            </Grid>
          ) : (
            <Grid item sm={6} xs={12}></Grid>
          )}
          {ProductPilferage == true ? (
            <Grid item sm={6} xs={12}>
              <TextField
                type="number"
                required
                value={NoOfMissingProducts}
                onChange={(event) =>
                  onNoOfMissingProductsChangeController(event)
                }
                label="Number of Missing Products"
                fullWidth
              />
            </Grid>
          ) : (
            <Grid item sm={6} xs={12}></Grid>
          )}
        </Grid>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={3}>
            {" "}
            <Typography component="legend">Shipment Time</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            {" "}
            <Rating
              name="ShipmentTime"
              value={ShipmentTime}
              precision={0.5}
              onChange={(event, newValue) => {
                setShipmentTime(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setShipmentTimeHover(newHover);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            {" "}
            {ShipmentTime !== null && (
              <Box ml={2}>
                {
                  labels[
                    ShipmentTimehover !== -1 ? ShipmentTimehover : ShipmentTime
                  ]
                }
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={3}>
            {" "}
            <Typography component="legend">Products Safety</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            {" "}
            <Rating
              name="ProductSafety"
              value={ProductSafety}
              precision={0.5}
              onChange={(event, newValue) => {
                setProductSafety(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setSafetyHover(newHover);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            {" "}
            {ProductSafety !== null && (
              <Box ml={2}>
                {labels[Safetyhover !== -1 ? Safetyhover : ProductSafety]}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={3}>
            {" "}
            <Typography component="legend">Overall Experience</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            {" "}
            <Rating
              name="OverallExperience"
              value={OverallExperience}
              precision={0.5}
              onChange={(event, newValue) => {
                setOverallExperience(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setOverallExperienceHover(newHover);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            {" "}
            {OverallExperience !== null && (
              <Box ml={2}>
                {
                  labels[
                    OverallExperiencehover !== -1
                      ? OverallExperiencehover
                      : OverallExperience
                  ]
                }
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            Feedback:
            <TextareaAutosize
              style={{ minWidth: 375 }}
              aria-label="minimum height"
              rowsMin={6}
              value={Feedback}
              onChange={(event) => onFeedbackChangeController(event)}
              rowsMax={12}
              placeholder="Share if Any..."
            />
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={9}></Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={SendFeedbackData}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div style={{ overflow: "hidden", marginTop: "20px" }}>
      <Typography
        style={{
          fontSize: 20,

          padding: 10,
          paddingLeft: 55,
          borderBottomStyle: "solid",
          borderWidth: "1px",
          marginBottom: "20px",
        }}
      >
        Order Tracking
      </Typography>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Shipment Delivered Successfully</Typography>
        </Paper>
      )}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography style={{ fontSize: 13, color: "grey" }}>
                {getStepContent(index)}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      <div className={classes.actionsContainer}></div>
      <div>
        {/* <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.button}
        >
          Back
        </Button> */}
        {activeStep === steps.length - 1 ? (
          <Button
            style={{
              padding: 5,
              paddingLeft: 15,
              paddingRight: 15,
            }}
            onClick={setRatings(true)}
            variant="contained"
            color="default"
            startIcon={<Done />}
          >
            Rate Experience
          </Button>
        ) : (
          // <Button
          //   variant="contained"
          //   color="primary"
          //   onClick={handleNext}
          //   className={classes.button}
          // >
          //   {activeStep === steps.length - 1 ? " Rate Experience" : "Next"}
          // </Button>
          <br />
        )}
      </div>
    </div>
  );
};

export default Track;
