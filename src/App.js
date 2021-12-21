import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
  }, [username]);

  const handleSubmitted = () => {
    if (username !== "" && submitted) {
      return <p id="result">Hi {username}!</p>;
    } else if (username === "" && submitted) {
      return (
        <>
          <p id="result">Hi stranger!</p>
          <img
            src="https://i.ytimg.com/vi/JmKUpjK3e80/maxresdefault.jpg"
            alt=""
          />
        </>
      );
    }
  };

  return (
    <>
      <h1>Text Generator Interface</h1>

      <div id="greeting-component">
        <label htmlFor="username-input">Username:</label>
        <input
          id="username-input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Please enter your name..."
          value={username}
        />
        <button id="greeting-btn" onClick={() => setSubmitted(true)}>Say hi!</button>

        {handleSubmitted()}
      </div>
    </>
  );
}

export default App;
