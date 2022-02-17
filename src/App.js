import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window.ethereum == "undefined") {
      alert("You dont have a wallet");
    } else {
      requestAccount();
    }
  }, []);
  const requestAccount = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
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
