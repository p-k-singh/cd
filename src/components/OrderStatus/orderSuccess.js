import React from "react";
import PaymentIndex from "../Payments/PaymentIndex";
export default function Success(props) {
  const {
    match: { params },
  } = props;

  return (
    <div>
      <h1>
        Order Placed Successfuly!! <br />
        Please Provide Payment Promise below.
      </h1>
      <PaymentIndex orderId={params.id}></PaymentIndex>
      You can also fill the Payment Details Later or check the Submitted Details inside Order Details Section in My Orders.
    </div>
  );
}
