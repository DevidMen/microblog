import 'bootstrap/dist/css/bootstrap.min.css';

import {useState} from 'react'

function Profile(){
    const [tweetUsername , setTweetUsername] = useState('')


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
               <input onChange={(e) => setTweetUsername(e.target.value)} value={tweetUsername} placeholder={tweetUsername}></input>
           </form>
           <div className='buttondiv'>

           <button onClick={ () => localStorage.setItem(
           'react-tweet-username',
           JSON.stringify(tweetUsername))}  className='button'> Save </button>
           </div>
        </div>
        </div>
    )
}
export default Profile;