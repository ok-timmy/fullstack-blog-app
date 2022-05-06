import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../../Context/Context";
import "./Login.css";

const LoginDiv = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 480px) {
    height: 80vh;
  }
`;

const Loginbox = styled.div`
  width: 25rem;
  height: 25rem;
  background-color: rgb(247, 239, 239);
  margin: 50px auto;
  border-radius: 10px;
  box-shadow: 4px 7px 10px 3px rgba(138, 131, 131, 0.91);
  -webkit-box-shadow: 4px 7px 10px 3px rgba(138, 131, 131, 0.91);
  -moz-box-shadow: 4px 7px 10px 3px rgba(138, 131, 131, 0.91);
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
  const { dispatch } = useContext(Context);

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

  // console.log(isFetching);
  // console.log(user);
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
