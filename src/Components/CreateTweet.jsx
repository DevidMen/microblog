import React from 'react';
import './App.css'
import { useState } from "react";
import MyContext from '../Components/Mycontext';


function CreateTweet(props) {

  const { loading, errorMessage } = props
  const [tweetText, setTweetText] = useState('')
  const [disabledBtn, setdisabledBtn] = useState(false)

  return (
    <MyContext.Consumer>
      {({ renderTweet }) => (
        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <textarea onChange={(e) => setTweetText(e.target.value)} value={tweetText} placeholder="What you have in mind..."></textarea>
            {tweetText.length >= 140
              ? <div className='errorMessage'>
                The tweet can't contain more then 140 chars</div>
              : ""}
            <div className='buttondiv'>
              <button disabled={tweetText.length > 140 || 0 ? true : disabledBtn} onClick={() => renderTweet(tweetText, setTweetText, setdisabledBtn)} id="button">Tweet</button>
            </div>
          </form>

          {errorMessage.length > 0 ? <h4>{errorMessage}</h4> : ""}
          {loading ?
            <div className="d-flex justify-content-center">
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only d-flex"></span>
              </div>
            </div>
            : ""}
        </div>
      )}
    </MyContext.Consumer>
  )
}
export default CreateTweet;