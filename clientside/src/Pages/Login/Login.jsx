import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Login.css";

const Loginbox = styled.div`
  width: 25rem;
  height: 25rem;
  background-color: rgb(247, 239, 239);
  margin: 50px auto;
  border-radius: 10px;
  box-shadow: 4px 7px 10px 3px rgba(138, 131, 131, 0.91);
  -webkit-box-shadow: 4px 7px 10px 3px rgba(138, 131, 131, 0.91);
  -moz-box-shadow: 4px 7px 10px 3px rgba(138, 131, 131, 0.91);
  @media (max-width: 400px) {
    width: 90%;
  }
`;

const Heading = styled.h2`
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 2rem;
  font-size: xx-large;
  font-weight: 300;
`;

function Login() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/post/allposts");
      const data = response.json();

      console.log(data);
    };
    fetchData();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleInput = (e) => {
    e.preventDefault();
    const user = { email, password };
    console.log(user);

    fetch("http://localhost:8000/auth/login/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => {
        console.log("User Found successfully!");
      })
      .catch((error) => {
        console.log(error);
      });

    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <Loginbox>
        <Heading> Sign In </Heading>
        <form className="login-form">
          <div className="input">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              autoComplete="none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="input">
            <label>Password:</label>
            <input
              type="text"
              name="password"
              autoComplete="none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
            <input
              className="submitBtn"
              type="submit"
              value="Login"
              onClick={handleInput}
            />

           <p>Don't Have An Account? <Link to={'/register'}><button className="signup-btn">Sign Up</button></Link></p>
        </form>
      </Loginbox>
    </div>
  );
}

export default Login;
