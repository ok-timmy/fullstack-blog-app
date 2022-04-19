import React from 'react'
import styled, { StyledComponent } from 'styled-components'
import "./Header.css"
import {
    Link
  } from "react-router-dom";
// import Blogpage from '../../Pages/Blogs Page/Blogpage';
// import Home from '../../Pages/Home/Home';

const WholeHead = styled.div`
display: flex;
flex-wrap: wrap;
height:10vh;
background-color: wheat;
color: black;
padding: 10px;
`

const HeaderLeft = styled.div`
flex: 1;
`
const HeaderCenter = styled.div`
flex: 2;
`
const HeaderRight = styled.div`
flex: 1;
`

function Header() {
  return (
    <WholeHead>
        <HeaderLeft>Blog Project</HeaderLeft>
        {/* <Router> */}
        <HeaderCenter>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/blog"> Blogs</Link></li>
                    <li><Link to="/publish"> Publish</Link></li>
                    {/* <li><Link to="/Contact">Contact</Link></li> */}
                </ul>
            </nav>

            {/* <Routes>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/blog">
            <Blogpage />
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
        </Routes> */}
        </HeaderCenter>
        {/* </Router> */}
        <HeaderRight>
        <nav>
                <ul>
                    <li><Link to={'/login'}>Login</Link></li>
                    <li><Link to={'/register'}>Sign Up</Link></li>
                </ul>
            </nav>
        </HeaderRight>
    </WholeHead>
  )
}

export default Header