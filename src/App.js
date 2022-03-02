import "./App.css";
import { useEffect, useState } from "react";
import {
  init,
  getTotalSupply,
  getTotalBurn,
  getLiquidityTJ,
} from "./Web3client";

function App() {
  const [TotalSupply, setTotalSupply] = useState(0);
  const [TotalBurn, setTotalBurn] = useState(0);
  const [poolLiquidity1, setpoolLiquidity1] = useState([]);
  const [poolLiquidity2, setpoolLiquidity2] = useState([]);

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
  const fetchTotalPoolLiquidity = () => [
    getLiquidityTJ()
      .then((poolLiquidity) => {
        setpoolLiquidity1(poolLiquidity[0]);
        setpoolLiquidity2(poolLiquidity[1]);
        console.log(poolLiquidity);
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
      <div>
        The total traderJoe liqui for the kioo token is {poolLiquidity1} and the
        wavax {poolLiquidity2}{" "}
      </div>
      <button onClick={fetchTotalPoolLiquidity}>refresh</button>
    </div>
  );
}

export default App;
