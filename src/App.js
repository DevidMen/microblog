import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/App.css'
import { useState } from "react";
import {useEffect} from 'react'
import NavBar from './Components/NavBar';
import {
  Routes,
  Route,
} from "react-router-dom";
import Profile from './Pages/Profile';
import Home from './Pages/Home'

function App() {

  const [tweetList, setTweetList] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [tweetUsername , setTweetUsername] = useState('')

    const fetchData = async () => {
      setSpinner(true)
      const response = await fetch(`https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`);
      const data = await response.json();
      setTweetList(data.tweets)
      setSpinner(false)
    }
  useEffect(() => {
    fetchData()

  }, [])
  setInterval(() => {name()
    
  }, 500);

  function name(){
    const tweetUsername = JSON.parse(
      localStorage.getItem('react-tweet-username')
  )
  if(tweetUsername){
   setTweetUsername(tweetUsername)
   }
  }
   useEffect(() => {
   name()
},[tweetUsername])


  async function renderTweet(value, setTweetText, setdisabledBtn){
    setdisabledBtn(true)
    setSpinner(true)
   const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  content: value, userName: tweetUsername, date: date()})
  };
    const response = await fetch(`https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`, requestOptions);
    const data = await response.json();
    if(!response.ok){
      setErrorMessage(data.message)
    }
    else{
      setErrorMessage("")
    }
    fetchData()
    setSpinner(false)
    setdisabledBtn(false)
    setTweetText("")
  }
  function date(){
    const today = new Date();
    const date = today.toISOString()
    return date
    }

  return (
<div>
    <NavBar/>
    <div className='container'>

    
    <Routes>

      <Route path="/" element={<Home renderTweet={renderTweet} tweetList = {tweetList} spinner={spinner} errorMessage={errorMessage}/>}/>

        <Route path="/profile" element={<Profile />} />
  
    </Routes>
  

</div>
</div>
  )
}

export default App;