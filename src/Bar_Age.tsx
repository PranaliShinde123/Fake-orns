import * as React from "react";
import { useState, useEffect } from "react";
import { InnerBar } from "./InnerBar";
import "./styles.css";
import {
  motion,
  transform,
  AnimatePresence,
  useAnimation
} from "framer-motion";
import { AxisLabel } from "./AxisLabel";
import { Bar } from "./Bar";
import { spacing } from "./styles1";

interface Props {
  currentAge: number;
  yearlyContribution: number;
  initialPrincipal: number;
}

const calculateInterest = (
  initialPrincipal: number,
  interestRate: number,
  numTimePeriodsElapsed: number
) => {
  // ((Р*(1+i)^n) - P)

  return Math.round(
    initialPrincipal * Math.pow(1 + interestRate, numTimePeriodsElapsed) -
      initialPrincipal
  );
};

const calculateCash = (
  initialPrincipal: number,
  yearlyContribution: number,
  yearMultiplier: number
) => {
  return initialPrincipal + yearMultiplier * yearlyContribution;
};

const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const darkBlue = "#272640";
const white = "#FFF";
const topOffset = 100;
const bottomOffset = 60;
const maxBarHeight = 20;

const Chart = ({ currentAge, yearlyContribution, initialPrincipal }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(24);
  const [highestNumber, setHighestNumber] = useState(30000000);
  const [highestContribution, setHighestContribution] = useState(200000);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [interestGainedState, setInterestGainedState] = useState(0);
  const [
    contributionForThisYearState,
    setContributionForThisYearState
  ] = useState(0);
  const [ageState, setAgeState] = useState(currentAge);

  const animationControls = useAnimation();

  const numberOfYears = 75 - currentAge;
  const arr = new Array(numberOfYears).fill(0).map((d, i) => d);

  const w = 3;
  const totalWidth = window.innerWidth - spacing.space4 * 2;
  const spacer = totalWidth / arr.length - w;

  const snapToIndex = (index) => {
    setSelectedIndex(index);
    const contributionForThisYear = calculateCash(
      initialPrincipal,
      yearlyContribution,
      index
    );
    const interestGained = calculateInterest(initialPrincipal, 0.05, index);

    setInterestGainedState(interestGained);
    setContributionForThisYearState(contributionForThisYear);
    setAgeState(index + 1 + currentAge);
    animationControls.start({ x: index * (w + spacer) });
  };

  const handleDrag = (e) => {
    const index =
      e.pageX < totalWidth && e.pageX > 0
        ? Math.floor(e.pageX / (w + spacer))
        : selectedIndex;
    setSelectedIndex(index);
  };

  useEffect(() => {
    snapToIndex(selectedIndex);
    const total =
      calculateInterest(initialPrincipal, 0.05, arr.length) +
      calculateCash(initialPrincipal, yearlyContribution, arr.length);
    setHighestNumber(total);
    console.log(total);
    setHighestContribution(
      calculateCash(initialPrincipal, arr.length, arr.length - 1)
    );
  }, [selectedIndex, yearlyContribution]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "100%",
        height: "80vh",
        background: darkBlue,
        padding: 0,
        margin: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        userSelect: "none",
        overflow: "scroll"
      }}
    >
      <div>
        <p style={{ color: "#FFF", padding: "0px 20px", fontFamily: "Arial" }}>
          Age: {ageState}
        </p>
        <p style={{ color: "#FFF", padding: "0px 20px", fontFamily: "Arial" }}>
          Interest: {interestGainedState}
        </p>
        <p style={{ color: "#FFF", padding: "0px 20px", fontFamily: "Arial" }}>
          Total: {contributionForThisYearState + interestGainedState}
        </p>
      </div>

      {arr.map((d, i) => {
        const xPos = spacing.space4 + i * (w + spacer);
        const contributionForThisYear = calculateCash(
          initialPrincipal,
          yearlyContribution,
          i
        );
        const interestGained =
          calculateInterest(initialPrincipal, 0.05, i) +
          calculateCash(initialPrincipal, yearlyContribution, i);
        const barHeight = (interestGained / highestNumber) * 400;
        const innerBarHeight = (contributionForThisYear / highestNumber) * 200;
        // console.log(interestGained, contributionForThisYear);
        const isSelected = i === selectedIndex;
        return (
          <div>
            <Bar
              key={`key__${i}`}
              isSelected={isSelected}
              onClick={() => snapToIndex(i)}
              xPos={xPos}
              barHeight={barHeight}
              innerBarHeight={innerBarHeight}
            />
            <motion.div
              style={{
                position: "absolute",
                left: xPos - 7,
                bottom: barHeight + 9,
                width: "15px",
                height: "15px",
                backgroundColor: "#44C3FF",
                borderRadius: "50%",
                padding: "1px",
                display: isSelected ? "block" : "none"
              }}
              onPan={handleDrag}
            >
              <div
                style={{
                  position: "absolute",
                  width: "14px",
                  height: "14px",
                  backgroundColor: darkBlue,
                  borderRadius: "50%"
                }}
              ></div>
            </motion.div>
          </div>
        );
      })}
      <AxisLabel
        text={`${currentAge}`}
        xPos={spacing.space4}
        yPos={maxBarHeight + topOffset}
      />
      <AxisLabel
        text={`${currentAge + numberOfYears}`}
        xPos={spacing.space4 + totalWidth - 20}
        yPos={maxBarHeight + topOffset}
      />
    </motion.div>
  );
};

export default Chart;
