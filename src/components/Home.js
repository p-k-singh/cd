import React, { Component, useEffect, useState } from "react";
import "./Home.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import { Auth, API } from "aws-amplify";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TextField,
  Checkbox,
  Grid,
  Card,
  Button,
  IconButton,
  Divider,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { PureComponent } from "react";
import { Sector } from "recharts";
import { PieChart, Pie } from "recharts";

const data = [
  {
    name: "Pickup OnTime",

    Ontime_Delivery: 24,
  },
  {
    name: "Delivery OnTime",

    Ontime_Delivery: 13,
  },
];

const COLORS = ["#FF8042", "#00C49F", "#cc3300"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Home = (props) => {
  const [value, setValue] = React.useState(3.5);
  const [details, setDetails] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  function loadData() {
    setLoading("true");
    Auth.currentUserInfo()
      .then((userDetails) => {
        const payload = {
          type: "customer",
          customerId: "ff7675f7-ac42-43f7-91e3-599624f1661a",
          // userDetails.username,
        };
        var params = JSON.stringify(payload);

        API.get("GoFlexeOrderPlacement", `/aggregation?body=${params}`)
          .then((resp) => {
            console.log(resp);
            setDetails(resp);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    loadData();
  }, []);
  const pilferagedata = [
    {
      name: "Goods with Pilferage",
      Percent: details.length !== 0 ? details.customerOrdersDamagedCount : 0,
    },
    {
      name: "Perfect Orders",
      Percent: details.length !== 0 ? details.placedOrdersCount : 0,
    },
    {
      name: "Damaged Goods",
      Percent: details.length !== 0 ? details.customerOrdersDamagedCount : 0,
    },
  ];

  return (
    <div>
      {/* <div className="widgetWrap">
          <div className="widgetValue">
            <div className="Value">Hello Gaurav</div>
          </div>
        </div> */}
      <div>
        <Link to="/myorders">
          <Card style={{ marginBottom: 10 }}>
            <div>
              <Typography
                style={{
                  borderBottom: `1px solid black`,
                  fontSize: 20,
                  height: 50,
                  padding: 10,
                  paddingLeft: 30,
                  fontWeight: 700,
                }}
                fullWidth
              >
                Order Details
              </Typography>
            </div>
            <Grid container spacing={3} style={{ marginTop: 10 }}>
              <Grid item sm={0.4}></Grid>{" "}
              <Grid item sm={2}>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle" style={{ background: "#062B79" }}>
                    <h3 style={{ padding: 20, fontSize: 50 }}>
                      {details.length !== 0 ? details.placedOrdersCount : 0}
                    </h3>
                  </div>
                  <div
                    style={{
                      padding: 5,
                      paddingTop: 10,
                      paddingBottom: 0,
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Total Orders placed
                  </div>
                </CardContent>
              </Grid>{" "}
              <Grid item sm={0.4}></Grid>
              <Grid item sm={2}>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle" style={{ background: "green" }}>
                    <h3 style={{ padding: 20, fontSize: 50 }}>
                      {" "}
                      {details.length !== 0
                        ? details.customerOrdersAcceptedCount
                        : 0}
                    </h3>
                  </div>
                  <div
                    style={{
                      padding: 5,
                      paddingTop: 10,
                      paddingBottom: 0,
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Orders Accepted
                  </div>
                </CardContent>
              </Grid>{" "}
              <Grid item sm={0.4}></Grid>
              <Grid item sm={2}>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle" style={{ background: "orange" }}>
                    <h3 style={{ padding: 20, fontSize: 50 }}>8</h3>
                  </div>
                  <div
                    style={{
                      padding: 5,
                      paddingTop: 10,
                      paddingBottom: 0,
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Orders Picked up
                  </div>
                </CardContent>
              </Grid>{" "}
              <Grid item sm={0.4}></Grid>
              <Grid item sm={2}>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle" style={{ background: "#C57A7A" }}>
                    <h3 style={{ padding: 20, fontSize: 50 }}>5</h3>
                  </div>
                  <div
                    style={{
                      padding: 5,
                      paddingTop: 10,
                      paddingBottom: 0,
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Orders in Transit
                  </div>
                </CardContent>
              </Grid>
              <Grid item sm={0.4}></Grid>
              <Grid item sm={2}>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle" style={{ background: "#5995B7" }}>
                    <h3 style={{ padding: 20, fontSize: 50 }}>2</h3>
                  </div>
                  <div
                    style={{
                      padding: 5,
                      paddingTop: 10,
                      paddingBottom: 0,
                      textAlign: "center",
                      fontWeight: 700,
                    }}
                  >
                    Orders Delivered
                  </div>
                </CardContent>
              </Grid>
              <Grid item sm={0.4}></Grid>
            </Grid>
          </Card>
        </Link>
      </div>
      <div>
        <Grid container spacing={3} style={{ paddingTop: 10 }}>
          <Grid item xs={12} sm={6}>
            <Card>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{
                      fontSize: 20,
                      height: 50,
                      padding: 20,
                      paddingLeft: 30,
                      fontWeight: 700,
                    }}
                    fullWidth
                  >
                    Customer Rating
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Rating
                    style={{
                      padding: 20,
                    }}
                    size="large"
                    name="rating"
                    precision={0.5}
                    value={3.5}
                    readOnly
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={7}>
                  <Typography
                    style={{
                      fontSize: 20,
                      height: 50,
                      padding: 20,
                      paddingBottom: 50,
                      paddingLeft: 30,
                      fontWeight: 700,
                    }}
                    fullWidth
                  >
                    Total Amount saved :
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={{
                    fontSize: 20,

                    padding: 20,
                    padddingTop: 50,
                    paddingLeft: 30,

                    fontWeight: 700,
                  }}
                >
                  ₹ {details.length !== 0 ? details.totalAmountSaved : 0}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={3} style={{ paddingTop: 10 }}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <div
                  style={{
                    padding: 5,
                    paddingTop: 10,
                    paddingBottom: 10,
                    textAlign: "center",
                    fontWeight: 700,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  Perfect Order %
                </div>

                <div>
                  <Grid container>
                    <Grid item xs={12} sm={7}>
                      <PieChart width={300} height={200}>
                        <Pie
                          isAnimationActive={false}
                          dataKey="Percent"
                          data={pilferagedata}
                          cx={135}
                          cy={100}
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={80}
                        >
                          {pilferagedata.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </Grid>
                    <Grid item xs={12} sm={1} style={{ marginTop: 75 }}>
                      <div
                        style={{
                          background: "#FF8042",
                          width: 10,
                          marginBottom: 35,
                          height: 10,
                        }}
                      ></div>
                      <div
                        style={{
                          background: "#cc3300",
                          width: 10,

                          height: 10,
                        }}
                      ></div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      style={{ marginTop: 70, fontWeight: 600, fontSize: 12 }}
                    >
                      <div style={{ marginBottom: 30 }}>
                        Goods with Pilferage
                      </div>
                      <div>Damaged Goods</div>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <div
                  style={{
                    padding: 5,
                    paddingTop: 10,
                    paddingBottom: 10,
                    textAlign: "center",
                    fontWeight: 700,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  On time Delivery
                </div>

                <div>
                  <BarChart
                    width={400}
                    height={200}
                    data={data}
                    margin={{
                      top: 35,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis dataKey="Ontime_Delivery" fill="#82ca9d" />
                    <Tooltip />

                    <Bar dataKey="Ontime_Delivery" fill="#82ca9d" />
                  </BarChart>
                  <Tooltip />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={3} style={{ paddingTop: 10 }}>
          <Grid
            item
            xs={12}
            sm={4}
            style={{
              paddingTop: 10,
              paddingBottom: 0,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            <Card>
              <CardContent>
                <div style={{ borderBottom: `1px solid lightgrey` }}>
                  Total Amount Charged
                </div>
              </CardContent>
              <div class="paymentText" style={{ padding: 20, fontSize: 20 }}>
                ₹ {details.length !== 0 ? details.totalAmount : 0}
              </div>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={{
              paddingTop: 10,
              paddingBottom: 0,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            <Card>
              <CardContent>
                {" "}
                <div style={{ borderBottom: `1px solid lightgrey` }}>
                  {" "}
                  Amount to be paid
                </div>
              </CardContent>
              <div class="paymentText" style={{ padding: 20, fontSize: 20 }}>
                ₹{" "}
                {details.length !== 0
                  ? Number(details.totalAmount) -
                    Number(details.totalAmountPaid)
                  : 0}
              </div>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={{
              paddingTop: 10,
              paddingBottom: 0,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            <Card>
              <CardContent>
                {" "}
                <div style={{ borderBottom: `1px solid lightgrey` }}>
                  Upcoming payments to be made
                </div>
              </CardContent>
              <div class="paymentText" style={{ padding: 20, fontSize: 20 }}>
                -
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
