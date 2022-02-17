import './App.css'
import { useState } from "react";
function App() {
  const [count, setCount] = useState(0);

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
    </div>
  );
}

export default App;
