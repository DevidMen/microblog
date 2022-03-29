import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react'
import { useAuth, upload } from "../Firebase-config";


function Profile({}){
    const [tweetUsername, setTweetUsername] = useState('')

    const currentUser = useAuth();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState("https://img.icons8.com/external-anggara-glyph-anggara-putra/32/000000/external-avatar-user-interface-anggara-glyph-anggara-putra.png");

    
  
    function handleChange(e) {
      if (e.target.files[0]) {
        setPhoto(e.target.files[0])
      }
    }
  
    function handleClick() {
      upload(photo, currentUser, setLoading);
    }
  
    useEffect(() => {
      if (currentUser) {
        setPhotoURL(currentUser.photoURL);
      }
    }, [currentUser])

    useEffect(() => {
      if (!photoURL) {
        setPhotoURL("https://img.icons8.com/external-anggara-glyph-anggara-putra/32/000000/external-avatar-user-interface-anggara-glyph-anggara-putra.png");
      }
    }, [currentUser])

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
               <input onChange={(e) => setTweetUsername(e.target.value)} value={tweetUsername}></input>
           </form>
           <div className='buttondiv'>

           <button onClick={ () =>  localStorage.setItem(
           'react-tweet-username',
           JSON.stringify(tweetUsername),setTweetUsername('') ) } className='button'> Save </button>
           </div>
           <h3>
                Upload your image
            </h3>
           <div className='uploading'>

           <input type="file" onChange={handleChange}/> 
           </div>
           <div className='footerprofile'>
      <img src={photoURL}  className="avatar"/> 
      <button className='buttonupload' disabled={loading || !photo} onClick={handleClick}>Upload</button>
      </div>
        </div>
        </div>
    )
}
export default Profile;

