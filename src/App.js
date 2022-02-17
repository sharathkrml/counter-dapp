import "./App.css";
import { useState, useEffect } from "react";
import { ABI, ADDRESS } from "./const";
import { ethers } from "ethers";
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window.ethereum == "undefined") {
      alert("You dont have a wallet");
    } else {
      requestAccount();
      getCount();
    }
  }, []);
  const requestAccount = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  };

  const getCount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const CounterContract = new ethers.Contract(ADDRESS, ABI, provider);
    try {
      const data = await CounterContract.count();
      setCount(data.toString());
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };
  return (
    <div className="App">
      <button onClick={increment}>Increment</button>
      <div>{count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={() => requestAccount()}>Connect Wallet</button>
    </div>
  );
}

export default App;
