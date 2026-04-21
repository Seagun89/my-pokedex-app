import React, { useState } from "react";
import "./Login.css";

interface LoginResponse {
    token: string;
}

const Login: React.FC = () => {
  const [userName, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorBanner, setError] = useState<boolean>(false);
  
  let errorMessage = "Invalid Username or Password";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    console.log({ userName, password });

    fetch("http://localhost:5088/Account/Login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
    }).then(async (response) => {
        if(!response.ok){
            throw new Error("login failed.")
        }

        const data: LoginResponse = await response.json();
        sessionStorage.setItem("JWT", data.token);
        console.log('Login successful.');

    }).catch(() => {
        setError(true);
        console.log(`Login Failed: ${errorMessage}`);
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Pokedex</h2>

        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <input
              type="userName"
              placeholder="Username"
              className="login-input"
              value={userName}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className="login-input-group">
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorBanner && <p className="login-error">{errorMessage}</p>}
          <button className="login-button" type="submit" >
            Login
          </button>
          
        </form>

        <div className="login-footer">
          <span>No account? </span>
          <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;