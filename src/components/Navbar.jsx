import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {BiMenuAltRight, BiLogOut} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import { signOut,onAuthStateChanged } from "firebase/auth"
import { auth } from '../firebaseConfig'
import avatar from '../assets/user.png'
import {motion} from 'framer-motion'
export const Navbar = ({isAuth,setIsAuth}) => {
    const [isActive, setIsActive] = useState(false)
    const [user,setUser] = useState({})
    const [isClicked, setIsClicked] = useState(false)
    useEffect(() =>{
        onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
            // if(currentUser){

            // }
            // if(currentUser){
            //     // alert('logged in')
            //     console.log(isAuth);
            //     setIsAuth(true)
            // }
        })
    })

    const logOut = () =>{
        signOut(auth)
            .then(()=>{
                localStorage.clear();
                setIsAuth(false);
                window.location.pathname = "/login"
            })
    }
    return (
        <>
            {isAuth ? 
                <>
                    <div className="nav">
                        <div className="logo">
                            <Link to="/calendar">Calendee..</Link>
                        </div>
                        <div className="user">
                            <p>
                                Hello {user?.displayName}
                            </p>
                            <div className="avatar" onClick={()=>{setIsClicked(!isClicked)}}>
                                <img src={avatar} alt="" />
                            </div>
                        </div>
                    </div>
                    {isClicked && (
                        <div className="drop-container">
                            <div className="drop">
                                <BiLogOut size={30}/>
                                <h3 onClick={logOut}>Logout</h3>
                            </div>
                        </div>
                    )}
                </>
            : 
            <>
                <motion.nav 
                className="nav"
                initial={{y:-100}}
                animate={{y:0}}
                transition={{ type: "spring", stiffness: 100,delay: 0.5 }}>
                    <div className="logo">
                        <Link to="/">Calendee..</Link>
                    </div>
                    <div className="links">
                        <motion.div whileHover={{scale:1.1}}>
                            <Link to="/login">Log in</Link>
                        </motion.div>
                        <motion.div whileHover={{scale:1.1}}>
                            <Link to="/signup">Sign Up</Link>
                        </motion.div>
                    </div>
                    <div className="menu" onClick={()=>{setIsActive(!isActive)}}>
                        <BiMenuAltRight size={30}/>
                    </div>
                </motion.nav>

                {isActive ? (
                    <div className='menu-links'>
                        <div className="close-menu" onClick={()=>setIsActive(!isActive)}>
                            <CgClose size={30}/>
                        </div>
                        <div>
                            <Link to="/login" onClick={()=>setIsActive(!isActive)}>Log in</Link>
                        </div>
                        <div>
                            <Link to="/signup" onClick={()=>setIsActive(!isActive)}>Sign Up</Link>
                        </div>
                    </div>
                )
                :(
                    <div>
                    
                    </div>
                )}
            </>
            }
            
        </>
    )
}
