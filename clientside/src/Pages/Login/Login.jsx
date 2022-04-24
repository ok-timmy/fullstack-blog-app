import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../../Context/Context";
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
 
  const navigation = useNavigate();
  // const [error, setError] = useState(false)


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, dispatch, isFetching} = useContext(Context);


  const handleInput = async(e) => {
    e.preventDefault();
    const userCredentials = { email, password };
    console.log(userCredentials);
    dispatch({type:"LOGIN_START"})
try{
    const res = await axios.post("http://localhost:8000/api/auth/login/", {
      email, password
    })
    dispatch({type:"LOGIN_SUCCESS", payload: res.data.others})

  console.log(res.data);

}
catch(error) {
  dispatch({type:"LOGIN_FAILURE"})
  console.log(error.message);
  // setError(true);
};
navigation('/')

    setEmail("");
    setPassword("");
  };

  console.log(isFetching);
  console.log(user);
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
              type="password"
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
