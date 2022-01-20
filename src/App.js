import { useState, useEffect } from "react";
import environment from "./config/environment.json";
import "./App.css";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const apiBaseUrl = environment[process.env.NODE_ENV].api_url;

  const handleSubmitted = () => {
    if (username !== "" && submitted) {
      return <p id="result">{message}</p>;
    } else if (username === "" && submitted) {
      return (
        <>
          <p id="result">{message}</p>
          <img
            src="https://i.ytimg.com/vi/JmKUpjK3e80/maxresdefault.jpg"
            alt=""
          />
        </>
      );
    }
  };

  const getMessage = (event) => {
    event.preventDefault();
    (async () => {
      const result = await axios.get(
        `${apiBaseUrl}/greeting/${username.length > 0 ? username : ""}`
      );
      console.log(result);

      setMessage(
        result.status === 200 ? result.data : "Could not retrieve message."
      );
    })();
  };

  return (
    <>
      <h1>Text Generator Interface</h1>

      <div id="greeting-component">
        <form onSubmit={getMessage}>
          <label htmlFor="username-input">Username:</label>
          <input
            id="username-input"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Please enter your name..."
            value={username}
          />
          <button id="greeting-btn" onClick={() => setSubmitted(true)}>
            Say hi!
          </button>
          {handleSubmitted()}
        </form>
      </div>
      <footer>Environment: {process.env.NODE_ENV}</footer>
    </>
  );
}

export default App;
