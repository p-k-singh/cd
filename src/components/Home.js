import React, { Component } from "react";
import { API } from "aws-amplify";
import "./Home.css";
import CardContent from "@material-ui/core/CardContent";

import { Chart } from "chart.js";

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

class Home extends Component {
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
            <Grid item sm={0.3}></Grid>
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
            </Grid>
            <Grid item sm={0.3}></Grid>
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
            </Grid>
            <Grid item sm={0.3}></Grid>
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
            </Grid>
            <Grid item sm={0.3}></Grid>
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
            <Grid item sm={0.3}></Grid>
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
            <Grid item sm={0.3}></Grid>
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
                <CardContent></CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;
