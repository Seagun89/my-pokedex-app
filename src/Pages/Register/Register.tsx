import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [userName, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorBanner, setError] = useState<boolean>(false);
  
  let errorMessage = "Invalid Username or Password";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    console.log({ email, userName, password });

    fetch("http://localhost:5088/Account/Register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, userName, password, claims: [{"role": "User"}] }),
    }).then(async (response) => {
        if (!response.ok) throw new Error("Register failed."); 
        navigate("/login");
    }).catch(() => {
        setError(true);
        console.log(`Register Failed: ${errorMessage}`);
    });
  };

  return (
    <div className="Register-container">
      <div className="Register-card">
        <h2 className="Register-title">Pokedex</h2>

        <form onSubmit={handleSubmit}>
            <div className="Register-input-group">
            <input
              type="text"
              placeholder="Email"
              className="Register-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="Register-input-group">
            <input
              type="text"
              placeholder="Username"
              className="Register-input"
              value={userName}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>

          <div className="Register-input-group">
            <input
              type="text"
              placeholder="Password"
              className="Register-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorBanner && <p className="Register-error">{errorMessage}</p>}
          <button className="Register-button" type="submit">
            Register
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Register;