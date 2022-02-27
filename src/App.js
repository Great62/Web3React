import "./App.css";
import { useEffect, useState } from "react";
import { init, getTotalSupply } from "./Web3client";

let erc20Contract;

function App() {
  const providerUrl = process.env.PROVIDER_URL;

  const [TotalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    init();
  }, []);

  const fetchTotalSupply = () => [
    getTotalSupply()
      .then((TotalSupply) => {
        setTotalSupply(TotalSupply);
      })
      .catch((err) => {
        console.log(err);
      }),
  ];

  return (
    <div>
      <div>The total supply is {TotalSupply}</div>
      <button onClick={fetchTotalSupply}>refresh</button>
    </div>
  );
}

export default App;
