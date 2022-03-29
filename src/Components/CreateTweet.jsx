
import './App.css'
import { useState,useEffect } from "react";
import { addDoc, collection}  from 'firebase/firestore'
import {db, auth} from '../Firebase-config'




function CreateTweet(props) {

  const {errorMessage } = props
  const [tweetText, setTweetText] = useState('')
  const [disabledBtn, setdisabledBtn] = useState(false)
  const [tweetUsername, setTweetUsername] = useState('')
  const [loading, setLoading] = useState(false)
  

 
  const tweetCollection = collection(db, "twitter")


  const createTweet = async () => {
    setLoading(true)
      await addDoc(tweetCollection, {tweetText, date: date(), name: tweetUsername||auth.currentUser.displayName || auth.currentUser.email, key: auth.currentUser.uid, imm: auth.currentUser.photoURL })
      setTweetText('')
      setLoading(false)
  }
  
  function date() {
    const today = new Date();
    const date = today.toISOString()
    return date
  }
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
 


  return (

        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <textarea onChange={(e) => setTweetText(e.target.value)} value={tweetText} placeholder="What you have in mind..."></textarea>
            <div className='buttondiv'>
              <button onClick={() => createTweet(tweetText, setTweetText, setdisabledBtn)} id="button">Tweet</button>
            </div>
          </form>
          {loading ?
            <div className="d-flex justify-content-center">
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only d-flex"></span>
              </div>
            </div>
            : ""}
        </div>

  )
}
export default CreateTweet;