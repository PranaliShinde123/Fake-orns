import { useState } from "react";
import { AgeBars } from "./Bar_Age.tsx";
import { ContributionChanger } from "./ContributionChanger.tsx";

import "./styles.css";

export default function App() {
  const [amount, setAmount] = useState(50);
  return (
    <>
      <ContributionChanger initialAmount={amount} onChange={setAmount} />
    </>
  );
}
