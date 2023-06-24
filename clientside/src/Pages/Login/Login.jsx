import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInMutation } from "../../Redux/Auth/authApiSlice";
import styled from "styled-components";
import "./Login.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/Auth/authSlice";

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;

  @media (max-width: 480px) {
    height: 95vh;
    padding-top: 0.5rem;
  }
`;

const Loginbox = styled.div`
  width: 25rem;
  height: 25rem;
  background-color: #c2d8da;
  margin: 25px auto;
  border-radius: 10px;
  padding-top: 1rem;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signIn, { isLoading }] = useSignInMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInput = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setIsError(true);
      return;
    } else {
      const userData = await signIn({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      setEmail("");
      setPassword("");
      navigate("/blog");
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
            value={isLoading ? "Loading...." : "Login"}
            onClick={handleInput}
            style={{ cursor: `${isLoading ? "not-allowed" : "pointer"}` }}
          />
          <span
            style={{ opacity: `${isError ? "1" : "0"}` }}
            className="login__error"
          >
            Please Provide Your Correct Credentials
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
