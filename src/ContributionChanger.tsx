import { useState } from "react";
import Chart from "./Bar_Age.tsx";

interface Props {
  initialAmount: number;
  onChange: (amount: number) => void;
}

export const ContributionChanger = ({ initialAmount, onChange }: Props) => {
  const [amount, setAmount] = useState(initialAmount);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setAmount(newAmount);
    onChange(newAmount);
  };

  const sliderStyles = {
    width: "10rem",
    height: "1rem",
    background: "#ddd",
    borderRadius: "0.5rem",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
    fontFamily: "Arial"
  };

  const containerStyles = {
    display: "flex",
    alignItems: "center",
    fontFamily: "Arial"
  };

  return (
    <div>
      <div style={containerStyles}>
        <label htmlFor="contribution-input" style={{ fontFamily: "Arial" }}>
          Yearly Contribution:
        </label>
        <input
          id="contribution-input"
          type="range"
          min="0"
          max="1000"
          value={amount}
          onChange={handleSliderChange}
          style={sliderStyles}
        />
        <span style={{ marginLeft: "0.5rem", fontFamily: "Arial" }}>
          {amount}
        </span>
      </div>
      <br />
      <div style={{ position: "relative" }}>
        <Chart
          currentAge={26}
          yearlyContribution={amount}
          initialPrincipal={amount}
        />
      </div>
    </div>
  );
};
