import React from 'react';
import './App.css'
import MyContext from './Mycontext';

function TweetList(props) {
  const { element, currentUser  } = props


  return (
    <MyContext.Consumer >
     {({number}) => (
    <div  className="tweet" key={element.id}>
      <div className='tweetHeader'>
       <h1>{currentUser.userName}</h1>
         <h1>{number}</h1>
      {element.date} <div><img className='profilepicture' src={element.imm}></img></div> </div>
      <div className="tweetFooter">
        {element.tweetText} 
      </div>
    </div>
   )}
    </MyContext.Consumer>
  )
} 
export default TweetList;


