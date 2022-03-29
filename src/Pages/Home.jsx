import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTweet from '../Components/CreateTweet';
import TweetList from '../Components/TweetList';
import {useReducer,useRef,useState,useEffect} from 'react'



function Home(props) {

    const {currentUser,tweetList} = props

    return (
                    <div className='tweetList'>
                    <CreateTweet/>
                        {tweetList.map((element => <TweetList
                        
                            element={element}
                            key={element.id}
                           
                          currentUser = {currentUser.find((el) => { return el.key === element.key})}
                        />))}
                    
                </div>

    )
}
export default Home;



  


