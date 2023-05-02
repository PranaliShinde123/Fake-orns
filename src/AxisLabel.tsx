import * as React from "react";

interface Props {
  text: string;
  xPos: number;
  yPos: number;
}

export const AxisLabel = ({ text, xPos, yPos }: Props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: xPos,
        bottom: 0,
        color: "#fff",
        fontSize: "15px",
        fontFamily: "sans-serif"
      }}
    >
      {text}
    </div>
  );
};
