import * as React from "react";
import { InnerBar } from "./InnerBar";

interface Props {
  isSelected: boolean;
  onClick: () => void;
  xPos: number;
  barHeight: number;
  innerBarHeight: number;
}

export const Bar = ({
  isSelected,
  onClick,
  xPos,
  barHeight,
  innerBarHeight
}: Props) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: xPos,
          bottom: 20,
          height: barHeight,
          width: "3px",
          background: isSelected ? "#44c3ff" : "#5c5c5c",
          cursor: "pointer"
        }}
        onClick={onClick}
      ></div>
      <div
        style={{
          position: "absolute",
          left: xPos,
          bottom: 20,
          height: innerBarHeight,
          width: "3px",
          background: "#FFF",
          cursor: "pointer"
        }}
        onClick={onClick}
      ></div>
    </>
  );
};
