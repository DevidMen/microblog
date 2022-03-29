import {auth, provider,db} from "../Firebase-config"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword } from "firebase/auth";
import {useState} from 'react'
import { addDoc, collection}  from 'firebase/firestore'



function Login(props){
const {setIsAuth,currentUser } = props
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
let navigate = useNavigate()



const userCollectionRef = collection(db, "users")

function signin(){

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;


     
    setIsAuth(true)
            navigate("/")

  })
  .catch((error) => {
    
    const errorMessage = error.message;
    setError(errorMessage)
  });}
    function signInWithGoogle (){

        signInWithPopup(auth, provider).then((result)=>{

      
            localStorage.setItem("isAuth", true)
        
            setIsAuth(true)
     
    
              addDoc(userCollectionRef, {key: auth.currentUser.uid, userName:  auth.currentUser.displayName || auth.currentUser.email});
            navigate("/")
        })}
        
    

return(
        <div className="divsignin">
          <h1>Sign in...</h1>
          
            <label> 
        <input placeholder="Email..." onChange={(event) => { setEmail(event.target.value); }}/></label>
        <label>
        <input placeholder="Password..." onChange={(event) => {setPassword(event.target.value);}}/></label>
         <div className="buttondivLogin">
         <button className="loginbtn" onClick={signin}> Login </button>
         <span>or</span>
                      <button className="loginbtngoogle" onClick={()=>signInWithGoogle()}>Sign in with Google </button>
                  </div>
                  <div className="errorMessage">{error}</div> 
          
      </div>
        
      
    )
}

export default Login;



