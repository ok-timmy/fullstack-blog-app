import React, { useContext } from "react";
import styled from "styled-components";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";

const WholeHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 10vh;
  background-color: transparent;
  color: black;
  padding: 10px;
`;

const HeaderLeft = styled.div`
  flex: 1;
`;
const HeaderCenter = styled.div`
  flex: 2;
`;
const HeaderRight = styled.div`
  flex: 1;
`;


function Header() {
  const { user, dispatch } = useContext(Context);
  const navigation = useNavigate();

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigation("/");
  };

  return (
    <WholeHead>
      <HeaderLeft>Blog Project</HeaderLeft>
      <HeaderCenter>
        <nav>
          <ul>
            <li>
              <Link to="/" className="link">Home</Link>
            </li>
            <li>
              <Link to="/blog" className="link"> Blogs</Link>
            </li>
            {user && (
              <li>
                <Link to="/publish" className="link"> Publish</Link>
              </li>
            )}
          </ul>
        </nav>
      </HeaderCenter>
      <HeaderRight>
        <nav>
          {user ? (
            <ul>
              <li>
                {" "}
                <Link to={"/profile"} className='link' style={{border:"none", textDecoration:"none"}}>{user.userName} </Link>
              </li>
              <li>
                {" "}
                <button onClick={handleLogOut}>Logout </button>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to={"/login"} className='link'>Login</Link>
              </li>
              <li>
                <Link to={"/register"} className='link'>Sign Up</Link>
              </li>
            </ul>
          )}
        </nav>
      </HeaderRight>
    </WholeHead>
  );
}

export default Header;
