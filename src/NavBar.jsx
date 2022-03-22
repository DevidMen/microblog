import React from 'react';
import './App.css'
import App from './App'
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

 const NavBar = () => {
    return (
       <div className='navbar'>
           <ul className='navbarUl'>
               <li className='navbarLi'><a href='./'>Home</a></li>
               <li className='navbarLi'><a href='Profile'>Profile</a></li>
           </ul>
       </div>
    );
}
 
export default NavBar;
