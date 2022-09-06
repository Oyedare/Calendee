import React, { useState } from 'react'
// import bg from '../assets/bg2.jpg'
// import { Navbar } from '../components/Navbar'
import {AiOutlineGoogle} from 'react-icons/ai'
import { auth, provider } from '../firebaseConfig'
import { signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
export const Login = ({setIsAuth}) => {
  let navigate = useNavigate()

  const googleSignIn = () =>{
    signInWithPopup(auth, provider)
      .then((result)=>{
        localStorage.setItem("isAuth", true)
        setIsAuth(true);
        navigate("/calendar")
      })
      .catch(error =>{
        setIsError(true)
        setErrMsg(error.message)
      })
  }

  const emailSignIn = async() =>{
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      console.log(user);
      localStorage.setItem("isAuth", true)
      setIsAuth(true);
      navigate("/calendar")
    }
    catch(error){
      // console.log(error.message);
      setIsError(true)
      setErrMsg(error.message)
    }
  }

  const [loginEmail,setLoginEmail] = useState("")
  const [loginPassword,setLoginPassword] = useState("")
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  return (
    <div className='w-full bg-[#F5F5F5]'>
      {/* <Navbar style={{color: '#fff'}} isAuth={isAuth}/> */}
      <div className='bg-white max-w-lg	mx-auto px-6 py-6'>
        <h2 className='text-3xl flex justify-center font-bold tracking-wide	mb-2'>Welcome to Calendee👋🏾</h2>
        <p className='flex justify-center tracking-wide'>Calendee is an event scheduler with great users</p>
        <div className='flex items-center justify-center mt-7 bg-black text-white rounded py-2 gap-2 cursor-pointer	hover:opacity-90' onClick={googleSignIn}>
          <AiOutlineGoogle size={30}/>
          <p>Login with Google</p>
        </div>
        <h3 className='text-center my-12 text-xl text-[#c9c9c9] relative before:block before:bg-[#c9c9c9] before:w-[45%] before:h-px before:left-0	before:top-[50%] before:absolute after:block after:bg-[#c9c9c9] after:w-[45%] after:h-px after:right-0	after:top-[50%] after:absolute'>OR</h3>

        <form action="">
          <label for="email" className='text-base text-[#171717] font-semibold	mt-5 text-left w-auto block'>Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className='bg-white border border-solid	border-[#d4d4d4] text-base text-black rounded-[5px] p-2.5 w-full focus:border-[#000] focus:outline-none' 
            required
            onChange={(e)=>{setLoginEmail(e.target.value)}}
          />
          <label for="pass" className='text-base text-[#171717] font-semibold	mt-5 text-left w-auto block'>Password:</label>
          <input 
            type="password" 
            id="pass" 
            name="pass" 
            className='bg-white border border-solid	border-[#d4d4d4] text-base text-black rounded-[5px] p-2.5 w-full focus:border-[#000] focus:outline-none' 
            required
            onChange={(e)=>{setLoginPassword(e.target.value)}}
            />
          <button 
            type='button' 
            className='bg-[#004796] text-base text-white py-3.5 px-[1.8rem] font-bold rounded-lg w-full hover:bg-[#062d59] hover:text-white mt-5 text-center cursor-pointer'
            onClick={emailSignIn}>Login</button>
        </form>
        {isError && (
          <p className='text-[red] pt-3'>⚠ {errMsg}</p>
        )}
      </div>
    </div>
  )
}
