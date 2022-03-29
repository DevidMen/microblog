import { auth,db } from "../Firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection}  from 'firebase/firestore'

function Signup(props) {

  const userCollectionRef = collection(db, "users")
  const {setIsAuth} = props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate()

  const validatePassword = () => {
    let isValid = true
    if (password === ''){
        isValid = false
        setError('Password is empty')
    }
    return isValid
  }

  function register() {
    setError('')
    if(validatePassword()) {
  
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          localStorage.setItem("isAuth", true)
          addDoc(userCollectionRef, {key: auth.currentUser.uid, userName:  auth.currentUser.email || auth.currentUser.displayName});
          setEmail('')
          setPassword('')
          setIsAuth(true)
          navigate('/')
          })
        .catch(err => setError(err.message))
    }

  }
return (
<div className="divsignin">
        <h3>Registe New Account  </h3>
        <label>
        <input placeholder="Email..."onChange={(event) => {setEmail(event.target.value);}}/></label>
        <label>
        <input placeholder="Password..." onChange={(event) => {setPassword(event.target.value); }}/></label>
               <button className="loginbtn" onClick={register}> Register </button>
               <div className="errorMessage">{error}</div>
           </div>



   )
}

export default Signup;