
import React from "react";

const CreditCard = (props) => {
  // Format number -> show only last 4 digits
  const hiddenNumber = `•••• •••• •••• ${props.number.slice(-4)}`;

  return (
    <div
      className="creditcard"
      style={{
        backgroundColor: props.bgColor,
        color: props.color,
        borderRadius: "15px",
        width: "350px",
        padding: "20px",
        margin: "20px auto",
        fontFamily: "monospace",
        position: "relative",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        minHeight: "200px", // ensures there’s room for top logo + bottom details
      }}
    >
      {/* Logo in top right */}
      <img
        src={props.picture}
        alt={props.type}
        style={{
          width: "60px",
          position: "absolute",
          top: "20px",
          right: "20px",
        }}
      />

      {/* Bottom-left details container */}
      <div
        style={{
          position: "absolute",
          left: "20px",
          bottom: "20px",
          right: "20px",      // keeps the text from overflowing and allows wrapping
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          textAlign: "left",
        }}
      >
        {/* Card Number */}
        <p style={{ fontSize: "1.4rem", letterSpacing: "3px", margin: 0 }}>
          {hiddenNumber}
        </p>

        {/* Expiration + Bank */}
        <p style={{ fontSize: "0.9rem", margin: 0 }}>
          Expires {props.expirationMonth}/
          {String(props.expirationYear).slice(-2)}{" "}
          {props.bank}
        </p>

        {/* Owner */}
        <p style={{fontSize: "1rem", margin: 0 }}>{props.owner}</p>
      </div>
    </div>
  );
};

export default CreditCard;