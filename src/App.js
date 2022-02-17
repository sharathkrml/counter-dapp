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

  const increment = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const CounterContract = new ethers.Contract(ADDRESS, ABI, signer);
    const txn = await CounterContract.increment();
    setCount("👆👆👆");
    await txn.wait();
    getCount();
  };
  const decrement = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const CounterContract = new ethers.Contract(ADDRESS, ABI, signer);
    const txn = await CounterContract.decrement();
    setCount("👇👇👇");
    await txn.wait();
    getCount();
  };
  return (
    <div className="App">
      <button onClick={increment}>Increment</button>
      <div>{count}</div>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default App;
