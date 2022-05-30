import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/App.css'
import { useState } from "react";
import { useEffect } from 'react'
import NavBar from './Components/NavBar';
import {
  Routes,
  Route,
} from "react-router-dom";
import Profile from './Pages/Profile';
import Home from './Pages/Home'
import Login from './Pages/Login';
import { collection, orderBy, onSnapshot, query, limit, getDocs } from 'firebase/firestore'
import { db , auth } from './Firebase-config'
import SignUp from './Pages/SignUp';
import MyContext from './Components/Mycontext';
import { signOut } from "firebase/auth";

function App() {

  const [tweetList, setTweetList] = useState([])
  const [errorMessage] = useState("")
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))
  
  const collectionRef = collection(db, 'twitter')
  const collectionSorted = query(collectionRef, orderBy("date", "desc"))

 
  useEffect(() => {
    const unsubscribe =
      onSnapshot(collectionSorted, (snapshot) =>{
        setTweetList(snapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id})))
   
      })
    return ()=> {

      unsubscribe()
    }
   
  }, [])
  

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
      
    });
  };

  useEffect(() => {
    if(!isAuth && window.location.pathname !== ('/login')){
          window.location.pathname = ('/login')
    }
  },[])


  const [currentUser, setArrayOfUsers] = useState([])
    const userCollectionRef = collection(db, "users")
    useEffect(() => {
      const getusers = async () => {
        const data = await getDocs(userCollectionRef);
        let userArray = []
        data.forEach((doc) => {
          userArray.unshift({
            userName:doc.data().userName,
            key:doc.data().key
          })
        })
        console.log(userArray)
        setArrayOfUsers(userArray)
      };
      getusers()
    }, []);
const [number , setnumber] = useState(2)


    
  return (
    <div>
      <NavBar isAuth={isAuth} setIsAuth={setIsAuth} signUserOut={signUserOut} currentUser={currentUser} />
      <div className='container'>

<MyContext.Provider value={{number}}>

          <Routes>

            <Route path="/login" element={<Login setIsAuth={setIsAuth} currentUser = {currentUser}/>} />

            <Route path="/signup" element={<SignUp setIsAuth={setIsAuth} currentUser = {currentUser}/>} />

            <Route path='/' element={<Home  errorMessage={errorMessage} currentUser={currentUser} tweetList={tweetList}/>} />

            <Route path="/profile" element={<Profile />} />

          </Routes>
  
          </MyContext.Provider>
      </div>
    </div>
  )
}

export default App;