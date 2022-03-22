import React from 'react';
import './App.css'
import { useState } from "react";

 
function CreateTweet(props){

  const {renderTweet,spinner,errorMessage} = props
  const [tweetText , setTweetText] = useState('')
  const [disabledBtn, setdisabledBtn] = useState(false)

return (
        <div>
        <form onSubmit={(e) => e.preventDefault()}>
      <textarea  onChange={(e) => setTweetText(e.target.value)} value={tweetText} placeholder="What you have in mind..."></textarea>
      {tweetText.length >= 140
            ? <div className='errorMessage'>
          The tweet can't contain more then 140 chars</div>
            : ""}
        <button disabled= {tweetText.length > 140 || 0 ? true : disabledBtn} onClick={ () => renderTweet(tweetText, setTweetText,setdisabledBtn ) } id="button">Tweet</button>
      </form>
      
      {errorMessage.length>0?<h1 className="alert alert-primary">{errorMessage}</h1>:""}
        {spinner?
    <div className="d-flex justify-content-center">
      <div className="spinner-grow text-primary" role="status">
  <span className="sr-only d-flex"></span>
</div>
    </div>
  :""}
    </div>
    )
}
export default CreateTweet;