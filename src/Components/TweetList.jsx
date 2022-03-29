import React from 'react';
import './App.css'

function TweetList(props) {
  const { element, currentUser  } = props

  return (
    <div className="tweet" key={element.id}>
      <div className='tweetHeader'>
       <h1>{currentUser?.userName}</h1>
 
      {element.date} <div><img className='profilepicture' src={element.imm}></img></div> </div>
      <div className="tweetFooter">
        {element.tweetText} 
      </div>
    </div>
  )
} 
export default TweetList;

