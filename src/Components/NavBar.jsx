import React from 'react';
import { Link } from "react-router-dom";
import './App.css'


 const NavBar = () => {
    return (
       <div className='navbar'>
           <ul className='navbarUl'>
               <li className='navbarLi'><Link to="/">Home</Link> </li>
               <li className='navbarLi'><Link to="/profile">Profile</Link></li>
           </ul>
       </div>
    );
}
 
export default NavBar;
