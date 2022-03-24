import React from 'react';
import './App.css'

function TweetList(props) {

  const { element } = props
  return (
    <div className="tweet" key={element.id}>
      <div className='tweetHeader'><h1>{element.userName}</h1>{element.date} </div>
      <div className="tweetFooter">
        {element.content}
      </div>
    </div>
  )
}
export default TweetList;
