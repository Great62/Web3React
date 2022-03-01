import "./App.css";
import { useEffect, useState } from "react";
import {
  init,
  getTotalSupply,
  getTotalBurn,
  getLiquidityTJ,
} from "./Web3client";

let erc20Contract;

function App() {
  const providerUrl = process.env.PROVIDER_URL;

  const [TotalSupply, setTotalSupply] = useState(0);
  const [TotalBurn, setTotalBurn] = useState(0);
  const [poolLiuqidity, setpoolLiquidity] = useState(0);

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
  const fetchTotalBurn = () => [
    getTotalBurn()
      .then((TotalBurn) => {
        setTotalBurn(TotalBurn);
      })
      .catch((err) => {
        console.log(err);
      }),
  ];
  const fetchTotalPoolLiuqidity = () => [
    getLiquidityTJ()
      .then((poolLiuqidity) => {
        setpoolLiquidity(poolLiuqidity);
      })
      .catch((err) => {
        console.log(err);
      }),
  ];

  return (
    <div>
      <div>The total supply is {TotalSupply} </div>
      <button onClick={fetchTotalSupply}>refresh</button>
      <div>The total burn is {TotalBurn} </div>
      <button onClick={fetchTotalBurn}>refresh</button>
      <div>The total burn is {TotalBurn * 3} </div>
      <button onClick={fetchTotalBurn}>refresh</button>
      <div>The total traderJoe liqui is {poolLiuqidity} </div>
      <button onClick={fetchTotalPoolLiuqidity}>refresh</button>
    </div>
  );
}

export default App;
