import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { motion } from "framer-motion";

function App() {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(26);
  const [weeklyContribution, setWeeklyContribution] = useState(70); // new state variable

  const calculateInterest = (principal, interestRate, years) => {
    const interest = principal * (1 + interestRate) ** years - principal;
    return Math.round(interest);
  };

  useEffect(() => {
    const currentAge = 26;
    const retirementAge = 75;
    const contributionPerYear = weeklyContribution * 52;
    const interestRate = 0.05;

    const data = [];
    var contribution = 0;

    for (let age = currentAge; age <= retirementAge; age++) {
      const yearsElapsed = age - currentAge;
      contribution += contributionPerYear;
      const interest = calculateInterest(
        contribution,
        interestRate,
        yearsElapsed
      );

      const total = contribution + interest;

      data.push({
        age,
        contribution,
        interest,
        total
      });
    }

    setData(data);
  }, [weeklyContribution]); // rerun the effect whenever the monthly contribution changes

  const handleDrag = (event, info) => {
    const chartWidth = 800;
    const barWidth = chartWidth / (75 - 26 + 1);
    const year = Math.round(info.offset.x / barWidth) + 26;
    setSelectedYear(year);
  };

  const handleWeeklyContributionChange = (event) => {
    const newWeeklyContribution = parseFloat(event.target.value);
    setWeeklyContribution(newWeeklyContribution);
  };

  return (
    <div className="App">
      <h1>Stacked Bar Chart</h1>
      <div>
        <label htmlFor="weeklyContribution">Weekly Contribution:</label>
        <input
          type="number"
          id="weeklyContribution"
          value={weeklyContribution}
          onChange={handleWeeklyContributionChange}
        />
      </div>
      <BarChart
        width={800}
        height={600}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="age" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          content={({ payload, label, active }) => {
            if (active) {
              const { contribution, interest, total } = payload[0].payload;
              return (
                <div style={{ backgroundColor: "white", padding: "5px" }}>
                  <p>Age: {label}</p>
                  <p>Contribution: ${contribution}</p>
                  <p>Interest: ${interest}</p>
                  <p>Estimated Return: ${total}</p>
                </div>
              );
            }
            return null;
          }}
        />

        <Legend />
        <Bar dataKey="contribution" stackId="a" fill="#F27373" />
        <Bar dataKey="interest" stackId="a" fill="#00B2FF" />
        <motion.div
          style={{
            position: "absolute",
            top: "-10px",
            left: `${(selectedYear - 26) * (800 / (75 - 26 + 1)) - 10}px`,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "white",
            border: "2px solid #00B2FF",
            cursor: "pointer"
          }}
          drag="x"
          onDrag={handleDrag}
        />
      </BarChart>
    </div>
  );
}

export default App;
