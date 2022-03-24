import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react'

function Profile(){

    const [tweetName, setTweetname] = useState('')
  
   

    return (
        <div>
        <h1>Profile</h1>
        <div>
            <h3>
                User Name
            </h3>
        </div>
        <div>  
        <form >
               <input onChange={(e) => setTweetname(e.target.value)} value={tweetName} ></input>
           </form>
           <div className='buttondiv'>

           <button onClick={ () =>  localStorage.setItem(
           'react-tweet-username',
           JSON.stringify(tweetName),setTweetname('') ) } className='button'> Save </button>
           </div>
        </div>
        </div>
    )
}
export default Profile;