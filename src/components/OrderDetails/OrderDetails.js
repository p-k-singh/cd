import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import constants from "../../Constants/constants";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../UI/Spinner";
import { Grid, Card } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
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
  formControl: {
    marginTop: "1%",
  },
});
const OrderDetails = (props) => {
  const classes = useStyles();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  console.log(props);

  if (props === null || props.value === null) return <Spinner />;
  else if (props.value.items === undefined) {
    return (
      <table>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">Order Date :</th>
              <td>{today}</td>
            </tr>
          </Grid>

          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">{constants.pickupAddress + " : "}</th>
              <td>
                {props.value.fromAddress},{props.value.fromPin}
              </td>
            </tr>
          </Grid>
          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">{constants.destinationAddress + " : "}</th>
              <td>
                {props.value.toAddress},{props.value.toPin}
              </td>
            </tr>
          </Grid>
          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">{constants.noOfUnits + " : "}</th>
              <td> {props.value.noOfUnits}</td>
            </tr>
          </Grid>
          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">{constants.weightPerUnit + " : "}</th>
              <td> {props.value.weightPerUnit}</td>
            </tr>
          </Grid>
          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">{constants.DimensionPerUnit + " : "}</th>
              <td>
                {props.value.height} x {props.value.width} x{" "}
                {props.value.breadth} {props.value.unit}
              </td>
            </tr>
          </Grid>
        </Grid>
      </table>
    );
  } else if (props.value.items.length == 1) {
    return (
      <table>
        <Grid
          container
          spacing={3}
          style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
        >
          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">Order Date :</th>
              <td>{today}</td>
            </tr>
          </Grid>

          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">{constants.pickupAddress + " : "}</th>
              <td>
                {props.value.fromAddress},{props.value.fromPin}
              </td>
            </tr>
          </Grid>
          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">{constants.destinationAddress + " : "}</th>
              <td>
                {props.value.toAddress},{props.value.toPin}
              </td>
            </tr>
          </Grid>
          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">{constants.noOfUnits + " : "}</th>
              <td> {props.value.items.map((unit) => unit.noOfUnits)}</td>
            </tr>
          </Grid>
          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">{constants.weightPerUnit + " : "}</th>
              <td> {props.value.items.map((unit) => unit.weightPerUnit)}</td>
            </tr>
          </Grid>
          <Grid item xs={12} sm={6}>
            <tr>
              <th scope="row">{constants.DimensionPerUnit + " : "}</th>
              <td>
                {props.value.items.map((unit) => unit.height)} x{" "}
                {props.value.items.map((unit) => unit.width)} x{" "}
                {props.value.items.map((unit) => unit.length)}{" "}
                {/* {props.value.items.map((unit) => unit ? unit.unit.label: 'x')} */}
              </td>
            </tr>
          </Grid>
        </Grid>
      </table>
    );
  } else if (props.value.items.length > 1) {
    return (
      <Card>
        <table>
          <Grid
            container
            spacing={3}
            style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
          >
            <Grid item xs={12} sm={12}>
              <tr>
                <th scope="row">Order Date :</th>
                <td>{today}</td>
              </tr>
            </Grid>
            <Grid item xs={12} sm={12}>
              <tr>
                <th scope="row">{constants.pickupAddress + " : "}</th>
                <td>
                  {props.value.fromAddress},{props.value.fromPin}
                </td>
              </tr>
            </Grid>

            <Grid item xs={12} sm={12}>
              <tr>
                <th scope="row">{constants.destinationAddress + " : "}</th>
                <td>
                  {props.value.toAddress},{props.value.toPin}
                </td>
              </tr>
            </Grid>
          </Grid>
        </table>
        {props.value.items.map((each, index) => (
          <div>
            <Typography
              className={classes.title}
              style={{ color: "black", backgroundColor: "lightgrey" }}
            >
              Product No. {index + 1}
            </Typography>
            <table>
              <Grid
                container
                spacing={3}
                style={{ padding: 50, paddingTop: 10, paddingBottom: 30 }}
              >
                <Grid item xs={12} sm={6}>
                  <tr>
                    <th scope="row">{"Product Name : "}</th>
                    <td>{each.productName}</td>
                  </tr>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <tr>
                    <th scope="row">{"No. of Units : "}</th>
                    <td>{each.noOfUnits}</td>
                  </tr>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <tr>
                    <th scope="row">{"Weight per Unit : "}</th>
                    <td>{each.weightPerUnit}</td>
                  </tr>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <tr>
                    <th scope="row">{"Product Type : "}</th>
                    <td>{each.productType.label}</td>
                  </tr>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <tr>
                    <th scope="row">{"Dimensions : "}</th>
                    <td>
                      {each.height} x {each.length} x {each.width}{" "}
                      {each.unit.label}
                    </td>
                  </tr>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <tr>
                    <th scope="row">{"Category: "}</th>
                    <td>{each.categories.map((unit) => unit.label + ",")} </td>
                  </tr>
                </Grid>
              </Grid>
            </table>
          </div>
        ))}
      </Card>
    );
  }
};
export default OrderDetails;
