import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../../Context/Context";
import "./Login.css";
import background from "../../assets/asset-1.webp"

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 5rem;
  background:rgba(57, 57, 57, 0.7) url(${background});
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;

  @media (max-width: 480px) {
    height: 95vh;
  }
`;

const Loginbox = styled.div`
  width: 25rem;
  height: 25rem;
  background-color: #FAF7FF;
  margin: 50px auto;
  border-radius: 10px;
  @media (max-width: 480px) {
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
  const navigation = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const { dispatch, isFetching } = useContext(Context);

  const handleInput = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios
        .post("http://localhost:8000/api/auth/login/", {
          email,
          password,
        })
        .catch((error) => {
          console.log(error);
        });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.others });

      setEmail("");
      setPassword("");
      navigation("/");

      console.log(res.data);
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      setIsError(true);
    }
  };

  return (
    <LoginDiv>
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
              onFocus={() => setIsError(false)}
            />
          </div>

          <div className="input">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              autoComplete="none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onFocus={() => setIsError(false)}
            />
          </div>
          <input
            className="submitBtn"
            type="submit"
            value="Login"
            onClick={handleInput}
            style={{cursor: `${isFetching ? "not-allowed" : "pointer"}`}}
          />
          <span
            style={{ opacity: `${isError ? "1" : "0"}` }}
            className="login__error"
          >
            Incorrect Credentials
          </span>

          <p>
            Don't Have An Account?{" "}
            <Link to={"/register"}>
              <button className="signup-btn">Sign Up</button>
            </Link>
          </p>
        </form>
      </Loginbox>
    </LoginDiv>
  );
}

export default Login;
