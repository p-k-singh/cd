import React, { Component } from "react";
import { API } from "aws-amplify";
import "./Home.css";
import CardContent from "@material-ui/core/CardContent";
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
import { PieChart, Pie, Legend, Tooltip } from "recharts";

const data = [
  { name: "product A", value: 4 },
  { name: "product B", value: 3 },
  { name: "product C", value: 3 },
  { name: "product D", value: 1 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
        <div className="widgetWrap">
          <div className="widgetTitle">Title</div>
          <div className="widgetValue">
            <div className="Value">Hello Gaurav</div>
            <div className="description">Some Text</div>
          </div>
        </div>
        <div>
          <Grid container spacing={3} style={{ paddingTop: 10 }}>
            <Grid item sm={0.4}></Grid>{" "}
            <Grid item sm={2}>
              <Card>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle">
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
              </Card>
            </Grid>{" "}
            <Grid item sm={0.4}></Grid>
            <Grid item sm={2}>
              <Card>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle">
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
              </Card>
            </Grid>{" "}
            <Grid item sm={0.4}></Grid>
            <Grid item sm={2}>
              <Card>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle">
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
              </Card>
            </Grid>{" "}
            <Grid item sm={0.4}></Grid>
            <Grid item sm={2}>
              <Card>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle">
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
              </Card>
            </Grid>
            <Grid item sm={0.4}></Grid>
            <Grid item sm={2}>
              <Card>
                <CardContent style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <div class="circle">
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
              </Card>
            </Grid>
            <Grid item sm={0.4}></Grid>
          </Grid>
        </div>
        <div>
          <Grid container spacing={3} style={{ paddingTop: 10 }}>
            <Grid item xs={12} sm={8}>
              <Card>
                <CardContent>
                  <Grid container spacing={3} style={{ paddingTop: 10 }}>
                    <Grid item xs={12} sm={4}>
                      Image
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      style={{
                        padding: 5,
                        paddingTop: 10,
                        paddingBottom: 0,
                        textAlign: "center",
                        fontWeight: 700,
                      }}
                    >
                      Total Products placed
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <div style={{ textAlign: "center" }}>
                    <h2> Product Types</h2>
                  </div>
                  <div>
                    <PieChart width={300} height={200}>
                      <Pie
                        isAnimationActive={false}
                        data={data}
                        cx={135}
                        cy={100}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
