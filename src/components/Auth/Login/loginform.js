import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { useAppContext } from "../../../libs/contextLibs";
const Login = (props) => {
  const [getOTP, setGetOTP] = useState(false);
  const [otp, setOTP] = useState();
  const [resend, setResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [session, setSession] = useState();
  const { userHasAuthenticated } = useAppContext();

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };
  const onEmailChangeController = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChangeController = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (!timeLeft) {
      setResend(true);
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const submitLogin = async () => {
    try {
      await Auth.signIn(email, password);
      //alert("Logged in");
      userHasAuthenticated(true);
      // props.setLogged(true)
    } catch (e) {
      alert(e.message);
    }
  };
  const handleGetOTP = () => {
    if (email === "") {
      alert("Please enter valid phone number");
      return;
    }
    setGetOTP(true);
    setTimeLeft(30);
    setResend(false);

    Auth.signIn(email)
      .then((result) => {
        setSession(result); // Note that this is a new variable
      })
      .catch((e) => {
        if (e.code === "UserNotFoundException") {
          alert("User Not Found");
        } else if (e.code === "UsernameExistsException") {
          handleGetOTP();
        } else {
          console.log(e.code);
          console.error(e);
        }
      });
  };

  const submitOTPLogin = () => {
    Auth.sendCustomChallengeAnswer(session, otp)
      .then((user) => {
        // this is THE cognito user
        userHasAuthenticated(true);
        setSession(null);
      })
      .catch((err) => {
        setOTP("");
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row py-5 mt-4 align-items-center">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <center style={{ marginBottom: 20, paddingRight: 30 }}>
              <a href="https://partner.goflexe.com/#/login">
                <Button
                  style={{
                    backgroundColor: "orange",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Serivce Provider Login
                </Button>
              </a>
            </center>
            <img
              src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg"
              alt=""
              className="img-fluid mb-3 d-none d-md-block"
            />
            <h1>Login to your Account</h1>
          </div>

          <div className="col-md-7 col-lg-6 ml-auto">
            <form>
              <h3>Sign In</h3>

              <div className="form-group">
                <Input
                  value={email}
                  onChange={(event) => onEmailChangeController(event)}
                  disableUnderline="true"
                  type="email"
                  className="form-control"
                  placeholder="Enter email or phone"
                />
              </div>

              {!getOTP && (
                <div className="form-group">
                  <Input
                    value={password}
                    onChange={(event) => onPasswordChangeController(event)}
                    disableUnderline="true"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                  />
                  {/* <input type="password" className="form-control" placeholder="Enter password" /> */}
                </div>
              )}

              {!getOTP && (
                <Button
                
                  onClick={submitLogin}
                  variant="contained"
                  color="primary"
                  className="btn btn-primary btn-block"
                >
                  Submit
                </Button>
              )}

              <div className="form-group" style={{marginTop:10}}>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div className="row">
                {!getOTP && (
                  <Button size="small"
                    onClick={handleGetOTP}
                    className="col col-sm-3 ml-3"
                   style={{margin:0}}
                   
                   
                    color="primary"
                  >
                    Login by OTP
                  </Button>
                )}
                {getOTP && resend && (
                  <Button
                    onClick={handleGetOTP}
                    className="col col-sm-3 ml-3"
                    variant="contained"
                    style={{ marginBottom: "20px" }}
                    color="primary"
                  >
                    Resend
                  </Button>
                )}
                {getOTP && !resend && (
                  <Button
                    onClick={handleGetOTP}
                    disabled="true"
                    className="col col-sm-3 ml-3"
                    variant="contained"
                    style={{ marginBottom: "20px", fontSize: "12px" }}
                    color="default"
                  >
                    Resend in 00:{timeLeft}
                  </Button>
                )}
                {getOTP && (
                  <div className="form-group col col-sm">
                    <Input
                      value={otp}
                      disableUnderline="true"
                      type="tel"
                      onChange={handleOTPChange}
                      className="form-control"
                      placeholder="Enter OTP"
                    />
                  </div>
                )}
              </div>
              {getOTP && (
                <Button
                  onClick={submitOTPLogin}
                  variant="contained"
                  color="primary"
                  className="btn btn-primary btn-block"
                >
                  Submit
                </Button>
              )}

              {/* <button onClick={submitLogin} type="submit" className="btn btn-primary btn-block">Submit</button> */}
              <p className="forgot-password text-right">
                <Link to="/resetPassword">Forgot Password?</Link>
              </p>
              <Link
                to="/signup"
                style={{ float: "right" }}
                className="forgot-password text-right"
              >
                Sign up
              </Link>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    hasLogged: state.login.hasLogged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLogged: (Val) => dispatch(actions.setLoggedState(Val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
