import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Register.css";

const Registerbox = styled.div`
	width: 25rem;
	height: 100%;
    background-color: rgb(247, 239, 239);
	margin: 4rem auto;
	border-radius: 10px;
	box-shadow: 4px 7px 10px 3px rgba(138,131,131,0.91);
-webkit-box-shadow: 4px 7px 10px 3px rgba(138,131,131,0.91);
-moz-box-shadow: 4px 7px 10px 3px rgba(138,131,131,0.91);
@media (max-width: 400px) {
    width: 90%;
  }
`;

const Heading = styled.h2`
	display: flex;
	justify-content: center;
	align-content: center;
	font-size: xx-large;
	font-weight: 300;
	margin: 1rem auto 2rem
`;

function Register() {

	const navigation = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [secondName, setSecondName] = useState("");
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleInput = async(e) => {
		e.preventDefault();
		const user = { firstName, secondName, email, password, userName };
		console.log(user);

		try{
			const res = await axios.post('http://localhost:8000/api/auth/register', user)
			console.log(res.data);
		}
		catch(error) {
			console.log(error.message);
		};
		
		setFirstName("");
		setSecondName("");
		setUserName("");
		setEmail("");
		setPassword("");
		navigation('/login')
	};
	return (
		<div>
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
							}}
						/>
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

					<input className="submitBtn" type="submit" value="Submit" onClick={handleInput} />
					<p>Have An Account Already? <Link to={'/login'}><button className="login-btn">Login</button></Link></p>
				</form>
			</Registerbox>
		</div>
	);
}

export default Register;
