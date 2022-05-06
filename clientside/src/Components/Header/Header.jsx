import React, { useContext } from "react";
import styled from "styled-components";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import avatar from "../../assets/avatar.png";

const WholeHead = styled.div`
position:fixed;
width:100%;
z-index: 10;
  display: flex;
  flex-wrap: wrap;
  height: 10vh;
  background-color: whitesmoke;
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

  
  const pf = "http://localhost:8000/public/";

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
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="link">
                {" "}
                Blogs
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/publish" className="link">
                  {" "}
                  Publish
                </Link>
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
                <button onClick={handleLogOut}>Logout </button>
              </li>
              {user && <li>
                {" "}<span className="user">
                <Link to={"/profile"} className="link">
                  {user.image ? (
                    <img
                      src={pf+user.image}
                      alt={user.userName}
                      className="user-pic"
                    />
                  ) : (
                    <img src={avatar} alt={avatar} className="user-pic" />
                  )}
                </Link>
                </span>
              </li>}
            </ul>
          ) : (
            <ul>
              <li>
                <Link to={"/login"} className="link">
                  Login
                </Link>
              </li>
              <li>
                <Link to={"/register"} className="link">
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </HeaderRight>
    </WholeHead>
  );
}

export default Header;
