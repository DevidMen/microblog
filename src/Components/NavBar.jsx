
import { NavLink } from "react-router-dom";
import { useAuth, auth} from "../Firebase-config";
import {onAuthStateChanged} from 'firebase/auth'
import { useEffect ,useState } from "react";

import './App.css'


const NavBar = (props) => {
    const {isAuth, signUserOut} = props
    const [currentUser,setCurrentUser] = useState();


    useEffect(() => {
        onAuthStateChanged(auth, currentUser => setCurrentUser(currentUser));

      },[currentUser])
    
       
    


    return (
        <div className='navbar'>
            <ul className='navbarUl'>
                {!isAuth?<>
                 <li className='navbarLi'>  <NavLink to="/login">Sign in</NavLink></li>
                 <li className='navbarLi'>  <NavLink to="/signup">SignUp</NavLink></li>
                 </>:
                 <>
                <li className='navbarLi'><NavLink to="/">Home</NavLink> </li>
                <li className='navbarLi'><NavLink to="/profile">Profile</NavLink></li>
         
                <div className="navbaraside">
                <button className="logoutbtn" onClick={signUserOut}>Logout</button>
                <h6>{currentUser?.email}</h6> 
                </div></>}
                 </ul>
        </div>
    );
}

export default NavBar;





