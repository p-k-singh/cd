import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import {
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import {
  Button,
  
} from '@material-ui/core'

import "./ResetPassword.css";

export default function ResetPassword() {
  const [fields, handleFieldChange] = useState({
    code: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleEmailChange = (event) => {
     handleFieldChange({...fields,email:event.target.value})
  }
  const handleCodeChange = (event) => {
    handleFieldChange({...fields,code:event.target.value})
  }
  const handlePasswordChange = (event) => {
    handleFieldChange({...fields,password:event.target.value})
  }
  const handleConfirmPasswordChange = (event) => {
    handleFieldChange({...fields,confirmPassword:event.target.value})
  }
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateCodeForm() {
    return fields.email.length > 0;
  }

  function validateResetForm() {
    return (
      fields.code.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSendCodeClick(event) {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      await Auth.forgotPassword(fields.email);
      setCodeSent(true);
    } catch (error) {
      alert('line 47'+error);
      setIsSendingCode(false);
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.forgotPasswordSubmit(
        fields.email,
        fields.code,
        fields.password
      );
      setConfirmed(true);
    } catch (error) {
      alert('line65'+error);
      setIsConfirming(false);
    }
  }

  function renderRequestCodeForm() {
    return (
      <form >
        <FormGroup bsSize="large" controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleEmailChange}
          />
        </FormGroup>
        <Button
          onClick={handleSendCodeClick}
          
          bsSize="large"
          isLoading={isSendingCode}
          disabled={!validateCodeForm()}
        >
          Send Confirmation
        </Button>
      </form>
    );
  }

  function renderConfirmationForm() {
    return (
      <form >
        <FormGroup bsSize="large" controlId="code">
          <FormLabel>Confirmation Code</FormLabel>
          <FormControl
            autoFocus
            type="tel"
            value={fields.code}
            onChange={handleCodeChange}
          />
          <p>
            Please check your email ({fields.email}) for the confirmation code.
          </p>
        </FormGroup>
        <hr />
        <FormGroup bsSize="large" controlId="password">
          <FormLabel>New Password</FormLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <FormGroup bsSize="large" controlId="confirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            type="password"
            value={fields.confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </FormGroup>
        <Button
          onClick={handleConfirmClick}
          bsSize="large"
          isLoading={isConfirming}
          disabled={!validateResetForm()}
        >
          Confirm
        </Button>
      </form>
    );
  }

  function renderSuccessMessage() {
    return (
      <div className="success">
        <p>Your password has been reset.</p>
        <p>
          <Link to="/login">
            Click here to login with your new credentials.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="ResetPassword">
      {!codeSent
        ? renderRequestCodeForm()
        : !confirmed
        ? renderConfirmationForm()
        : renderSuccessMessage()}
    </div>
  );
}