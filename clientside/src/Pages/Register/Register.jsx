// import axios from "axios";
// import axiosInstance from "../../config"
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Register.css";
import { useSignUpMutation } from "../../Redux/Auth/authApiSlice";

const Registerbox = styled.div`
  width: 60vw;
  padding: 0 0 2rem;
  height: 100%;
  background-color: #c2d8da;
  margin: 0 auto;
  border-radius: 10px;

  @media (max-width: 960px) {
    width: 90vw;
  }

  @media (max-width: 600px) {
    width: 90vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Heading = styled.h2`
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: xx-large;
  font-weight: 300;
  margin: 1rem auto 2rem;
  padding: 1rem;
`;

function Register() {
  const [signUp, { isLoading }] = useSignUpMutation();

  const navigation = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [match, setMatch] = useState();
  const [emailValid, setEmailValid] = useState(true);

  const checkPasswordMatch = () => {
    if (password === passwordTwo) {
      setPasswordMsg("Password Match!");
      setMatch(true);
    } else {
      setPasswordMsg("Password Do Not Match!");
      setMatch(false);
    }
  };

  const checkEmail = (emailInput) => {
    // eslint-disable-next-line
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(emailInput)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleInput = async (e) => {
    e.preventDefault();

    if (!firstName || !secondName || !email || !userName || !password) {
      return;
    } else {
      try {
        await signUp({
          firstName,
          secondName,
          userName,
          email,
          password,
        }).unwrap();
        setFirstName("");
        setSecondName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setPasswordTwo("");

        navigation("/login");
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <div className="register-page">
      <Registerbox>
        <Heading> Sign Up </Heading>
        <form className="sign-up-form">
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              autoComplete="off"
              placeholder="John"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="secondName"
              autoComplete="none"
              placeholder="Doe"
              value={secondName}
              onChange={(e) => {
                setSecondName(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="userName"
              autoComplete="none"
              placeholder="John_Doe"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              autoComplete="none"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                checkEmail(e.target.value);
              }}
            />
            {!emailValid && (
              <p className="email-invalid">
                Please Provide a valid email address
              </p>
            )}
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              autoComplete="none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="passwordTwo"
              autoComplete="none"
              value={passwordTwo}
              onChange={(e) => {
                setPasswordTwo(e.target.value);
              }}
              onKeyUp={() => checkPasswordMatch()}
            />
            {passwordMsg && (
              <p
                className={`password-msg ${
                  match ? "match-success" : "match-error"
                }`}
              >
                {passwordMsg}
              </p>
            )}
          </div>
        </form>
        <div className="last-section">
          <button className="submitBtn" onClick={handleInput}>
            {isLoading ? "Loading...." : "Submit"}
          </button>
          <p>
            Have An Account Already?{" "}
            <Link to={"/login"}>
              <button className="login-btn">Login</button>
            </Link>
          </p>
        </div>
      </Registerbox>
    </div>
  );
}

export default Register;
