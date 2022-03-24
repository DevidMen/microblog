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
import MyContext from './Components/Mycontext';
import { v4 as uuidv4 } from "uuid";

function App() {

  const [tweetUsername, setTweetUsername] = useState('')
  const [tweetList, setTweetList] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")


  const fetchData = async () => {
    setLoading(false)
    const response = await fetch(`https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`);
    const data = await response.json();
    setTweetList(data.tweets)
  }


  useEffect(() => {
    fetchData()

  }, [])

  function updateUser(){
    
    const tweetUsername = JSON.parse(
      localStorage.getItem('react-tweet-username')
    )
    if (tweetUsername) {
      setTweetUsername(tweetUsername)
    }
  }

  useEffect(() => {
    updateUser()
  }, )



  async function renderTweet(value, setTweetText, setdisabledBtn) {
    updateUser()
    setTweetUsername(tweetUsername)
    setdisabledBtn(true)
    setLoading(true)


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: value, userName: tweetUsername, date: date() })
    };
    const response = await fetch(`https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`, requestOptions);
    const data = await response.json();
    setLoading(false)
    if (!response.ok) {
      setErrorMessage(data.message)
    }
    else {
      setErrorMessage("")
    }
    const newtweet = [{ id: uuidv4(), content: value, userName: tweetUsername, date: date() }].concat(tweetList)
    setTweetList(newtweet)
    setLoading(false)
    setdisabledBtn(false)
    setTweetText("")
  }
  useEffect(() => {
    setLoading(true)
    const interval = setInterval(() => fetchData()
      , 3000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  function date() {
    const today = new Date();
    const date = today.toISOString()
    return date
  }



  return (
    <div>
      <NavBar />
      <div className='container'>
 
        <MyContext.Provider value={{
          tweetList, renderTweet,setTweetUsername,tweetUsername
        }}>
          <Routes>

            <Route path="/" element={<Home loading={loading} errorMessage={errorMessage} />} />

            <Route path="/profile" element={<Profile  />} />

          </Routes>
        </MyContext.Provider>

      </div>
    </div>
  )
}

export default App;