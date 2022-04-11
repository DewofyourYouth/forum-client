import { useState } from "react";
import { useStore } from "../../store";

const fetchLoginToken = async (username, password) => {
  const call = await fetch("http://localhost:8000/api-token-auth", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  const result = await call.json();
  return result;
};

export default function LoginForm() {
  const { token, setToken, logOut } = useStore((state) => state);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitLogin = async (e) => {
    e.preventDefault();
    const myToken = await fetchLoginToken(username, password);
    setToken(myToken);
    setUsername("");
    setPassword("");
  };

  if (token) {
    return <button onClick={logOut}>Sign Out</button>;
  }

  return (
    <form style={{ textAlign: "center", padding: "20px" }}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="username">Username</label>
            </td>
            <td>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="password">Password</label>
            </td>
            <td>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button onClick={(e) => submitLogin(e)}>Submit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
