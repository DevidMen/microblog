import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import CreateTweet from './CreateTweet';
import TweetList from './TweetList';
import { useState } from "react";
import {useEffect} from 'react'
import NavBar from './NavBar';


function App() {

  const [tweetList, setTweetList] = useState([])
  const [spinner, setSpinner] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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


  async function renderTweet(value, setTweetText, setdisabledBtn){
    setdisabledBtn(true)
    setSpinner(true)
   const requestOptions = await {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  content: value, userName: "Devid", date: date()})
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

     <CreateTweet 
        renderTweet={renderTweet}
        spinner = {spinner}
        errorMessage = {errorMessage}/>
        
<div className='tweetList'>
  {tweetList.map((element => <TweetList 
  element = {element}
  key = {element.id}  
  />))}
</div> 

</div>
</div>
  )
}

export default App;