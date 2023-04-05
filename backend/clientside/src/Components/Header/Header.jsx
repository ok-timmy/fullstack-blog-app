import React from "react";
import styled from "styled-components";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { useSignOutMutation } from "../../Redux/Auth/authApiSlice";
import { logOut, setCurrentUser } from "../../Redux/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const WholeHead = styled.div`
  width: 100%;
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  height: 12vh;
  background-color: whitesmoke;
  color: black;
  vertical-align: middle;

  @media screen and (max-width: 600px) {
    height: 10vh;
  }

  @media screen and (max-width: 960px) {
    height: 10vh;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
  color: #2a8798;
  font-weight: bold;
  letter-spacing: 5px;
  font-size: 2rem;
  padding-left: 1rem;
`;
const HeaderCenter = styled.div`
  flex: 2;
  vertical-align: middle;
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media screen and (max-width: 960px) {
    flex: 3;
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
  const [signOut] = useSignOutMutation();
  const [isMobileNav, setIsMobileNav] = useState(false);
  const node = useRef();
  const user = useSelector(setCurrentUser);
  console.log(user);

  const onToggleMobileNav = useCallback(() => {
    if (!isMobileNav) {
      setIsMobileNav(true);
    } else setIsMobileNav(false);
  }, [isMobileNav]);

  const dispatch = useDispatch();

  const logOutUser = async () => {
    await signOut().unwrap();
    dispatch(logOut());
  };

  return (
    <>
      <WholeHead>
        <HeaderLeft>JIGI</HeaderLeft>
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
                  <span className="user">
                    <Link to={"/profile"} className="profile-link">
                      <img
                        src={user.image}
                        alt={user.userName}
                        className="user-pic"
                      />
                    </Link>
                  </span>
                </li>
                <li>
                  {" "}
                  <button onClick={logOutUser}>Logout </button>
                </li>
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
            <li>
              {" "}
              <span className="user">
                <Link to={"/profile"} className="link">
                  <img
                    src={user.image}
                    alt={user.userName}
                    className="user-pic"
                  />
                </Link>
              </span>
            </li>

            <li>
              <button onClick={logOutUser}>Logout </button>
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
