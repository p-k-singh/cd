// import React, { useState } from "react";
// import Select from "react-select";
// import "../../Globalcss/globalcss.css";
// /// /inventory      get(id,owner,type)
// // /pricing get(length,width,height,toPin,fromPin,weightPerUnit,measureable=true/false,other)
// import {
//   TextField,
//   Grid,
//   FormControl,
//   InputLabel,
//   Button,
//   Switch,
//   InputAdornment,
// } from "@material-ui/core";
// import Tooltip from "@material-ui/core/Tooltip";
// import { Auth, API } from "aws-amplify";
// import Spinner from "../UI/Spinner";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// import constants from "../../Constants/constants";
// const useStyles = makeStyles({});

// const AddAddressForm = (props) => {
//   const classes = useStyles();
//   const [Name, setName] = useState("");
//   const [PickupData, setPickupData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [pickupArea, setPickupArea] = useState("");

//   /**Errors Validator */
//   const [pickupZipValidator, setPickupZipValidator] = useState("");

//   const selectStyles = {
//     menu: (base) => ({
//       ...base,
//       zIndex: 100,
//     }),
//   };

//   const onPickupAreaChangeController = (event) => {
//     setPickupArea(event.target.value);
//   };

//   const onPickupZipChangeController = (event) => {
//     var pickupPinCode = parseInt(event.target.value, 10);
//     if (pickupPinCode < 0) {
//       setPickupZipValidator("Cannot be a negative value");

//       return;
//     } else {
//       setPickupZipValidator("");
//     }
//     var count = 0,
//       temp = pickupPinCode;
//     while (temp > 0) {
//       count++;
//       temp = Math.floor(temp / 10);
//     }
//     if (count == 6) {
//       const api_url = "https://api.postalpincode.in/pincode/" + pickupPinCode;

//       // Defining async function
//       async function getapi(url) {
//         // Storing response

//         const response = await fetch(url);

//         // Storing data in form of JSON
//         var data = await response.json();
//         console.log(data);
//         setPickupData(
//           data !== null && data[0].PostOffice !== null ? data[0].PostOffice : ""
//         );
//       }
//       // Calling that async function
//       getapi(api_url);
//     }
//     if (count !== 6) {
//       setPickupZipValidator("Must be of six digits");
//     } else {
//       setPickupZipValidator("");
//     }
//   };
//   const submitTruck = async () => {
//     setLoading(true);
//     var currentUser = await Auth.currentUserInfo();
//     var owner = currentUser.username;
//     var data;
//     var location = "India";
//     var pinCode = "123456";

//     // data = {
//     //   owner: owner,
//     //   productName: newProductName,
//     //   productType: newProductType,
//     //   unit: unit,
//     //   height: height,
//     //   width: width,
//     //   length: length,
//     //   weightPerUnit: weightPerUnit,
//     //   location: location,
//     //   categories: categories,
//     //   measurable: switchToggler,
//     //   density: density,
//     //   pincode: pinCode,
//     // };

//     const payload = {
//       body: data,
//     };
//     API.post("GoFlexeOrderPlacement", `/inventory`, payload)
//       .then((response) => {
//         // Add your code here
//         console.log(response);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error.response);
//         setLoading(false);
//       });
//     console.log(data);
//     setLoading(false);
//     props.toggleForm();
//   };

//   if (loading === true) {
//     return <Spinner />;
//   }

//   /*IF the product is measureable with length width height */

//   return (
//     <div style={{ overflow: "hidden" }}>
//       <Typography
//         fullWidth
//         style={{ fontSize: 18, paddingLeft: 30 }}
//         gutterBottom
//       >
//         Address Details
//       </Typography>
//       <form>
//         <Grid
//           container
//           spacing={3}
//           style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 20 }}
//         >
//           <Grid item xs={12} sm={6}>
//             <TextField required id="name" name="name" label="Name" fullWidth />
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <TextField
//               required
//               id="ContactNo"
//               name="ContactNo"
//               label="Contact Number"
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={5}>
//             <TextField
//               required
//               id="pickupaddress"
//               name="pickupaddress"
//               label="Pick up address"
//               fullWidth
//             />
//           </Grid>

//           <Grid item xs={12} sm={2}>
//             <TextField
//               required
//               error={pickupZipValidator !== ""}
//               helperText={
//                 pickupZipValidator === ""
//                   ? PickupData == ""
//                     ? ""
//                     : PickupData[0].District + ", " + PickupData[0].State
//                   : pickupZipValidator
//               }
//               type="number"
//               id="pickupzip"
//               name="pickupzip"
//               label="Pickup Zip"
//               fullWidth
//               onChange={(event) => onPickupZipChangeController(event)}
//               autoComplete="Pickup postal-code"
//             />
//           </Grid>
//           {PickupData.length !== 0 ? (
//             <Grid item xs={12} sm={2}>
//               <FormControl className={classes.formControl} fullWidth>
//                 <InputLabel htmlFor="age-native-simple">Locality</InputLabel>
//                 <Select
//                   native
//                   onChange={(event) => onPickupAreaChangeController(event)}
//                   value={pickupArea}
//                   inputProps={{
//                     name: "age",
//                     id: "age-native-simple",
//                   }}
//                 >
//                   {PickupData.map((d) => (
//                     <option>{d.Name}</option>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           ) : (
//             <p></p>
//           )}

//           <Grid item xs={12} sm={6}></Grid>
//         </Grid>

//         <Button
//           onClick={submitTruck}
//           className="row AllButtons"
//           variant="contained"
//           style={{
//             float: "right",

//             marginBottom: "10px",
//           }}
//         >
//           Submit
//         </Button>
//         <Button
//           onClick={() => props.toggleForm()}
//           className="row"
//           variant="contained"
//           color="default"
//           style={{
//             float: "right",
//             marginRight: "10px",
//             marginBottom: "10px",
//           }}
//         >
//           Cancel
//         </Button>
//       </form>
//     </div>
//   );
// };
// export default AddAddressForm;

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import constants from "../../Constants/constants";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  TextareaAutosize,
  Button,
} from "@material-ui/core";
const useStyles = makeStyles({
  formHeadings: {
    margin: 20,
    marginBottom: 0,
  },
});

const AddAddressForm = (props) => {
  const classes = useStyles();

  const [Area, setArea] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("");
  const [ZipValidator, setZipValidator] = useState("");
  const [deliverZipValidator, setDeliverZipValidator] = useState("");
  const [PinData, setPinData] = useState([]);
  useEffect(() => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
  }, []);
  const onAddressChangeController = (event) => {
    var Address = event.target.value;
  };
  const onAreaChangeController = (event) => {
    setArea(event.target.value);
  };

  const onPinChangeController = (event) => {
    var PinPinCode = parseInt(event.target.value, 10);
    if (PinPinCode < 0) {
      setZipValidator("Cannot be a negative value");

      return;
    } else {
      setZipValidator("");
    }
    var count = 0,
      temp = PinPinCode;
    while (temp > 0) {
      count++;
      temp = Math.floor(temp / 10);
    }
    if (count == 6) {
      const api_url = "https://api.postalpincode.in/pincode/" + PinPinCode;

      // Defining async function
      async function getapi(url) {
        // Storing response

        const response = await fetch(url);

        // Storing data in form of JSON
        var data = await response.json();
        console.log(data);
        setPinData(
          data !== null && data[0].PostOffice !== null ? data[0].PostOffice : ""
        );
      }
      // Calling that async function
      getapi(api_url);
    }
    if (count !== 6) {
      setZipValidator("Must be of six digits");
    } else {
      setZipValidator("");
    }
  };

  return (
    <CardContent style={{ padding: 0 }}>
      <Typography className="TypographyTitle" gutterBottom>
        Address Details
      </Typography>
      <form>
        <Grid
          container
          spacing={3}
          style={{
            paddingLeft: 20,
            paddingTop: 40,
            paddingBottom: 40,
            paddingRight: 20,
          }}
        >
          <Grid item xs={12} sm={5}>
            <TextField required id="Name" name="Name" label="Name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="ContactNo"
              name="ContactNo"
              label="Contact No."
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              fullWidth
              onChange={(event) => onAddressChangeController(event)}
              autoComplete="shipping address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              required
              error={ZipValidator !== ""}
              helperText={
                ZipValidator === ""
                  ? PinData == ""
                    ? ""
                    : PinData[0].District + ", " + PinData[0].State
                  : ZipValidator
              }
              type="number"
              id="PinCode
              name="
              PinCode
              label="PinCode"
              fullWidth
              // value={props.pickupPin}
              onChange={(event) => onPinChangeController(event)}
              autoComplete="Pickup postal-code"
            />
          </Grid>
          {PinData.length !== 0 ? (
            <Grid item xs={12} sm={2}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="age-native-simple">Locality</InputLabel>
                <Select
                  native
                  onChange={(event) => onAreaChangeController(event)}
                  value={Area}
                  inputProps={{
                    name: "age",
                    id: "age-native-simple",
                  }}
                >
                  {PinData.map((d) => (
                    <option>{d.Name}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <p></p>
          )}
        </Grid>
        <Button
          className="row AllButtons"
          variant="contained"
          style={{
            float: "right",

            marginBottom: "10px",
          }}
        >
          Submit
        </Button>
        <Button
          onClick={() => props.toggleForm()}
          className="row"
          variant="contained"
          color="default"
          style={{
            float: "right",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          Cancel
        </Button>
      </form>
    </CardContent>
  );
};

export default AddAddressForm;
