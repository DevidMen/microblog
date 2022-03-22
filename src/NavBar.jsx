import React from 'react';
import './App.css'


 const NavBar = () => {
    return (
       <div className='navbar'>
           <ul className='navbarUl'>
               <li className='navbarLi'><a href='/'>Home</a></li>
               <li className='navbarLi'><a href='/Profile'>Profile</a></li>
           </ul>
       </div>
    );
}
 
export default NavBar;
