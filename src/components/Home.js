import React, { Component, useEffect, useState } from "react";
import { API } from "aws-amplify";
import "./Home.css";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
import { Sector, Cell } from "recharts";
import { PieChart, Pie } from "recharts";

const data = [
  { name: "product A", orders: 4 },
  { name: "product B", orders: 3 },
  { name: "product C", orders: 3 },
  { name: "product D", orders: 1 },
];

const goodsdata = [
  { name: "% of Goods Delivered", Percent: 240 },
  { name: "% of Goods PickedUp", Percent: 520 },
];
const pilferagedata = [
  { name: "% of Goods with Pilferage", Percent: 10 },
  { name: "% of Goods with 0 Pilferage", Percent: 76 },
];
const GoodsCOLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const PilferageCOLORS = ["#FF8042", "#00C49F", "#FFBB28"];

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

class Home extends Component {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/c9pL8k61/";
  render() {
    return (
      <div>
        {/* <div className="widgetWrap">
          <div className="widgetValue">
            <div className="Value">Hello Gaurav</div>
          </div>
        </div> */}
        <div>
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
                    <h3 style={{ padding: 20, fontSize: 50 }}>20</h3>
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
                    <h3 style={{ padding: 20, fontSize: 50 }}>12</h3>
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
                    ₹ 9,567
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
                    Logistics quality for pilferage
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
                            {data.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  PilferageCOLORS[
                                    index % PilferageCOLORS.length
                                  ]
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </Grid>
                      <Grid item xs={12} sm={1} style={{ marginTop: 75 }}>
                        <div
                          style={{
                            background: "#00C49F",
                            width: 10,
                            marginBottom: 35,
                            height: 10,
                          }}
                        ></div>
                        {/* <div
                          style={{
                            background: "#0088FE",
                            width: 10,

                            height: 10,
                          }}
                        ></div> */}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        style={{ marginTop: 70, fontWeight: 600, fontSize: 12 }}
                      >
                        <div style={{ marginBottom: 30 }}>
                          % of Goods with 0 Pilferage
                        </div>
                        {/* <div>% Goods Picked Up</div> */}
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
                    Order statistics for pick up and delivered
                  </div>

                  <div>
                    <Grid container>
                      <Grid item xs={12} sm={7}>
                        <PieChart width={300} height={200}>
                          <Pie
                            isAnimationActive={false}
                            dataKey="Percent"
                            data={goodsdata}
                            cx={135}
                            cy={100}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                          >
                            {data.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={GoodsCOLORS[index % GoodsCOLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </Grid>
                      <Grid item xs={12} sm={1} style={{ marginTop: 75 }}>
                        <div
                          style={{
                            background: "#0088FE",
                            width: 10,
                            marginBottom: 35,
                            height: 10,
                          }}
                        ></div>
                        <div
                          style={{
                            background: "#00C49F",
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
                          % Goods Delivered
                        </div>
                        <div>% Goods Picked Up</div>
                      </Grid>
                    </Grid>
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
                <CardContent>Total Amount Charged</CardContent>
                <div class="paymentText" style={{ padding: 20 }}>
                  Rs. 2773
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
                <CardContent> Amount to be paid</CardContent>
                <div class="paymentText" style={{ padding: 20 }}>
                  Rs. 2773
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
                <CardContent>Upcoming payments to be made</CardContent>
                <div class="paymentText" style={{ padding: 20 }}>
                  Rs. 2773
                </div>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
