import React, { useContext } from "react";
import styled from "styled-components";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import avatar from "../../assets/avatar.png";
import { useState, useRef, useCallback } from "react";

const WholeHead = styled.div`
  position: fixed;
  width: 100%;
  z-index: 100;
  position: fixed;
  align-content: center;
  top:0;
  display: flex;
  flex-wrap: wrap;
  height: 12vh;
  background-color: whitesmoke;
  color: black;
  padding: 15px 10px;

  @media screen and (max-width: 600px) {
    height : 10vh;
  }

  @media screen and (max-width: 960px) {
    height : 10vh;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
`;
const HeaderCenter = styled.div`
  flex: 2;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media screen and (max-width: 960px) {
    flex:3
  }
`;
const HeaderRight = styled.div`
  flex: 1;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media screen and (max-width: 960px) {
    flex: 2;
  }
`;

const MobileNav = styled.div`
  width: 50vw;
  height: 100%;
  left: 0px;
  position: fixed;
  background: white;
  z-index: 999;
  top: 0px;
  padding-bottom: 10rem;
  padding-left: 10%;
  padding-top: 5rem;
  justify-content: space-between;
  flex-direction: column;
  transition: all 0.5s;
  transform: translateX(-100%);
  display: flex;
  @media screen and (max-width: 600px) {
    transform: ${({ isMobileNav }) => (isMobileNav ? "translateX(0)" : "")};
  }
`;

const ToggleIcon = styled.div`
  position: relative;
  opacity: 1;
  margin-top: 20px;
  &,
  &::before,
  &::after {
    width: 4rem;
    height: 2px;
    background-color: black;
    z-index: 1200;
    display: none;
    @media screen and (max-width: 600px) {
      display: inline-block;
    }
  }
  & {
    background-color: ${(props) => (props.isMobileNav ? "transparent" : "")};
  }
  &::before,
  &::after {
    content: "";
    position: absolute;
    transition: all 0.2s;
    top: 0px;
  }
  &::before {
    top: ${(props) => (props.isMobileNav ? "0" : "-.8rem")};
    transform: ${(props) => (props.isMobileNav ? "rotate(135deg)" : "")};
  }
  &::after {
    top: ${(props) => (props.isMobileNav ? "0" : ".8rem")};
    transform: ${(props) => (props.isMobileNav ? "rotate(-135deg)" : "")};
  }
`;

function Header() {
  const { user, dispatch } = useContext(Context);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const node = useRef();

  const onToggleMobileNav = useCallback(() => {
    if (!isMobileNav) {
      setIsMobileNav(true);
    } else setIsMobileNav(false);
  }, [isMobileNav]);

  const navigation = useNavigate();

  const pf = "http://localhost:8000/public/";

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    navigation("/");
  };

  return (
    <>
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
                {user && (
                  <li>
                    {" "}
                    <span className="user">
                      <Link to={"/profile"} className="profile-link">
                        {user.image ? (
                          <img
                            src={pf + user.image}
                            alt={user.userName}
                            className="user-pic"
                          />
                        ) : (
                          <img src={avatar} alt={avatar} className="user-pic" />
                        )}
                      </Link>
                    </span>
                  </li>
                )}
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
        <ToggleIcon onClick={onToggleMobileNav} isMobileNav={isMobileNav} />
      </WholeHead>

      <MobileNav isMobileNav={isMobileNav} ref={node}>
        <h3>Blog Project</h3>
        {user ? (
          <>
            {user && (
              <li>
                {" "}
                <span className="user">
                  <Link to={"/profile"} className="link">
                    {user.image ? (
                      <img
                        src={pf + user.image}
                        alt={user.userName}
                        className="user-pic"
                      />
                    ) : (
                      <img src={avatar} alt={avatar} className="user-pic" />
                    )}
                  </Link>
                </span>
              </li>
            )}
            <li>
              <button onClick={handleLogOut}>Logout </button>
            </li>
          </>
        ) : (
          <>
            <Link to={"/login"} className="link">
              Login
            </Link>

            <Link to={"/register"} className="link">
              Sign Up
            </Link>
          </>
        )}
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/blog" className="link">
          {" "}
          Blogs
        </Link>
        <Link to="/publish" className="link">
          {" "}
          Publish
        </Link>
      </MobileNav>
    </>
  );
}

export default Header;
