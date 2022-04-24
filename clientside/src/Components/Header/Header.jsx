import React, { useContext } from 'react'
import styled from 'styled-components'
import "./Header.css"
import {
    Link
  } from "react-router-dom";
import { Context } from '../../Context/Context';
 
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

  const {user} = useContext(Context);

  return (
    <WholeHead>
        <HeaderLeft>Blog Project</HeaderLeft>
        <HeaderCenter>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/blog"> Blogs</Link></li>
                   {user && <li><Link to="/publish"> Publish</Link></li>}
                </ul>
            </nav>
        </HeaderCenter>
        <HeaderRight>
        <nav>{ user? <ul>

         <li> <Link to={'/profile'}>{user.userName}</Link></li>
         <li> <Link to={'/'}>Logout</Link></li>
        
        </ul>:
                <ul>
                    <li><Link to={'/login'}>Login</Link></li>
                    <li><Link to={'/register'}>Sign Up</Link></li>
                </ul>}
            </nav>
        </HeaderRight>
    </WholeHead>
  )
}

export default Header