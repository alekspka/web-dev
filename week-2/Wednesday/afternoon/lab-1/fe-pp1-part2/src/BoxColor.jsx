import React from "react";

const BoxColor = ({ r, g, b }) => {
  // Clamp values to [0, 255] and ensure numbers
  const clamp = (n) => Math.max(0, Math.min(255, Number(n)));
  const R = clamp(r);
  const G = clamp(g);
  const B = clamp(b);

  // Build CSS color strings
  const rgb = `rgb(${R}, ${G}, ${B})`;

  // Convert to #rrggbb (lowercase as in the requirement: #ff0000)
  const toHex = (n) => n.toString(16).padStart(2, "0");
  const hex = `#${toHex(R)}${toHex(G)}${toHex(B)}`;

  // Pick black/white text for readability
  const yiq = (R * 299 + G * 587 + B * 114) / 1000;
  const textColor = yiq >= 128 ? "#000" : "#fff";

  return (
    <div
      className="BoxColor"
      style={{
        backgroundColor: rgb,
        color: textColor,
        borderRadius: "12px",
        width: "350px",
        padding: "20px",
        margin: "20px auto",
        fontFamily: "monospace",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        justifyContent: "center",
      }}
    >
      <div>{`rgb(${R}, ${G}, ${B})`}</div>
      <div>{hex}</div>
    </div>
  );
};

export default BoxColor;